import { I18n } from '@coze-arch/i18n';
import { MemoryApi } from '@coze-arch/bot-api';
import { Toast } from '@coze-arch/coze-design';

import { useVariableGroupsStore } from '../../store';
/**
 * commit variable
 * @param projectID
 * @returns
 */
export async function submit(projectID: string) {
  const { getAllRootVariables, getDtoVariable } =
    useVariableGroupsStore.getState();
  const res = await MemoryApi.UpdateProjectVariable({
    ProjectID: projectID,
    VariableList: getAllRootVariables().map(item => getDtoVariable(item)),
  });

  if (res.code === 0) {
    Toast.success(I18n.t('Update_success'));
  }
}

/**
 * Check and make sure projectID is a non-empty string
 * @param projectID possibly empty project ID
 * @Returns whether projectID is a non-empty string
 */
export const checkProjectID = (projectID: unknown): projectID is string =>
  typeof projectID === 'string' && projectID.length > 0;
