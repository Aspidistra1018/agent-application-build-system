import { I18n } from '@coze-arch/i18n';
import { FlowNodeFormData } from '@flowgram-adapter/free-layout-editor';

import {
  generateParametersToProperties,
  getRelatedInfo,
  generateEnvToRelatedContextProperties,
} from '@/test-run-kit';
import { type NodeTestMeta } from '@/test-run-kit';

import { LoopType } from './constants';

export const test: NodeTestMeta = {
  async generateRelatedContext(_, context) {
    const { isInProject, workflowId, spaceId } = context;
    if (isInProject) {
      return {};
    }
    const related = await getRelatedInfo({ workflowId, spaceId });
    return generateEnvToRelatedContextProperties(related);
  },
  generateFormSettingProperties(node) {
    const { formModel } = node.getData(FlowNodeFormData);
    const data = formModel.getFormItemValueByPath('/inputs');
    if (data?.loopType === LoopType.Count && data?.loopCount) {
      return generateParametersToProperties(
        [
          {
            name: 'loopCount',
            title: I18n.t('workflow_loop_count'),
            /** Cycle count is required */
            required: true,
            input: data.loopCount,
          },
        ],
        { node },
      );
    }
    return {};
  },
  generateFormInputProperties(node) {
    const formData = node
      .getData(FlowNodeFormData)
      .formModel.getFormItemValueByPath('/');
    const parameters = formData?.inputs?.inputParameters;
    const variable = formData?.inputs?.variableParameters;
    const properties = {
      // Input when specifying the number of cycles
      ...(formData?.inputs?.loopType === LoopType.Array
        ? generateParametersToProperties(parameters, { node })
        : {}),
      /** intermediate variable */
      ...generateParametersToProperties(variable, { node }),
    };
    return properties;
  },
};
