import React from 'react';

import { I18n } from '@coze-arch/i18n';
import { Tooltip } from '@coze-arch/coze-design';

import { AddButton } from '@/form';

export interface AddOptionButtonProps {
  /** Whether to display the title line */
  showTitleRow?: boolean;

  /** Whether to display option labels */
  showOptionName?: boolean;

  /** Option placeholder */
  optionPlaceholder?: string;

  /** Default branch name */
  defaultOptionText?: string;

  /** Option maximum quantity limit, default value is integer maximum */
  maxItems?: number;

  /** Display Forbid Add Tooltip */
  showDisableAddTooltip?: boolean;
  customDisabledAddTooltip?: string;
  className?: string;
  dataTestId?: string;
  value;
  onClick;
  readonly;
  children;
}

export const AddOptionButton = ({
  className,
  showDisableAddTooltip = true,
  maxItems = Number.MAX_SAFE_INTEGER,
  customDisabledAddTooltip,
  value,
  onClick,
  readonly,
  children,
  dataTestId,
}: AddOptionButtonProps) =>
  showDisableAddTooltip && (value?.length as number) >= maxItems ? (
    <Tooltip
      content={
        customDisabledAddTooltip ||
        I18n.t('workflow_250117_05', { maxCount: maxItems })
      }
    >
      <AddButton
        className={className}
        children={children}
        dataTestId={dataTestId}
      />
    </Tooltip>
  ) : (
    <AddButton
      className={className}
      disabled={readonly}
      children={children}
      onClick={onClick}
      dataTestId={dataTestId}
    />
  );
