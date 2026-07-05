import React from 'react';

import { KnowledgeE2e } from '@coze-data/e2e';
import { I18n } from '@coze-arch/i18n';
import { IconCozEdit } from '@coze-arch/coze-design/icons';
import { IconButton, Tooltip } from '@coze-arch/coze-design';

import { eventBus } from '@/text-knowledge-editor/event';

import { type HoverEditBarActionProps } from './module';

/**
 * Edit action component
 *
 * The logic to activate the edit mode for specific shardings is implemented internally
 * If an onEdit callback is passed, it will be called on click
 */
export const EditAction: React.FC<HoverEditBarActionProps> = ({
  chunk,
  disabled,
}) => (
  <Tooltip
    content={I18n.t('datasets_segment_edit')}
    clickToHide
    autoAdjustOverflow
  >
    <IconButton
      data-dtestid={`${KnowledgeE2e.SegmentDetailContentItemEditIcon}.${chunk.text_knowledge_editor_chunk_uuid}`}
      size="small"
      color="secondary"
      disabled={disabled}
      icon={<IconCozEdit className="text-[14px]" />}
      iconPosition="left"
      className="coz-fg-secondary leading-none !w-6 !h-6"
      onClick={() => {
        eventBus.emit('hoverEditBarAction', {
          type: 'edit',
          targetChunk: chunk,
        });
      }}
    />
  </Tooltip>
);
