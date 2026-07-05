/**
 * HTML whitelist to prevent XSS attacks
 */

// Whitelist of HTML tags allowed by default
const DEFAULT_ALLOWED_TAGS = [
  'img',
  'table',
  'colgroup',
  'col',
  'tbody',
  'thead',
  'tfoot',
  'tr',
  'td',
  'th',
  'br',
  'p',
];

/**
 * Escape HTML, allowing only whitelisted tags
 * @param unsafe HTML string
 * @Param allowedTags Array of HTML tags allowed, default to DEFAULT_ALLOWED_TAGS
 * @Returns the escaped HTML string
 */
export function escapeHtml(
  unsafe: string,
  allowedTags: string[] = DEFAULT_ALLOWED_TAGS,
): string {
  if (!unsafe) {
    return '';
  }

  // Building regular expression patterns
  const allowedTagsPattern = allowedTags.join('|');
  const tagRegex = new RegExp(
    `<(?!(${allowedTagsPattern})\\b[^>]*>|\\/(?:${allowedTagsPattern})>)`,
    'g',
  );

  return unsafe.replace(tagRegex, '&lt;');
}
