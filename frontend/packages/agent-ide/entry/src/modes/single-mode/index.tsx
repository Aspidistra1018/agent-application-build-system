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

import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames';
import { usePageRuntimeStore } from '@coze-studio/bot-detail-store/page-runtime';
import { useBotDetailIsReadonly } from '@coze-studio/bot-detail-store';
import { BotPageFromEnum } from '@coze-arch/bot-typings/common';
import { BotMode, TabStatus } from '@coze-arch/bot-api/developer_api';
import { AbilityAreaContainer } from '@coze-agent-ide/tool';
import { useBotPageStore } from '@coze-agent-ide/space-bot/store';
import {
  ContentView,
  BotDebugPanel,
} from '@coze-agent-ide/space-bot/component';

import s from '../../index.module.less';
import {
  AgentConfigArea,
  type AgentConfigAreaProps,
} from './section-area/agent-config-area/index';
import {
  AgentChatArea,
  type AgentChatAreaProps,
} from './section-area/agent-chat-area';
import { CoachMark } from './components/coach-mark';

export interface SingleModeProps
  extends Omit<AgentConfigAreaProps, 'isAllToolHidden'>,
    AgentChatAreaProps {
  rightSheetSlot?: ReactNode;
  chatAreaReadOnly?: boolean;
}

type LayoutMode = 'split' | 'stack' | 'float';
type PanelKey = 'config' | 'chat';
type PanelRect = { x: number; y: number; w: number; h: number };
type PanelRects = Record<PanelKey, PanelRect>;
type StackHeights = Partial<Record<PanelKey, number>>;

const STORAGE_KEY = 'agent-ide:single-mode-layout:v1';
const LAYOUT_ACTION_EVENT = 'agent-ide:single-mode-layout-action';
const LAYOUT_STATE_EVENT = 'agent-ide:single-mode-layout-state';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

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

const getDefaultRects = (): PanelRects => ({
  config: { x: 16, y: 40, w: 980, h: 820 },
  chat: { x: 1016, y: 40, w: 420, h: 820 },
});

const getDefaultStackHeights = (): StackHeights => ({
  config: 560,
  chat: 520,
});

