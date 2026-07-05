import { forwardRef, type PropsWithChildren } from 'react';

import classNames from 'classnames';

import s from './index.module.less';

// Props can be refined when subsequent iterations of TODO are expanded
interface ActionBarHoverContainerProps {
  style?: React.CSSProperties;
}

export const ActionBarHoverContainer = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ActionBarHoverContainerProps>
>(({ children, style }, ref) => (
  <div
    data-testid="chat-area.answer-action.hover-action-bar"
    className={classNames(s.container, ['coz-stroke-primary', 'coz-bg-max'])}
    style={style}
    ref={ref}
  >
    {children}
  </div>
));
