import { type Extension } from '@coze-common/editor-plugins/types';
import { EditorView } from '@codemirror/view';

export const defaultTheme: Extension = EditorView.theme({
  '.cm-content': {
    color: 'rgba(31, 36, 49, 0.95)',
    fontWeight: '500',
  },
  '.cm-line': {
    lineHeight: '24px',
    paddingLeft: '12px',
  },
  '.cm-placeholder': {
    color: 'rgba(93, 102, 122, 0.78)',
  },
  '.cm-cursor': {
    height: '20px !important',
  },
});
