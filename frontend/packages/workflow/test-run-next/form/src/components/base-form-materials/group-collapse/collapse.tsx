import React, { useState, useRef } from 'react';

import { clsx } from 'clsx';
import { useInViewport } from 'ahooks';
import {
  IconCozArrowDownFill,
  IconCozInfoCircle,
} from '@coze-arch/coze-design/icons';
import { Collapsible, Tooltip } from '@coze-arch/coze-design';

import css from './collapse.module.less';

interface CollapseProps {
  label: React.ReactNode;
  tooltip?: React.ReactNode;
  extra?: React.ReactNode;
  fade?: boolean;
  duration?: number;
}

export const GroupCollapse: React.FC<
  React.PropsWithChildren<CollapseProps>
> = ({ label, tooltip, extra, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef(null);
  /**
   * Detect if the title is sticky
   */
  const [inViewport] = useInViewport(ref);
  return (
    <div>
      {/* probe element */}
      <div ref={ref} />
      {/* header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          css['collapse-title'],
          (!inViewport || !isOpen) && css['is-sticky'],
        )}
      >
        <IconCozArrowDownFill
          className={clsx(css['collapse-icon'], !isOpen && css['is-close'])}
        />
        <span className={css['collapse-label']}>{label}</span>
        {tooltip ? (
          <Tooltip content={tooltip}>
            <IconCozInfoCircle className={css['collapse-label-tooltip']} />
          </Tooltip>
        ) : null}
        {extra ? (
          <div
            className={css['collapse-extra']}
            onClick={e => e.stopPropagation()}
          >
            {extra}
          </div>
        ) : null}
      </div>
      {/* children */}
      <Collapsible isOpen={isOpen} keepDOM fade duration={300}>
        <div className={css['collapse-content']}>{children}</div>
      </Collapsible>
    </div>
  );
};
