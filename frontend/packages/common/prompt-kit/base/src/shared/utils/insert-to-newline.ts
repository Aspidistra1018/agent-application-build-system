import { type EditorAPI } from '@coze-editor/editor/preset-prompt';

export const insertToNewline = async ({
  editor,
  prompt,
}: {
  editor?: EditorAPI;
  prompt: string;
}): Promise<string> => {
  if (!editor) {
    return '';
  }
  const { state } = editor.$view;
  const isDocEmpty = state.doc.length === 0;
  const insertPrompt = isDocEmpty ? prompt : `\n${prompt}`;
  const selection = isDocEmpty
    ? undefined
    : {
        anchor: state.doc.length,
        head: state.doc.length + insertPrompt.length,
      };

  editor.$view.dispatch({
    changes: {
      from: state.doc.length,
      to: state.doc.length,
      insert: insertPrompt,
    },
    selection,
    scrollIntoView: true,
  });
  // Wait for the next microtask cycle to ensure that the status has been updated
  await Promise.resolve();

  // Use the updated state to get the latest document content
  const newDoc = editor.$view.state.doc.toString();

  // Insert to new line
  // Note: This operation will trigger a chrome bug in advance, resulting in a crash
  editor.focus();
  return newDoc;
};
