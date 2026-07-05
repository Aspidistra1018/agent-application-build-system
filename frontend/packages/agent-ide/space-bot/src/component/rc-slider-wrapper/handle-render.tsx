import React from 'react';

import { type SliderProps } from 'rc-slider';
import { Tooltip } from '@coze-arch/bot-semi';

interface HandleTooltipProps {
  value: number;
  children: React.ReactElement;
  visible: boolean;
  tipFormatter?: (value: number) => React.ReactNode;
}

export const HandleTooltip: React.FC<HandleTooltipProps> = props => {
  const {
    value,
    children,
    visible,
    tipFormatter = val => `${val}`,
    ...restProps
  } = props;

  const rafRef = React.useRef<number | null>(null);

  // To update the location of Tooltip
  const [refreshKey, setRefreshKey] = React.useState('1');

  function cancelKeepAlign() {
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
    }
  }

  function keepAlign() {
    rafRef.current = window.requestAnimationFrame(() => {
      setRefreshKey(Math.random().toString());
    });
  }

  React.useEffect(() => {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [value, visible]);

  return (
    <Tooltip
      placement="top"
      content={tipFormatter(value)}
      overlayInnerStyle={{ minHeight: 'auto' }}
      rePosKey={refreshKey}
      visible={visible}
      {...restProps}
    >
      {children}
    </Tooltip>
  );
};

export const handleRender: SliderProps['handleRender'] = (node, props) => (
  <HandleTooltip
    value={props.value as number}
    visible={props.dragging as boolean}
  >
    {node}
  </HandleTooltip>
);
