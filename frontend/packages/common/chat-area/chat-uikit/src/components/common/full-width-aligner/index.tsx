import type { PropsWithChildren } from 'react';

import classNames from 'classnames';
import './index.less';

/**
 * Sleeve component, the default width bar, is used to help the isolated component maintain width alignment with the message box
 */
export const FullWidthAligner = (
  props: PropsWithChildren<{
    alignWidth?: string;
    className?: string;
    innerWrapClassName?: string;
  }>,
) => {
  const { alignWidth, children, className, innerWrapClassName } = props;
  return (
    <div
      className={classNames('full-width-aligner', className)}
      style={{
        width: alignWidth || '100%',
      }}
    >
      <span
        className={classNames(
          'full-width-aligner-inner-wrap',
          innerWrapClassName,
        )}
      >
        {children}
      </span>
    </div>
  );
};

FullWidthAligner.displayName = 'UIKitFullWidthAligner';
