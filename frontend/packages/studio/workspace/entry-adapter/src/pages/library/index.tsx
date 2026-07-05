import { type FC, useRef } from 'react';

import {
  BaseLibraryPage,
  useDatabaseConfig,
  useWorkflowConfig,
  usePromptConfig,
  useKnowledgeConfig,
} from '@coze-studio/workspace-base/library';

export const LibraryPage: FC<{ spaceId: string }> = ({ spaceId }) => {
  const basePageRef = useRef<{ reloadList: () => void }>(null);
  const configCommonParams = {
    spaceId,
    reloadList: () => {
      basePageRef.current?.reloadList();
    },
  };
  const { config: workflowConfig, modals: workflowModals } =
    useWorkflowConfig(configCommonParams);
  const { config: knowledgeConfig, modals: knowledgeModals } =
    useKnowledgeConfig(configCommonParams);
  const { config: promptConfig, modals: promptModals } =
    usePromptConfig(configCommonParams);
  const { config: databaseConfig, modals: databaseModals } =
    useDatabaseConfig(configCommonParams);

  return (
    <>
      <BaseLibraryPage
        spaceId={spaceId}
        ref={basePageRef}
        entityConfigs={[
          workflowConfig,
          knowledgeConfig,
          promptConfig,
          databaseConfig,
        ]}
      />
      {workflowModals}
      {promptModals}
      {databaseModals}
      {knowledgeModals}
    </>
  );
};
