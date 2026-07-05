import { type FC } from 'react';

import cls from 'classnames';
import { Layout } from '@coze-studio/open-chat/types';

import { getCssVars } from '@/util/style';
import { type AstBtnProps } from '@/types/chat';
import { useGlobalStore } from '@/store/context';
import WidgetPng from '@/assets/widget.png';

import styles from './index.module.less';

export const AstBtn: FC<AstBtnProps> = ({ position = 'fixed', client }) => {
  const { chatVisible, setChatVisible, layout } = useGlobalStore(s => ({
    chatVisible: s.chatVisible,
    setChatVisible: s.setChatVisible,
    layout: s.layout,
  }));

  const { base: baseConf, asstBtn: asstBtnConf } = client?.options?.ui || {};
  const iconUrl = baseConf?.icon;
  const zIndex = baseConf?.zIndex;
  const zIndexStyle = getCssVars({ zIndex });
  if (chatVisible || !asstBtnConf?.isNeed) {
    return null;
  }

  return (
    <div
      style={{ position, ...zIndexStyle }}
      className={cls(styles['coze-ast-btn'], {
        [styles.mobile]: layout === Layout.MOBILE,
      })}
      onClick={e => {
        e.stopPropagation();
        setChatVisible(true);
      }}
    >
      <img alt="logo" src={iconUrl || WidgetPng} />
    </div>
  );
};
