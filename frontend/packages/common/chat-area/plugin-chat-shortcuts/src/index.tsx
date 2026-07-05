// ! Notice prohibits direct export of shortcut-tool, causing downstream dependencies on unwanted knowledge-uploads
// export { ShortcutToolConfig } from './shortcut-tool';
export { ShortcutBar } from './shortcut-bar';

export { ComponentsTable } from './shortcut-tool/shortcut-edit/components-table';

export {
  ShortCutCommand,
  getStrictShortcuts,
} from '@coze-agent-ide/tool-config';

export type {
  OnBeforeSendTemplateShortcutParams,
  OnBeforeSendQueryShortcutParams,
} from './shortcut-bar/types';

export { getUIModeByBizScene } from './utils/get-ui-mode-by-biz-scene';
