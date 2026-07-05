import { api, type InferEditorAPIFromPlugins } from '@coze-editor/editor/react';
import preset from '@coze-editor/editor/preset-code';
import { type EditorView } from '@codemirror/view';

// Ignore readOnly to force a value
const forceSetValue =
  ({ view }: { view: EditorView }) =>
  (value: string) => {
    const { state } = view;
    view.dispatch(
      state.update({
        changes: {
          from: 0,
          to: state.doc.length,
          insert: value ?? '',
        },
      }),
    );
  };

const customPreset = [...preset, api('forceSetValue', forceSetValue)];

export type EditorAPI = InferEditorAPIFromPlugins<typeof customPreset>;

export default customPreset;
