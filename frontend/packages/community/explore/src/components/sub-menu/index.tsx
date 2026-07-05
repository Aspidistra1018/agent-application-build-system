import { useNavigate } from 'react-router-dom';

import { SubMenuItem } from '@coze-community/components';
import { I18n } from '@coze-arch/i18n';
import {
  IconCozTemplate,
  IconCozTemplateFill,
  IconCozPlugin,
  IconCozPluginFill,
} from '@coze-arch/coze-design/icons';
import { Space } from '@coze-arch/coze-design';

import { useExploreRoute } from '../../hooks/use-explore-route';

const getMenuConfig = () => [
  {
    type: 'plugin',
    icon: <IconCozPlugin />,
    activeIcon: <IconCozPluginFill />,
    title: I18n.t('Plugins'),
    isActive: true,
    path: '/explore/plugin',
  },
  {
    icon: <IconCozTemplate />,
    activeIcon: <IconCozTemplateFill />,
    title: I18n.t('template_name'),
    isActive: true,
    type: 'template',
    path: '/explore/template',
  },
];

export const ExploreSubMenu = () => {
  const navigate = useNavigate();
  const { type } = useExploreRoute();
  const menuConfig = getMenuConfig();
  return (
    <Space spacing={4} vertical>
      {menuConfig.map(item => (
        <SubMenuItem
          {...item}
          isActive={item.type === type}
          onClick={() => {
            navigate(item.path);
          }}
        />
      ))}
    </Space>
  );
};
