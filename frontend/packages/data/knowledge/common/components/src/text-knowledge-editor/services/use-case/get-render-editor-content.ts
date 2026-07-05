import { escapeHtml } from '@/text-knowledge-editor/utils/escape-html';

/**
 * Get the rendered HTML content
 */
export const getRenderHtmlContent = (content: string) => {
  if (content === '') {
    return '';
  }

  // Escape HTML, allowing only whitelisted tags
  const htmlContent = escapeHtml(content);

  // The editor doesn't wrap/n, so it needs to be converted to a < br/> tag
  return htmlContent.replace(/\n/g, '<br />');
};
