import { useIsShowBackground } from './use-is-show-background';

export const useGetTheme = () => {
  const isShowBackground = useIsShowBackground();
  return isShowBackground ? 'bg-theme' : 'light';
};
