/**
 * Get the latest scrollable element
 */
export function closestScrollableElement(element: HTMLElement) {
  const htmlElement = document.documentElement;
  if (!element) {
    return htmlElement;
  }
  let style = window.getComputedStyle(element);
  const excludeStaticParent = style.position === 'absolute';
  const overflowReg = /(auto|scroll|overlay)/;

  if (style.position === 'fixed') {
    return htmlElement;
  }
  let parent = element;
  while (parent) {
    style = window.getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {
      parent = parent.parentElement as HTMLElement;
      continue;
    }
    if (
      overflowReg.test(style.overflow + style.overflowY + style.overflowX) ||
      parent.getAttribute('data-overflow') === 'true'
    ) {
      return parent;
    }
    parent = parent.parentElement as HTMLElement;
  }
  return htmlElement;
}

// Solve browser interception window.open behavior, interface catch jump error default page
export const openNewWindow = async (
  callbackUrl: () => Promise<string> | string,
  defaultUrl?: string,
) => {
  const newWindow = window.open(defaultUrl || '');

  let url = '';
  try {
    url = await callbackUrl();
  } catch (error) {
    url = `${location.origin}/404`;
    newWindow?.close();
  }

  if (newWindow) {
    newWindow.location = url;
  }
};
