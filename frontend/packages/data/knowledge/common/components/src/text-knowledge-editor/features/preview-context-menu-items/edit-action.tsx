import React from 'react';

import classNames from 'classnames';
import { I18n } from '@coze-arch/i18n';
import { IconCozEdit } from '@coze-arch/coze-design/icons';
import { Menu } from '@coze-arch/coze-design';

import { eventBus } from '@/text-knowledge-editor/event';

import { type PreviewContextMenuItemProps } from './module';

/**
 * Edit Action Menu Item Component
 *
 * The logic to activate the edit mode for specific shardings is implemented internally
 * If an onEdit callback is passed, it will be called on click
 */
export const EditAction: React.FC<PreviewContextMenuItemProps> = ({
  chunk,
  disabled,
}) => {
  const getIconStyles = (isDisabled: boolean) =>
    classNames('w-3.5 h-3.5', {
      'opacity-30': isDisabled,
    });

  const getMenuItemStyles = (isDisabled: boolean) =>
    classNames('h-8 px-2 py-2 text-xs rounded-lg', {
      'cursor-not-allowed': isDisabled,
    });

  return (
    <Menu.Item
      disabled={disabled}
      icon={<IconCozEdit className={getIconStyles(!!disabled)} />}
      onClick={() => {
        eventBus.emit('previewContextMenuItemAction', {
          type: 'edit',
          targetChunk: chunk,
        });
      }}
      className={getMenuItemStyles(!!disabled)}
    >
      {I18n.t('Edit')}
    </Menu.Item>
  );
};
