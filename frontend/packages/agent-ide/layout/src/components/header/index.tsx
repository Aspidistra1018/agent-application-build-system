/*
 * Copyright 2025 coze-dev Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { useShallow } from 'zustand/react/shallow';
import { cloneDeep } from 'lodash-es';
import cx from 'classnames';
import { useUpdateAgent } from '@coze-studio/entity-adapter';
import { usePageRuntimeStore } from '@coze-studio/bot-detail-store/page-runtime';
import { useDiffTaskStore } from '@coze-studio/bot-detail-store/diff-task';
import { useBotInfoStore } from '@coze-studio/bot-detail-store/bot-info';
import { useBotDetailIsReadonly } from '@coze-studio/bot-detail-store';
import { BackButton } from '@coze-foundation/layout';
import { type SenderInfo, useBotInfo } from '@coze-common/chat-area';
import { I18n } from '@coze-arch/i18n';
import { renderHtmlTitle } from '@coze-arch/bot-utils';
import { BotPageFromEnum } from '@coze-arch/bot-typings/common';
import { useSpaceStore } from '@coze-arch/bot-studio-store';
import { type DraftBot } from '@coze-arch/bot-api/developer_api';
import {
  ModeSelect,
  type ModeSelectProps,
} from '@coze-agent-ide/space-bot/component';

import { BotInfoCard } from './bot-info-card';

import s from './index.module.less';

export interface BotHeaderProps {
  pageName?: string;
  isEditLocked?: boolean;
  addonAfter?: ReactNode;
  modeOptionList: ModeSelectProps['optionList'];
  deployButton: ReactNode;
}

type LayoutMode = 'split' | 'stack' | 'float';
type PanelKey = 'config' | 'chat';

const LAYOUT_ACTION_EVENT = 'agent-ide:single-mode-layout-action';
const LAYOUT_STATE_EVENT = 'agent-ide:single-mode-layout-state';
const STORAGE_KEY = 'agent-ide:single-mode-layout:v1';

const safeParse = <T,>(raw: string | null): T | null => {
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

const LayoutInline = () => {
  const initial = useMemo(() => {
    if (typeof window === 'undefined') {
      return { layoutMode: 'split' as LayoutMode, panelOrder: ['config', 'chat'] as PanelKey[] };
    }
    const persisted = safeParse<{ layoutMode?: LayoutMode; panelOrder?: PanelKey[] }>(
      localStorage.getItem(STORAGE_KEY),
    );
    return {
      layoutMode: persisted?.layoutMode ?? 'split',
      panelOrder:
        persisted?.panelOrder?.length === 2
          ? (persisted.panelOrder as PanelKey[])
          : (['config', 'chat'] as PanelKey[]),
    };
  }, []);

  const [layoutMode, setLayoutMode] = useState<LayoutMode>(initial.layoutMode);
  const [panelOrder, setPanelOrder] = useState<PanelKey[]>(initial.panelOrder);

  useEffect(() => {
    const onState = (evt: Event) => {
      const detail = (evt as CustomEvent<{ layoutMode: LayoutMode; panelOrder: PanelKey[] }>)
        .detail;
      if (!detail) {
        return;
      }
      setLayoutMode(detail.layoutMode);
      setPanelOrder(detail.panelOrder);
    };

    window.addEventListener(LAYOUT_STATE_EVENT, onState as EventListener);
    return () => {
      window.removeEventListener(LAYOUT_STATE_EVENT, onState as EventListener);
    };
  }, []);

  const dispatch = (detail: { type: 'setMode'; mode: LayoutMode } | { type: 'swap' } | { type: 'reset' }) => {
    window.dispatchEvent(new CustomEvent(LAYOUT_ACTION_EVENT, { detail }));
  };

  const onKeyDown =
    (action: () => void) => (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        action();
      }
    };

  return (
    <div className={s['layout-inline']}>
      <span className={s['layout-label']}>布局</span>
      <span className={s['layout-links']}>
        <span
          className={cx(s['layout-link'], layoutMode === 'split' && s['layout-link-active'])}
          onClick={() => dispatch({ type: 'setMode', mode: 'split' })}
          onKeyDown={onKeyDown(() => dispatch({ type: 'setMode', mode: 'split' }))}
          role="button"
          tabIndex={0}
        >
          并排
        </span>
        <span className={s['layout-dot']} />
        <span
          className={cx(s['layout-link'], layoutMode === 'stack' && s['layout-link-active'])}
          onClick={() => dispatch({ type: 'setMode', mode: 'stack' })}
          onKeyDown={onKeyDown(() => dispatch({ type: 'setMode', mode: 'stack' }))}
          role="button"
          tabIndex={0}
        >
          上下
        </span>
        <span className={s['layout-dot']} />
        <span
          className={cx(s['layout-link'], layoutMode === 'float' && s['layout-link-active'])}
          onClick={() => dispatch({ type: 'setMode', mode: 'float' })}
          onKeyDown={onKeyDown(() => dispatch({ type: 'setMode', mode: 'float' }))}
          role="button"
          tabIndex={0}
        >
          自由
        </span>
      </span>
      <span className={s['layout-sep']} />
      <span
        className={s['layout-action']}
        onClick={() => dispatch({ type: 'swap' })}
        onKeyDown={onKeyDown(() => dispatch({ type: 'swap' }))}
        role="button"
        tabIndex={0}
        title={panelOrder[0] === 'config' ? '编辑/预览互换' : '预览/编辑互换'}
      >
        交换
      </span>
      <span className={s['layout-sep']} />
      <span
        className={s['layout-action']}
        onClick={() => dispatch({ type: 'reset' })}
        onKeyDown={onKeyDown(() => dispatch({ type: 'reset' }))}
        role="button"
        tabIndex={0}
      >
        重置
      </span>
    </div>
  );
};

export const BotHeader: React.FC<BotHeaderProps> = props => {
  const navigate = useNavigate();
  const spaceID = useSpaceStore(state => state.space.id);
  const isReadonly = useBotDetailIsReadonly();
  const { pageFrom } = usePageRuntimeStore(
    useShallow(state => ({
      pageFrom: state.pageFrom,
    })),
  );

  const botInfo = useBotInfoStore();

  const { updateBotInfo } = useBotInfo();

  const botInfoRef = useRef<DraftBot>();

  useEffect(() => {
    botInfoRef.current = botInfo as DraftBot;
  }, [botInfo]);

  const { modal: updateBotModal, startEdit: editBotInfoFn } = useUpdateAgent({
    botInfoRef,
    onSuccess: (
      botID?: string,
      spaceId?: string,
      extra?: {
        botName?: string;
        botAvatar?: string;
      },
    ) => {
      updateBotInfo(oldBotInfo => {
        const botInfoMap = cloneDeep(oldBotInfo);

        if (!botID) {
          return botInfoMap;
        }
        botInfoMap[botID] = {
          url: extra?.botAvatar ?? '',
          nickname: extra?.botName ?? '',
          id: botID,
          allowMention: false,
        } satisfies SenderInfo;

        return botInfoMap;
      });
    },
  });

  const diffTask = useDiffTaskStore(state => state.diffTask);

  const goBackToBotList = () => {
    navigate(`/space/${spaceID}/develop`);
  };

  return (
    <>
      <div className={cx(s.header, 'coz-bg-primary')}>
        {/* page title */}
        <Helmet>
          <title>
            {renderHtmlTitle(
              pageFrom === BotPageFromEnum.Bot
                ? I18n.t('tab_bot_detail', {
                    bot_name: botInfo?.name ?? '',
                  })
                : I18n.t('tab_explore_bot_detail', {
                    bot_name: botInfo?.name ?? '',
                  }),
            )}
          </title>
        </Helmet>
        {/** 1. Left bot information area */}
        <div className="flex items-center">
          <BackButton onClickBack={goBackToBotList} />
          <BotInfoCard
            isReadonly={isReadonly}
            editBotInfoFn={editBotInfoFn}
            deployButton={props.deployButton}
          />
          {/** 模式选择器 */}
          {diffTask ? null : <ModeSelect optionList={props.modeOptionList} />}
        </div>

        {/* 2. Middle inline layout control */}
        {diffTask ? null : <LayoutInline />}

        {/* 3. Right bot state area */}
        {props.addonAfter}
        {updateBotModal}
      </div>
    </>
  );
};
