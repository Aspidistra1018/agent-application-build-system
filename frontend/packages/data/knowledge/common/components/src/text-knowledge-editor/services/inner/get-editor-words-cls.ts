import classNames from 'classnames';

export const getEditorWordsCls = () =>
  classNames(
    // line feed
    '[&_p]:break-words [&_p]:whitespace-pre-wrap',
    // Keep all spaces and line breaks
    '[&_.ProseMirror_*]:break-words [&_.ProseMirror_*]:whitespace-pre-wrap',
    // paragraph
    '[&_.editor-paragraph]:min-h-[1.5em] [&_.editor-paragraph]:leading-normal',
    // Empty paragraph
    '[&_.editor-paragraph:empty]:min-h-[1.5em] [&_.editor-paragraph:empty]:block',
  );
