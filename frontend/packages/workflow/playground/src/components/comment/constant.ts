/* eslint-disable @typescript-eslint/naming-convention -- enum */

export enum CommentEditorFormField {
  Size = 'size',
  Note = 'note',
}

/** editor event */
export enum CommentEditorEvent {
  /** content change event */
  Change = 'change',
  /** multiple choice event */
  MultiSelect = 'multiSelect',
  /** radio event */
  Select = 'select',
  /** out of focus event */
  Blur = 'blur',
}

/** editor block format */
export enum CommentEditorBlockFormat {
  /** paragraph */
  Paragraph = 'paragraph',
  /** Title I */
  HeadingOne = 'heading-one',
  /** Title II */
  HeadingTwo = 'heading-two',
  /** Title III */
  HeadingThree = 'heading-three',
  /** quote */
  Blockquote = 'block-quote',
  /** unordered list */
  BulletedList = 'bulleted-list',
  /** ordered list */
  NumberedList = 'numbered-list',
  /** list item */
  ListItem = 'list-item',
}

export const CommentEditorListBlockFormat = [
  CommentEditorBlockFormat.BulletedList,
  CommentEditorBlockFormat.NumberedList,
];

export const CommentEditorLeafType = 'text';

/** Editor leaf node format */
export enum CommentEditorLeafFormat {
  /** bold */
  Bold = 'bold',
  /** Italic */
  Italic = 'italic',
  /** underline */
  Underline = 'underline',
  /** Strikethrough */
  Strikethrough = 'strikethrough',
  /** link */
  Link = 'link',
}

/** Editor default block */
export const CommentEditorDefaultBlocks = [
  {
    type: CommentEditorBlockFormat.Paragraph,
    children: [{ text: '' }],
  },
];

/** Editor Default */
export const CommentEditorDefaultValue = JSON.stringify(
  CommentEditorDefaultBlocks,
);

/** Toolbar display delay */
export const CommentToolbarDisplayDelay = 200;

/** default link */
export const CommentDefaultLink = 'about:blank';
