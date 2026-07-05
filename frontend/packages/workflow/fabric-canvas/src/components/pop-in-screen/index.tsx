/* eslint-disable complexity */
import { useEffect, useRef, useState, type FC } from 'react';

import classNames from 'classnames';
import { useSize } from 'ahooks';

import { getNumberBetween } from '../../utils';

import styles from './index.module.less';

interface IProps {
  left?: number;
  top?: number;
  offsetY?: number;
  offsetX?: number;
  children?: React.ReactNode;
  position?: 'bottom-center' | 'bottom-right' | 'top-center';
  zIndex?: number;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  limitRect?: {
    width?: number;
    height?: number;
  };
}
export const PopInScreen: FC<IProps> = props => {
  const ref = useRef(null);
  const {
    left = 0,
    top = 0,
    children,
    position = 'bottom-center',
    zIndex = 1000,
    onClick,
    className,
    limitRect,
  } = props;
  // const documentSize = useSize(document.body);
  const childrenSize = useSize(ref.current);
  let maxLeft = (limitRect?.width ?? Infinity) - (childrenSize?.width ?? 0) / 2;
  let minLeft = (childrenSize?.width ?? 0) / 2;
  let transform = 'translate(-50%, 0)';

  if (position === 'bottom-right') {
    maxLeft = (limitRect?.width ?? Infinity) - (childrenSize?.width ?? 0);
    minLeft = 0;
    transform = 'translate(0, 0)';
  } else if (position === 'top-center') {
    transform = 'translate(-50%, -100%)';
  }

  /**
   * ahooks useSize returns undefined on first execution, resulting in an error in component location evaluation
   * This listens to childrenSize. If it is undefined, delay rendering by 100ms to correct the component position.
   */
  const [id, setId] = useState('');
  const timer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    clearTimeout(timer.current);
    if (!childrenSize) {
      timer.current = setTimeout(() => {
        setId(`${Math.random()}`);
      }, 100);
    }
  }, [childrenSize]);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={classNames([
        styles['pop-in-screen'],
        '!fixed',
        'coz-tooltip semi-tooltip-wrapper',
        'p-0',
        className,
      ])}
      style={{
        left: getNumberBetween({
          value: left,
          max: maxLeft,
          min: minLeft,
        }),
        top: getNumberBetween({
          value: top,
          max: (limitRect?.height ?? Infinity) - (childrenSize?.height ?? 0),
          min: position === 'top-center' ? childrenSize?.height ?? 0 : 0,
        }),

        zIndex,
        opacity: 1,
        maxWidth: 'unset',
        transform,
      }}
    >
      {/* To trigger secondary rendering */}
      <div className="hidden" id={id} />
      {children}
    </div>
  );
};
