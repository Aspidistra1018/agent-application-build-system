import { useRef } from 'react';

import classNames from 'classnames';
import {
  ShortcutBar as ChatAreaShortcutBar,
  getUIModeByBizScene,
  type ShortCutCommand,
} from '@coze-common/chat-area-plugins-chat-shortcuts';
import { type ChatInputIntegrationController } from '@coze-common/chat-area';
import { ToolType } from '@coze-arch/idl/playground_api';

import { useChatAppStore } from '../../store';
import { useIsShowBackground } from '../../hooks/use-is-show-background';

export interface ShortcutBarRenderProps {
  controller: ChatInputIntegrationController;
  onShortcutActive?: (shortcut: ShortCutCommand | undefined) => void;
}

export const ShortcutBar = ({
  controller,
  onShortcutActive,
}: ShortcutBarRenderProps) => {
  const activeShortcutRef = useRef<ShortCutCommand | undefined>(undefined);

  const showBackground = useIsShowBackground();
  const shortcuts = useChatAppStore(store => store.shortcuts);
  const defaultId = shortcuts.at(0)?.command_id;

  if (!shortcuts?.length) {
    return null;
  }
  return (
    <ChatAreaShortcutBar
      shortcuts={shortcuts}
      wrapperClassName={classNames('w-full pl-[68px] pr-[24px] pb-[10px]')}
      uiMode={getUIModeByBizScene({
        bizScene: 'websdk',
        showBackground,
      })}
      defaultId={defaultId}
      onActiveShortcutChange={(shortcutInfo, isTemplateShortcutActive) => {
        activeShortcutRef.current = shortcutInfo;
        // 开启template快捷指令时，隐藏输入框&快捷指令bar
        const chatInputSlotVisible = !isTemplateShortcutActive;
        controller.setChatInputSlotVisible(chatInputSlotVisible);
        onShortcutActive?.(shortcutInfo);
      }}
      onBeforeSendTemplateShortcut={({ message, options, shortcut }) => {
        const parameters = {};
        Object.entries(
          (
            options?.extendFiled?.toolList as Array<{
              plugin_id: string;
              plugin_api_name: string;
              parameters: Record<
                string,
                {
                  value: string;
                  resource_type: 'uri' | '';
                }
              >;
            }>
          )?.[0]?.parameters || {},
        ).map(item => {
          const [key, value] = item;
          parameters[key] = value.value;
        });

        const optionsNew = options || {};

        if (!optionsNew.extendFiled) {
          optionsNew.extendFiled = {};
        }
        if (
          shortcut.tool_type === ToolType.ToolTypePlugin ||
          shortcut.tool_type === ToolType.ToolTypeWorkFlow
        ) {
          optionsNew.extendFiled.shortcut_command = {
            command_id: shortcut.command_id,
            parameters,
          };
        }

        return {
          message,
          options,
        };
      }}
    />
  );
};
