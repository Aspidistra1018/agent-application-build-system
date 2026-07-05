import { Editor } from 'slate';

import type { CommentEditorCommand } from '../type';
import type { CommentEditorModel } from '../model';
import { CommentEditorBlockFormat } from '../constant';

// Define the block prefix pattern and corresponding format
const blockPrefixConfig: Array<[RegExp, CommentEditorBlockFormat]> = [
  [/^#$/, CommentEditorBlockFormat.HeadingOne],
  [/^##$/, CommentEditorBlockFormat.HeadingTwo],
  [/^###$/, CommentEditorBlockFormat.HeadingThree],
  [/^>$/, CommentEditorBlockFormat.Blockquote],
  [/^-$/, CommentEditorBlockFormat.BulletedList],
  [/^\*$/, CommentEditorBlockFormat.BulletedList],
  [/^1\.$/, CommentEditorBlockFormat.NumberedList],
];

// Function to delete text
const deleteText = (model: CommentEditorModel, text: string): void => {
  Array.from(text).forEach(() => {
    Editor.deleteBackward(model.editor, { unit: 'character' });
  });
};

// Functions that handle block prefixes
const handleBlockPrefix = (
  model: CommentEditorModel,
  text: string,
): boolean => {
  const matchedConfig = blockPrefixConfig.find(([pattern]) =>
    pattern.test(text),
  );

  if (matchedConfig) {
    const [, format] = matchedConfig;
    deleteText(model, text);
    model.markBlock(format);
    return true;
  }

  return false;
};

export const blockPrefixCommand: CommentEditorCommand = {
  key: ' ',
  exec: ({ model, event }) => {
    // Check if pinyin is being entered.
    if (event.nativeEvent.isComposing) {
      return;
    }

    const { before: beforeText } = model.getBlockText();
    if (!beforeText) {
      return;
    }

    if (handleBlockPrefix(model, beforeText)) {
      event.preventDefault();
    }
  },
};
