import { type FC, type PropsWithChildren } from 'react';

// import { I18n } from '@coze-arch/i18n';
import { IconCozDiamondFill } from '@coze-arch/coze-design/icons';
import { AIButton, Popover, Space } from '@coze-arch/coze-design';

export interface ActivatePopoverProps {
  id?: string;
  show?: boolean;
}

// 去开通popover弹窗
export const ActivatePopover: FC<PropsWithChildren<ActivatePopoverProps>> = ({
  children,
  id,
  show = true,
}) =>
  !show ? (
    children
  ) : (
    <Popover
      content={
        <div>
          <Space spacing={6}>
            <IconCozDiamondFill className="text-[16px] coz-fg-hglt" />
            <span className="font-[500] ">此插件需要管理员开通后使用</span>
          </Space>

          <div className="my-[8px] ">
            此插件为三方付费插件，需要开通后使用。
          </div>

          <div>
            <AIButton
              className="w-full"
              color="aiplus"
              hideIcon={true}
              onClick={() => {
                window.open(
                  `https://www.coze.cn/store/plugin/${id}?from=coze-studio-open`,
                  '_blank',
                );
              }}
            >
              去开通
            </AIButton>
          </div>
        </div>
      }
      showArrow
    >
      {children}
    </Popover>
  );
