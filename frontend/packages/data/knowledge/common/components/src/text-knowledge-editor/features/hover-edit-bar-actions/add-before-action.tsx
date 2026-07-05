import React from 'react';

import { KnowledgeE2e } from '@coze-data/e2e';
import { I18n } from '@coze-arch/i18n';
import { IconCozDocumentAddTop } from '@coze-arch/coze-design/icons';
import { IconButton, Tooltip } from '@coze-arch/coze-design';

import { useAddEmptyChunkAction } from '@/text-knowledge-editor/hooks/use-case/chunk-actions';
import { eventBus } from '@/text-knowledge-editor/event';

import { type HoverEditBarActionProps } from './module';

/**
 * Add the action component of a new sharding before a specific sharding
 */
export const AddBeforeAction: React.FC<HoverEditBarActionProps> = ({
  chunk,
  chunks = [],
  disabled,
}) => {
  // Add new shardings before specific shardings
  const { addEmptyChunkBefore } = useAddEmptyChunkAction({
    chunks,
    onChunksChange: ({ newChunk, chunks: newChunks }) => {
      eventBus.emit('hoverEditBarAction', {
        type: 'add-before',
        targetChunk: chunk,
        chunks: newChunks,
        newChunk,
      });
    },
  });

  return (
    <Tooltip
      content={I18n.t('knowledge_optimize_017')}
      clickToHide
      autoAdjustOverflow
    >
      <IconButton
        data-dtestid={`${KnowledgeE2e.SegmentDetailContentItemAddTopIcon}.${chunk.text_knowledge_editor_chunk_uuid}`}
        size="small"
        color="secondary"
        disabled={disabled}
        icon={<IconCozDocumentAddTop className="text-[14px]" />}
        iconPosition="left"
        className="coz-fg-secondary leading-none !w-6 !h-6"
        onClick={() => addEmptyChunkBefore(chunk)}
      />
    </Tooltip>
  );
};
