import { useLocation } from 'react-router-dom';

/**
 * Get the workspace submodule from the URL
 * @param pathname
 * @Returns the working submodule string, or undefined if it doesn't match
 */
const getSpaceApp = (pathname: string): string | undefined => {
  // Start with /space/, followed by spaceId, followed by submodules (only letters, numbers, -, _ allowed)
  const match = pathname.match(/^\/space\/[^/]+\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : undefined;
};

export const useSpaceApp = () => {
  const { pathname } = useLocation();

  const spaceApp = getSpaceApp(pathname);

  return spaceApp;
};
