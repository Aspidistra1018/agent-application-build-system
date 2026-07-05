import { CommentEditorBlockFormat } from '../../constant';

export const Block = ({ attributes, children, element }) => {
  const style = {
    textAlign: element.align,
    color: 'var(--coz-fg-primary, rgba(6, 7, 9, 0.80))',
  };
  // Select the corresponding HTML tag based on the element type
  switch (element.type) {
    case CommentEditorBlockFormat.Paragraph:
      // Render paragraph
      return (
        <p className="text-[12px] m-0 p-0" style={style} {...attributes}>
          {children}
        </p>
      );
    case CommentEditorBlockFormat.Blockquote:
      // Render reference block
      return (
        <blockquote
          className="border-l-[3px] border-t-0 border-b-0 border-r-0 border-solid border-[#ced0d4] m-0 p-0 pl-[8px] ml-[8px] text-[12px]"
          style={{
            ...style,
            color: 'var(--coz-fg-secondary, rgba(32, 41, 69, 0.62))',
          }}
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case CommentEditorBlockFormat.HeadingOne:
      // Render first-level title
      return (
        <h1
          className="text-[18px] mx-0 my-[6px] p-0 font-[600]"
          style={style}
          {...attributes}
        >
          {children}
        </h1>
      );
    case CommentEditorBlockFormat.HeadingTwo:
      // Render secondary title
      return (
        <h2
          className="text-[16px] mx-0 my-[6px] p-0 font-[600]"
          style={style}
          {...attributes}
        >
          {children}
        </h2>
      );
    case CommentEditorBlockFormat.HeadingThree:
      // Render three-level title
      return (
        <h3
          className="text-[14px] mx-0 my-[6px] p-0 font-[600]"
          style={style}
          {...attributes}
        >
          {children}
        </h3>
      );
    case CommentEditorBlockFormat.BulletedList:
      // Render unordered list
      return (
        <ul
          className="text-[12px] m-0 p-0 pl-[16px] font-[400]"
          style={style}
          {...attributes}
        >
          {children}
        </ul>
      );
    case CommentEditorBlockFormat.NumberedList:
      // Render ordered list
      return (
        <ol
          className="text-[12px] m-0 p-0 pl-[16px]"
          style={style}
          {...attributes}
        >
          {children}
        </ol>
      );
    case CommentEditorBlockFormat.ListItem:
      // Render list items
      return (
        <li className="text-[12px] m-0 p-0" style={style} {...attributes}>
          {children}
        </li>
      );
    default:
      // Default render as paragraph
      return (
        <p className="text-[12px] m-0 p-0" style={style} {...attributes}>
          {children}
        </p>
      );
  }
};
