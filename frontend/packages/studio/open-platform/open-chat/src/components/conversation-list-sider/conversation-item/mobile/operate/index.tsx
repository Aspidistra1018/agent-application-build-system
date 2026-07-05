import { I18n } from '@coze-arch/i18n';
import { IconCozEdit, IconCozTrashCan } from '@coze-arch/coze-design/icons';
import { Menu } from '@coze-arch/coze-design';

export const MobileConversationOperate = ({
  onRename,
  onDelete,
  visible,
  children,
}: {
  onRename: () => void;
  onDelete: () => void;
  visible: boolean;
  children: React.ReactNode;
}) => (
  <>
    <Menu
      trigger="custom"
      position="bottom"
      visible={visible}
      render={
        <Menu.SubMenu mode="menu">
          <Menu.Item
            onClick={(_, e) => {
              e.stopPropagation();
              e.preventDefault();
              onRename();
            }}
            icon={<IconCozEdit />}
          >
            {I18n.t('workflow_detail_node_rename', {}, '重命名')}
          </Menu.Item>
          <Menu.Item
            onClick={(_, e) => {
              e.stopPropagation();
              e.preventDefault();
              onDelete();
            }}
            icon={<IconCozTrashCan color="var(--coz-fg-hglt-red)" />}
          >
            <span style={{ color: 'var(--coz-fg-hglt-red)' }}>
              {I18n.t('web_sdk_delete', {}, '删除')}
            </span>
          </Menu.Item>
        </Menu.SubMenu>
      }
    >
      {children}
    </Menu>
  </>
);
