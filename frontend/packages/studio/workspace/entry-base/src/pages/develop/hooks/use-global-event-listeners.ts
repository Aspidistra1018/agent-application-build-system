import { useEffect } from 'react';

import {
  cozeMitt,
  type RefreshFavListParams,
  type CreateProjectByCopyTemplateFromSidebarParam,
} from '@coze-common/coze-mitt';

export const useGlobalEventListeners = ({
  reload,
  spaceId,
}: {
  reload: () => void;
  spaceId: string;
}) => {
  useEffect(() => {
    const handlerRefreshFavList = (
      refreshFavListParams: RefreshFavListParams,
    ) => {
      // Refresh the list only when the workspace collection is cancelled and the collection is changed.
      if (refreshFavListParams.emitPosition === 'favorites-list-item') {
        reload();
      }
    };
    const handleReloadConditionally = (
      eventParam: CreateProjectByCopyTemplateFromSidebarParam,
    ) => {
      if (eventParam.toSpaceId !== spaceId) {
        return;
      }
      reload();
    };
    cozeMitt.on('refreshFavList', handlerRefreshFavList);
    cozeMitt.on(
      'createProjectByCopyTemplateFromSidebar',
      handleReloadConditionally,
    );
    return () => {
      cozeMitt.off('refreshFavList', handlerRefreshFavList);
      cozeMitt.off(
        'createProjectByCopyTemplateFromSidebar',
        handleReloadConditionally,
      );
    };
  }, []);
};
