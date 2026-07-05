import React, { useMemo, type FC } from 'react';

import { type WorkflowDetailInfoData } from '@coze-workflow/base';
import { I18n } from '@coze-arch/i18n';
import { IconCozExit } from '@coze-arch/coze-design/icons';

import { useGlobalState } from '@/hooks';

import { type SubWorkflowDetailDTO, type Identifier } from '../types';

export const SubWorkflowLink: FC<{
  workflowDetail: SubWorkflowDetailDTO;
  identifier: Identifier;
}> = props => {
  const { workflowDetail, identifier } = props;
  const { workflowId } = identifier;
  const { getProjectApi, spaceId } = useGlobalState();
  const projectApi = getProjectApi();
  const isProjectWorkflow = Boolean(
    (workflowDetail as WorkflowDetailInfoData)?.project_id,
  );

  const subWorkflowProjectId = isProjectWorkflow
    ? (workflowDetail as WorkflowDetailInfoData)?.project_id
    : undefined;

  // Get the latest commitId
  const commitId = useMemo(() => {
    /** The process from the repository requires obtaining the latest version number */
    const latestVersion = isProjectWorkflow
      ? undefined
      : workflowDetail.latest_flow_version;

    const { workflowVersion } = identifier;

    /** Is it the latest version of the subprocess? */
    const isLatest = !workflowVersion || workflowVersion === latestVersion;
    return isLatest ? undefined : workflowDetail.commit_id;
  }, [workflowDetail, isProjectWorkflow]);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (IS_BOT_OP) {
      window.open(
        `${window.location.pathname}?workflow_id=${workflowId}`,
        '_blank',
      );
      e.stopPropagation();
      return;
    }
    // When there is a project id, it is the workflow within the referenced project.
    if (subWorkflowProjectId && projectApi?.navigate) {
      projectApi?.navigate(`/workflow/${workflowId}`);
    } else {
      let url = `/work_flow?space_id=${spaceId}&workflow_id=${workflowId}`;
      if (commitId) {
        url += `&version=${commitId}`;
      }
      window.open(url, '_blank');
    }
  };

  return (
    <span
      className="cursor-pointer flex items-center w-full justify-between"
      onClick={e => handleClick(e)}
    >
      {I18n.t('workflow_subwf_jump_detail', {}, 'Workflow Detail')}
      <IconCozExit className="text-xs" />
    </span>
  );
};

export const createSubWorkflowLink = (
  workflowDetail: SubWorkflowDetailDTO,
  identifier: Identifier,
) => (
  <SubWorkflowLink workflowDetail={workflowDetail} identifier={identifier} />
);
