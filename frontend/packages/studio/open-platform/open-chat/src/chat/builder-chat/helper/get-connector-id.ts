import { webSdkDefaultConnectorId, chatflowDraftConnectorId } from '@/util';

import { type IBuilderChatProps } from '../type';

export const getConnectorId = (props: IBuilderChatProps) => {
  const { project } = props;
  const { mode, connectorId } = project || {};
  if (!connectorId) {
    if (mode === 'websdk') {
      return webSdkDefaultConnectorId;
    } else if (mode === 'draft') {
      return chatflowDraftConnectorId;
    }
  }
  return connectorId;
};
