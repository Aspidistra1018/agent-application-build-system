import { IconButton } from '@coze-arch/coze-design';
import { IconSideFoldOutlined } from '@coze-arch/bot-icons';

import { useOpenGlobalLayoutSideSheet } from './global-layout/hooks';

// Use to open sidebar in mobile end mode
export const SideSheetMenu = () => {
  const open = useOpenGlobalLayoutSideSheet();

  return (
    <IconButton
      color="secondary"
      icon={<IconSideFoldOutlined className="coz-fg-primary text-base" />}
      onClick={open}
    />
  );
};

export default SideSheetMenu;
