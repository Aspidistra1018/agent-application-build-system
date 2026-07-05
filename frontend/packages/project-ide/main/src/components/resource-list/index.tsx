import React, { useMemo } from 'react';

import {
  useProjectId,
  useSpaceId,
  useCommitVersion,
} from '@coze-project-ide/framework';
import { useWorkflowResource } from '@coze-project-ide/biz-workflow';
import { useDataResource } from '@coze-project-ide/biz-data';
import {
  BizResourceTypeEnum,
  ProjectResourceGroupType,
  ResourceFolderCoze,
  useResourceList,
  VARIABLE_RESOURCE_ID,
} from '@coze-project-ide/biz-components';
import {
  EProjectPermission,
  useProjectAuth,
  useProjectRole,
} from '@coze-common/auth';
import { FormatType } from '@coze-arch/bot-api/knowledge';
import {
  IconCozDatabase,
  IconCozDocument,
  IconCozImage,
  IconCozTable,
  IconCozVariables,
} from '@coze-arch/coze-design/icons';

const datasetIconMap = {
  [FormatType.Text]: <IconCozDocument />,
  [FormatType.Table]: <IconCozTable />,
  [FormatType.Image]: <IconCozImage />,
};

export const ResourceList = ({
  idPrefix = 'fixed-sidebar',
}: {
  idPrefix?: string;
}) => {
  const {
    onCustomCreate: createWorkflow,
    onDelete: deleteWorkflow,
    onChangeName: changeNameWorkflow,
    onAction: handleWorkflowAction,
    createResourceConfig: workflowCreateConfig,
    iconRender: workflowIconRender,
    modals: workflowModals,
  } = useWorkflowResource();

  const {
    onCustomCreate: createData,
    onDelete: deleteData,
    onChangeName: changeNameData,
    onAction: handleDataAction,
    createResourceConfig: dataCreateConfig,
    modals: dataModals,
    validateConfig,
  } = useDataResource();

  const spaceId = useSpaceId();
  const projectId = useProjectId();
  const { version: commitVersion } = useCommitVersion();

  let canCreate = useProjectAuth(
    EProjectPermission.CREATE_RESOURCE,
    projectId,
    spaceId,
  );

  // Version information exists, preview status cannot create resource
  if (commitVersion) {
    canCreate = false;
  }

  const projectRoles = useProjectRole(projectId);
  const hideMoreBtn = useMemo(
    // There is no permission, or there is version information, you need to hide the operation button.
    () => (projectRoles?.length ?? 0) === 0 || !!commitVersion,
    [projectRoles, commitVersion],
  );
  const { workflowResource, dataResource, initLoaded } = useResourceList();

  return (
    <div>
      <ResourceFolderCoze
        id={`${idPrefix}_${ProjectResourceGroupType.Workflow}`}
        groupType={ProjectResourceGroupType.Workflow}
        defaultResourceType={BizResourceTypeEnum.Workflow}
        resourceTree={workflowResource}
        canCreate={canCreate}
        initLoaded={initLoaded}
        onChangeName={changeNameWorkflow}
        onCustomCreate={createWorkflow}
        onDelete={deleteWorkflow}
        onAction={handleWorkflowAction}
        createResourceConfig={workflowCreateConfig}
        iconRender={workflowIconRender}
        hideMoreBtn={hideMoreBtn}
      />
      <ResourceFolderCoze
        id={`${idPrefix}_${ProjectResourceGroupType.Data}`}
        groupType={ProjectResourceGroupType.Data}
        resourceTree={dataResource}
        canCreate={canCreate}
        initLoaded={initLoaded}
        createResourceConfig={dataCreateConfig}
        onChangeName={changeNameData}
        onDelete={deleteData}
        onAction={handleDataAction}
        onCustomCreate={createData}
        hideMoreBtn={hideMoreBtn}
        validateConfig={validateConfig}
        iconRender={({ resource }) => {
          console.log(resource);
          if (resource.id === VARIABLE_RESOURCE_ID) {
            return <IconCozVariables />;
          }
          if (resource.type === BizResourceTypeEnum.Database) {
            return <IconCozDatabase />;
          }
          if (resource.type === BizResourceTypeEnum.Knowledge) {
            return (
              <div className="flex items-center">
                {datasetIconMap[resource.biz_extend?.format_type]}
                {/**
                 * 1: Enable
                 * 2: Delete, generally not
                 * 3: Disable
                 */}
                {resource.biz_res_status === 3 ? (
                  <span className="ml-[3px]">已禁用</span>
                ) : null}
              </div>
            );
          }
          return <></>;
        }}
      />
      {workflowModals}
      {dataModals}
    </div>
  );
};
