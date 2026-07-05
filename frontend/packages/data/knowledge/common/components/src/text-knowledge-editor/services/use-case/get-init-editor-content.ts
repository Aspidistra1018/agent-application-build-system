/**
 * The editor doesn't wrap/n, so it needs to be converted to a < br/> tag
 */
export const getInitEditorContent = (content: string) => {
  if (content === '') {
    return '';
  }
  if (!content.includes('\n')) {
    return content;
  }
  return content.replace(/\n/g, '<br />');
};
