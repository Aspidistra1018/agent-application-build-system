import { useChatAppProps, useChatAppStore } from '../store';

export const useIsShowBackground = () => {
  const backgroundInfo = useChatAppStore(s => s.backgroundInfo);
  const { isCustomBackground } = useChatAppProps();

  // 自定义背景图，或者背景图有数据，则有背景状态
  return (
    isCustomBackground ||
    !!backgroundInfo?.mobile_background_image?.origin_image_url ||
    false
  );
};
