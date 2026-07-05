import { type FC } from 'react';

import classNames from 'classnames';
import { Divider, Space } from '@coze-arch/coze-design';
import { IconCozWorkspaceFill } from '@coze-arch/coze-design/icons';
import { useRouteConfig } from '@coze-arch/bot-hooks';

import { type LayoutProps } from '../types';
import { SubMenu } from './sub-menu';
import { GLobalLayoutMenuItem } from './menu-item';
import { GlobalLayoutActionBtn } from './action-btn';

const siderStyle = classNames(
  'relative',
  'h-full',
  'border-[1px] border-solid coz-stroke-primary rounded-[14px]',
  'coz-bg-max',
  'flex flex-row items-stretch',
);

const mainMenuStyle = classNames(
  'px-[6px] py-[16px]',
  'flex flex-col h-full items-center',
);

export const GlobalLayoutSider: FC<Omit<LayoutProps, 'hasSider'>> = ({
  actions,
  menus,
  extras,
  onClickLogo,
  footer = null,
}) => {
  const config = useRouteConfig();
  const { subMenu: SubMenuComponent } = config;
  const hasSubNav = Boolean(SubMenuComponent);

  return (
    <div className="pl-8px py-8px h-full">
      <div className={siderStyle}>
        {/* main navigation */}
        <div
          className={classNames(
            mainMenuStyle,
            hasSubNav &&
              'border-0 border-r-[1px] border-solid coz-stroke-primary',
          )}
        >
          <button
            type="button"
            onClick={onClickLogo}
            className="w-[40px] h-[40px] p-0 border-0 bg-transparent cursor-pointer"
            aria-label="go-home"
          >
            <span className="w-[40px] h-[40px] rounded-[10px] bg-gradient-to-br from-[#FFB47A] to-[#FF8A3D] flex items-center justify-center shadow-[0_4px_12px_rgba(255,138,61,0.28)]">
              <IconCozWorkspaceFill className="text-white text-[20px]" />
            </span>
          </button>
          <div className="mt-[16px]">
            {actions?.map((action, index) => (
              <GlobalLayoutActionBtn {...action} key={index} />
            ))}
          </div>
          <Divider className="my-12px w-[24px]" />
          <Space spacing={4} vertical className="flex-1 overflow-auto">
            {menus?.map((menu, index) => (
              <GLobalLayoutMenuItem {...menu} key={index} />
            ))}
          </Space>
          <Space spacing={4} vertical className="mt-[12px]">
            {extras?.map((extra, index) => (
              <GlobalLayoutActionBtn {...extra} key={index} />
            ))}
            {footer}
          </Space>
        </div>
        {/* secondary navigation */}
        <SubMenu />
      </div>
    </div>
  );
};

GlobalLayoutSider.displayName = 'GlobalLayoutSider';
