/** reserved query parameters */
const PRESERVED_SEARCH_PARAMS = ['commit_version'];

/**
 * Add specific search params to the specified URL
 * @param url current url
 * @returns
 */
export function addPreservedSearchParams(url: string) {
  if (!url) {
    return url;
  }

  const searchParams = new URLSearchParams(window.location.search);
  const newSearchParams = new URLSearchParams();

  for (const param of PRESERVED_SEARCH_PARAMS) {
    const value = searchParams.get(param);
    if (value && !url.includes(`${param}=`)) {
      newSearchParams.append(param, value);
    }
  }

  const separator = url.includes('?') ? '&' : '?';
  const qs = newSearchParams.toString();
  return qs ? `${url}${separator}${qs}` : url;
}
