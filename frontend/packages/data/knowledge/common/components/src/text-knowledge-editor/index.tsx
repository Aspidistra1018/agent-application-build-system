export { type Chunk } from './types/chunk';
export { DocumentEditor } from './features/editor';
export { DocumentPreview } from './features/preview';
export { useSaveChunk } from './hooks/use-case/use-save-chunk';
export { useInitEditor } from './hooks/use-case/use-init-editor';
export { EditorToolbar } from './features/editor-toolbar';
export {
  LevelTextKnowledgeEditor,
  type LevelDocumentChunk,
  type LevelDocumentTree,
} from './scenes/level';
export { BaseTextKnowledgeEditor } from './scenes/base';
export type { Editor } from '@tiptap/react';

// Add component export
export { HoverEditBar } from './features/hover-edit-bar/hover-edit-bar';
export {
  EditAction,
  AddBeforeAction,
  AddAfterAction,
  DeleteAction,
} from './features/hover-edit-bar-actions';

// Event Bus Dependent Export
export {
  eventBus,
  createEventBus,
  useEventBus,
  useEventListener,
  type EventTypes,
  type EventTypeName,
  type EventHandler,
} from './event';
