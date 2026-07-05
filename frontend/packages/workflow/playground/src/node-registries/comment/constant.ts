/* eslint-disable @typescript-eslint/naming-convention -- todo */
/** Remarks Default size */
export const CommentDefaultSize = {
  width: 240,
  height: 150,
};

/** Remarks Default value */
export const CommentDefaultNote = JSON.stringify([
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
]);

export const CommentDefaultSchemaType = 'slate';

export const CommentDefaultVO = {
  schemaType: CommentDefaultSchemaType,
  note: CommentDefaultNote,
  size: CommentDefaultSize,
};

export const CommentDefaultDTO = {
  inputs: {
    schemaType: CommentDefaultSchemaType,
    note: CommentDefaultNote,
  },
  size: CommentDefaultSize,
};
