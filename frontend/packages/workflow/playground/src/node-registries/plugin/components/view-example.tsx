import React from 'react';

import { type ApiNodeDetailDTO } from '@coze-workflow/nodes';
import { type DebugExample } from '@coze-workflow/base';
import { I18n } from '@coze-arch/i18n';
import { useViewExample } from '@coze-agent-ide/bot-plugin-tools/useViewExample';
import { Typography, ConfigProvider } from '@coze-arch/coze-design';

interface Props {
  debugExample: DebugExample;
  inputs: ApiNodeDetailDTO['inputs'];
}

export const ViewExample = (props: Props) => {
  const { debugExample, inputs } = props;

  const { exampleNode, doShowExample } = useViewExample();

  const handleClick = () => {
    doShowExample({
      scene: 'workflow',
      requestParams: inputs,
      debugExample,
    });
  };

  if (!debugExample) {
    return null;
  }

  // The special thing about workflow is that at the node level, the popupcontainer is set on the node rather than the canvas
  // Therefore, you need to configure the popupContainer through the ConfigProvider, overriding the ConfigProvider on the NodeRender.
  // Otherwise it will not be displayed at the node level
  return (
    <ConfigProvider getPopupContainer={() => document.body}>
      {exampleNode}

      <Typography.Text
        className="cursor-pointer absolute top-[16px] right-[10px] text-xs"
        onClick={handleClick}
        link
      >
        {I18n.t('plugin_edit_tool_view_example')}
      </Typography.Text>
    </ConfigProvider>
  );
};
