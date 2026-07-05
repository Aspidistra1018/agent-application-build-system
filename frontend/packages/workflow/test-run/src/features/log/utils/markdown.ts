import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { isString } from 'lodash-es';

/**
 * Is it consistent with rendering as markdown?
 * 1. ast > 1 or
 * 2. ast = 1 and the type is not a normal paragraph
 * 2. ast = 1 and the type is normal paragraph, but there are more than two paragraphs or only one item in the paragraph but not text
 */
export const isPreviewMarkdown = (str: unknown) => {
  if (!isString(str)) {
    return false;
  }

  const tree = unified().use(remarkParse).parse(str);

  if (tree.children.length > 1) {
    return true;
  }
  if (tree.children.length === 1) {
    const [child] = tree.children;
    if (child.type !== 'paragraph') {
      return true;
    } else if (
      child.children.length > 1 ||
      child.children?.[0]?.type !== 'text'
    ) {
      return true;
    }
  }
  return false;
};
