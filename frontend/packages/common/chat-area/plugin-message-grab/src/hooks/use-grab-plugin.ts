import { useMemo, useState } from 'react';

import { type MessageSource } from '@coze-common/chat-area';

import { type Scene, createGrabPlugin } from '../create';

interface Params {
  onQuote?: ({
    botId,
    source,
  }: {
    botId: string;
    source: MessageSource | undefined;
  }) => void;
  // At present, only the scene of the store needs to be distinguished.
  scene?: Scene;
}
export const useCreateGrabPlugin = (params?: Params) => {
  const { onQuote, scene = 'other' } = params ?? {};
  const [grabEnableUpload, setGrabEnableUpload] = useState(true);

  // eslint-disable-next-line @typescript-eslint/naming-convention -- matches the expected naming
  const { grabPlugin: GrabPlugin, grabPluginId } = useMemo(
    () =>
      createGrabPlugin({
        preference: {
          enableGrab: true,
        },
        onQuote,
        onQuoteChange: ({ isEmpty }) => {
          setGrabEnableUpload(isEmpty);
        },
        scene,
      }),
    [],
  );

  return { grabEnableUpload, GrabPlugin, grabPluginId };
};
