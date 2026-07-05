import { type FC } from 'react';

import { getCssVars } from '@/util/style';
import { type CozeWidgetProps, type WidgetAdapterProps } from '@/types/chat';
import { GlobalStoreProvider } from '@/store/context';
import { useMessageInteract } from '@/hooks/use-message-interact';
import { useImagePreview } from '@/hooks/use-image-preview';

import { ImagePreview } from './image-preview';
import { ChatContent } from './chat-content';
import { AstBtn } from './ast-btn';

const IFRAME_INDEX = 2;

const WidgetAdapter: FC<WidgetAdapterProps> = ({ client, position }) => {
  useImagePreview(client);
  useMessageInteract(client.chatClientId, client.options);

  const { base: baseConf } = client?.options?.ui || {};
  const zIndex = baseConf?.zIndex;
  const zIndexStyle = getCssVars({ zIndex });

  return (
    <>
      <ChatContent client={client} />
      <ImagePreview
        zIndex={zIndexStyle['--coze-z-index-iframe'] + IFRAME_INDEX}
      />
      <AstBtn client={client} position={position} />
    </>
  );
};

const CozeClientWidget: FC<CozeWidgetProps> = props => (
  <GlobalStoreProvider globalStore={props.globalStore}>
    <WidgetAdapter {...props} />
  </GlobalStoreProvider>
);

export default CozeClientWidget;
