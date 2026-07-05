import { AvatarName } from '@coze-studio/components';
import { type public_api } from '@coze-arch/bot-api/product_api';

type ProductMetaInfo = public_api.ProductMetaInfo;
export const StoreAvatarName = (props: {
  metaInfo?: ProductMetaInfo;
  theme?: 'default' | 'light' | 'white';
  size?: 'small' | 'default' | 'large';
  renderCenterSlot?: React.ReactNode; // 中间自定义组件，例如「关注」按钮组件
  className?: string;
}) => (
  <AvatarName
    avatar={props?.metaInfo?.user_info?.avatar_url}
    username={props?.metaInfo?.user_info?.user_name}
    name={props?.metaInfo?.user_info?.name}
    label={{
      name: props?.metaInfo?.user_info?.user_label?.label_name,
      icon: props?.metaInfo?.user_info?.user_label?.icon_url,
      href: props?.metaInfo?.user_info?.user_label?.jump_link,
    }}
    theme={props.theme}
    nameMaxWidth={150}
    size={props.size}
    renderCenterSlot={props.renderCenterSlot}
    className={props.className}
  />
);
