import { CommentEditorLeafFormat, CommentDefaultLink } from '../../constant';

export const Leaf = ({ attributes, children, leaf }) => {
  if (leaf[CommentEditorLeafFormat.Bold]) {
    children = <strong>{children}</strong>;
  }

  if (leaf[CommentEditorLeafFormat.Strikethrough]) {
    children = <del>{children}</del>;
  }

  if (leaf[CommentEditorLeafFormat.Italic]) {
    children = <em>{children}</em>;
  }

  if (leaf[CommentEditorLeafFormat.Underline]) {
    children = <u>{children}</u>;
  }

  if (leaf[CommentEditorLeafFormat.Link]) {
    children = (
      <a
        className="text-[var(--semi-color-link)] cursor-pointer"
        href={leaf[CommentEditorLeafFormat.Link]}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          const link: string = leaf[CommentEditorLeafFormat.Link];
          if (link === CommentDefaultLink) {
            // If the link is the default link, open it directly.
            return window.open(link, '_blank');
          } else if (/^([a-zA-Z][a-zA-Z\d+\-.]*):\/\//.test(link)) {
            // If a legal agreement is already included, open it directly
            return window.open(link, '_blank');
          } else {
            // If there is no legal agreement, add the https protocol header.
            // cp-disable-next-line
            return window.open(`https://${link}`, '_blank');
          }
        }}
      >
        {children}
      </a>
    );
  }

  return <span {...attributes}>{children}</span>;
};