export const SingleMode: React.FC<SingleModeProps> = ({
  rightSheetSlot,
  renderChatTitleNode,
  chatSlot,
  chatHeaderClassName,
  chatAreaReadOnly,
  ...agentConfigAreaProps
}) => {
  const { isInit, historyVisible, pageFrom, defaultAllHidden } =
    usePageRuntimeStore(
      useShallow(state => ({
        isInit: state.init,
        historyVisible: state.historyVisible,
        pageFrom: state.pageFrom,
        defaultAllHidden: !Object.values(
          state.botSkillBlockCollapsibleState,
        ).some(val => val !== TabStatus.Hide),
      })),
    );

  const modeSwitching = useBotPageStore(state => state.bot.modeSwitching);

  const isReadonly = useBotDetailIsReadonly();

  const [isAllToolHidden, setIsAllToolHidden] = useState(defaultAllHidden);

  const persisted = useMemo(
    () =>
      safeParse<{
        layoutMode?: LayoutMode;
        panelOrder?: PanelKey[];
        rects?: Partial<PanelRects>;
        stackHeights?: StackHeights;
      }>(typeof window === 'undefined' ? null : localStorage.getItem(STORAGE_KEY)),
    [],
  );

  const [layoutMode, setLayoutMode] = useState<LayoutMode>(
    persisted?.layoutMode ?? 'split',
  );
  const [panelOrder, setPanelOrder] = useState<PanelKey[]>(
    persisted?.panelOrder?.length === 2
      ? (persisted.panelOrder as PanelKey[])
      : ['config', 'chat'],
  );

  const [panelRects, setPanelRects] = useState<PanelRects>(() => ({
    ...getDefaultRects(),
    ...persisted?.rects,
  }));
  const [stackHeights, setStackHeights] = useState<StackHeights>(
    persisted?.stackHeights ?? getDefaultStackHeights(),
  );

  const stageRef = useRef<HTMLDivElement>(null);
  const panelRectsRef = useRef<PanelRects>(panelRects);
  panelRectsRef.current = panelRects;
  const [activePanel, setActivePanel] = useState<PanelKey>('config');
  const panelElRef = useRef<Record<PanelKey, HTMLDivElement | null>>({
    config: null,
    chat: null,
  });

  const dragRef = useRef<
    | null
    | {
        kind: 'float-move' | 'float-resize';
        key: PanelKey;
        startClientX: number;
        startClientY: number;
        origin: PanelRect;
        boundsW: number;
        boundsH: number;
        nextX: number;
        nextY: number;
        nextW: number;
        nextH: number;
      }
    | {
        kind: 'stack-resize';
        key: PanelKey;
        startClientY: number;
        originH: number;
        nextH: number;
        minH: number;
        maxH: number;
      }
  >(null);

  const rafRef = useRef<number | null>(null);
  const scheduleDomUpdate = () => {
    if (rafRef.current != null) {
      return;
    }
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const drag = dragRef.current;
      if (!drag || drag.kind === 'stack-resize') {
        return;
      }
      const el = panelElRef.current[drag.key];
      if (!el) {
        return;
      }
      el.style.transform = `translate3d(${drag.nextX}px, ${drag.nextY}px, 0)`;
      el.style.width = `${drag.nextW}px`;
      el.style.height = `${drag.nextH}px`;
    });
  };

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        layoutMode,
        panelOrder,
        rects: panelRects,
        stackHeights,
      }),
    );
  }, [layoutMode, panelOrder, panelRects, stackHeights]);

  useEffect(() => {
    if (layoutMode !== 'float') {
      return;
    }

    const stage = stageRef.current;
    if (!stage) {
      return;
    }

    const bounds = stage.getBoundingClientRect();
    setPanelRects(prev => ({
      config: {
        ...prev.config,
        x: clamp(prev.config.x, 0, Math.max(0, bounds.width - prev.config.w)),
        y: clamp(prev.config.y, 0, Math.max(0, bounds.height - prev.config.h)),
      },
      chat: {
        ...prev.chat,
        x: clamp(prev.chat.x, 0, Math.max(0, bounds.width - prev.chat.w)),
        y: clamp(prev.chat.y, 0, Math.max(0, bounds.height - prev.chat.h)),
      },
    }));
  }, [layoutMode]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) {
        return;
      }

      if (drag.kind === 'stack-resize') {
        const dy = e.clientY - drag.startClientY;
        drag.nextH = clamp(drag.originH + dy, drag.minH, drag.maxH);
        setStackHeights(prev => ({
          ...prev,
          [drag.key]: drag.nextH,
        }));
        return;
      }

      if (layoutMode !== 'float') {
        return;
      }

      const dx = e.clientX - drag.startClientX;
      const dy = e.clientY - drag.startClientY;

      if (drag.kind === 'float-move') {
        drag.nextX = clamp(
          drag.origin.x + dx,
          0,
          drag.boundsW - drag.origin.w,
        );
        drag.nextY = clamp(
          drag.origin.y + dy,
          0,
          drag.boundsH - drag.origin.h,
        );
        scheduleDomUpdate();
        return;
      }

      drag.nextW = clamp(drag.origin.w + dx, 320, drag.boundsW - drag.origin.x);
      drag.nextH = clamp(drag.origin.h + dy, 240, drag.boundsH - drag.origin.y);
      scheduleDomUpdate();
    };

    const onUp = () => {
      const drag = dragRef.current;
      if (!drag) {
        return;
      }

      if (drag.kind === 'stack-resize') {
        setStackHeights(prev => ({
          ...prev,
          [drag.key]: drag.nextH,
        }));
        dragRef.current = null;
        return;
      }

      setPanelRects(prev => ({
        ...prev,
        [drag.key]: {
          ...prev[drag.key],
          x: drag.nextX,
          y: drag.nextY,
          w: drag.nextW,
          h: drag.nextH,
        },
      }));
      dragRef.current = null;
    };

    const onBlur = () => {
      dragRef.current = null;
    };

    window.addEventListener('pointermove', onMove, true);
    window.addEventListener('pointerup', onUp, true);
    window.addEventListener('pointercancel', onUp, true);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('pointermove', onMove, true);
      window.removeEventListener('pointerup', onUp, true);
      window.removeEventListener('pointercancel', onUp, true);
      window.removeEventListener('blur', onBlur);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [layoutMode]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onAllToolHiddenStatusChange = (_isAllToolHidden: any) => {
    setIsAllToolHidden(_isAllToolHidden);
  };

  const onSwapPanels = () => {
    setPanelOrder(prev => [prev[1], prev[0]]);

    if (layoutMode === 'float') {
      setPanelRects(prev => ({
        ...prev,
        config: prev.chat,
        chat: prev.config,
      }));
    }
  };

  const onReset = () => {
    setLayoutMode('split');
    setPanelOrder(['config', 'chat']);
    setPanelRects(getDefaultRects());
    setStackHeights(getDefaultStackHeights());
  };

  useEffect(() => {
    const onAction = (evt: Event) => {
      const detail = (evt as CustomEvent<
        | { type: 'setMode'; mode: LayoutMode }
        | { type: 'swap' }
        | { type: 'reset' }
      >).detail;

      if (!detail) {
        return;
      }

      if (detail.type === 'setMode') {
        setLayoutMode(detail.mode);
        return;
      }

      if (detail.type === 'swap') {
        onSwapPanels();
        return;
      }

      if (detail.type === 'reset') {
        onReset();
      }
    };

    window.addEventListener(LAYOUT_ACTION_EVENT, onAction as EventListener);
    return () => {
      window.removeEventListener(LAYOUT_ACTION_EVENT, onAction as EventListener);
    };
  }, [layoutMode, onSwapPanels, onReset]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(LAYOUT_STATE_EVENT, {
        detail: { layoutMode, panelOrder },
      }),
    );
  }, [layoutMode, panelOrder]);

  const onHandlePointerDown =
    (key: PanelKey) => (e: React.PointerEvent<HTMLButtonElement>) => {
      if (layoutMode !== 'float') {
        return;
      }
      const stage = stageRef.current;
      if (!stage) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      dragRef.current = null;

      setActivePanel(key);
      const bounds = stage.getBoundingClientRect();
      const current = panelRectsRef.current[key];

      dragRef.current = {
        kind: 'float-move',
        key,
        startClientX: e.clientX,
        startClientY: e.clientY,
        origin: current,
        boundsW: bounds.width,
        boundsH: bounds.height,
        nextX: current.x,
        nextY: current.y,
        nextW: current.w,
        nextH: current.h,
      };
    };

  const onResizePointerDown =
    (key: PanelKey) => (e: React.PointerEvent<HTMLButtonElement>) => {
      if (layoutMode !== 'float') {
        return;
      }
      const stage = stageRef.current;
      if (!stage) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      dragRef.current = null;

      setActivePanel(key);
      const bounds = stage.getBoundingClientRect();
      const current = panelRectsRef.current[key];

      dragRef.current = {
        kind: 'float-resize',
        key,
        startClientX: e.clientX,
        startClientY: e.clientY,
        origin: current,
        boundsW: bounds.width,
        boundsH: bounds.height,
        nextX: current.x,
        nextY: current.y,
        nextW: current.w,
        nextH: current.h,
      };
    };

  const onStackResizePointerDown =
    (key: PanelKey) => (e: React.PointerEvent<HTMLButtonElement>) => {
      if (layoutMode !== 'stack') {
        return;
      }
      const stage = stageRef.current;
      if (!stage) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      dragRef.current = null;

      const bounds = stage.getBoundingClientRect();
      const originH = stackHeights[key] ?? getDefaultStackHeights()[key] ?? 520;
      const minH = 280;
      const maxH = Math.max(minH, bounds.height - 180);

      dragRef.current = {
        kind: 'stack-resize',
        key,
        startClientY: e.clientY,
        originH,
        nextH: originH,
        minH,
        maxH,
      };
    };

  const panels = {
    config: (
      <AgentConfigArea
        isAllToolHidden={isAllToolHidden}
        {...agentConfigAreaProps}
      />
    ),
    chat: (
      <AgentChatArea
        renderChatTitleNode={renderChatTitleNode}
        chatSlot={chatSlot}
        chatHeaderClassName={chatHeaderClassName}
        chatAreaReadOnly={chatAreaReadOnly}
      />
    ),
  } satisfies Record<PanelKey, React.ReactNode>;

  return (
    <div
      className={classNames(
        s.container,
        historyVisible && s['playground-neat'],
        pageFrom === BotPageFromEnum.Store && s.store,
      )}
    >
      <AbilityAreaContainer
        enableToolHiddenMode
        eventCallbacks={{
          onAllToolHiddenStatusChange,
        }}
        isReadonly={isReadonly}
        mode={BotMode.SingleMode}
        modeSwitching={modeSwitching}
        isInit={isInit}
      >
        <ContentView
          mode={BotMode.SingleMode}
          className={classNames(s['single-mode-content'])}
        >
          <div
            ref={stageRef}
            className={classNames(
              s['single-mode-stage'],
              layoutMode === 'split' && s['single-mode-stage-split'],
              layoutMode === 'stack' && s['single-mode-stage-stack'],
              layoutMode === 'float' && s['single-mode-stage-float'],
              isAllToolHidden && s['single-mode-stage-slim'],
            )}
          >
            {layoutMode === 'float' ? (
              <>
                {panelOrder.map(key => (
                  <div
                    key={key}
                    ref={el => {
                      panelElRef.current[key] = el;
                    }}
                    className={classNames(
                      s['float-panel'],
                      key === activePanel && s['float-panel-active'],
                    )}
                    style={{
                      transform: `translate3d(${panelRects[key].x}px, ${panelRects[key].y}px, 0)`,
                      width: panelRects[key].w,
                      height: panelRects[key].h,
                      zIndex: key === activePanel ? 2 : 1,
                    }}
                    onPointerDown={() => {
                      setActivePanel(key);
                    }}
                  >
                    <button
                      type="button"
                      className={s['float-handle']}
                      onPointerDown={onHandlePointerDown(key)}
                      title="拖动"
                    />
                    <button
                      type="button"
                      className={s['float-resizer']}
                      onPointerDown={onResizePointerDown(key)}
                      title="拉伸"
                    />
                    <div className={s['float-body']}>{panels[key]}</div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {panelOrder.map(key => (
                  <div
                    key={key}
                    className={classNames(
                      s['docked-panel'],
                      layoutMode === 'stack' && s['stack-panel'],
                    )}
                    style={
                      layoutMode === 'stack'
                        ? { height: stackHeights[key] ?? undefined }
                        : undefined
                    }
                  >
                    {panels[key]}
                    {layoutMode === 'stack' ? (
                      <button
                        type="button"
                        className={s['stack-resizer']}
                        onPointerDown={onStackResizePointerDown(key)}
                        title="拉伸"
                      />
                    ) : null}
                  </div>
                ))}
              </>
            )}
          </div>
        </ContentView>

        {/* Debug bench */}
        <BotDebugPanel />
        {rightSheetSlot}
        <CoachMark />
      </AbilityAreaContainer>
    </div>
  );
};
