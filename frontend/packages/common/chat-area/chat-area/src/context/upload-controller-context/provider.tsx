import { type PropsWithChildren, useRef, useEffect } from 'react';

import { UploadController } from '../../service/upload-controller';
import { useChatAreaContext } from '../../hooks/context/use-chat-area-context';
import {
  UploadControllerContext,
  type UploadControllerContextProps,
} from './context';

export const UploadControllerProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { configs } = useChatAreaContext();
  const uploadControllerMap = useRef<
    UploadControllerContextProps['uploadControllerMap']
  >({});
  const createControllerAndUpload: UploadControllerContextProps['createControllerAndUpload'] =
    param => {
      uploadControllerMap.current[param.fileId] = new UploadController({
        ...param,
        multiUploadPlugin: configs.uploadPlugin,
      });
    };
  const cancelUploadById: UploadControllerContextProps['cancelUploadById'] =
    id => {
      const controller = uploadControllerMap.current[id];
      if (!controller) {
        return;
      }
      controller.cancel();
      delete uploadControllerMap.current[id];
    };

  const clearAllSideEffect: UploadControllerContextProps['clearAllSideEffect'] =
    () => {
      Object.entries(uploadControllerMap.current).forEach(([, controller]) =>
        controller.cancel(),
      );
      uploadControllerMap.current = {};
    };

  useEffect(() => clearAllSideEffect, []);

  return (
    <UploadControllerContext.Provider
      value={{
        uploadControllerMap: uploadControllerMap.current,
        createControllerAndUpload,
        cancelUploadById,
        clearAllSideEffect,
      }}
    >
      {children}
    </UploadControllerContext.Provider>
  );
};
