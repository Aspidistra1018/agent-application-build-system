import { FlowNodeFormData } from '@flowgram-adapter/free-layout-editor';

import {
  generateParametersToProperties,
  generateEnvToRelatedContextProperties,
} from '@/test-run-kit';
import { type NodeTestMeta } from '@/test-run-kit';

export const test: NodeTestMeta = {
  generateRelatedContext(node, context) {
    const { isInProject, isChatflow } = context;
    /** Not in session flow, LLM nodes do not need to be associated with the environment */
    const formData = node
      .getData(FlowNodeFormData)
      .formModel.getFormItemValueByPath('/');
    const enableChatHistory =
      formData?.inputs?.chatHistorySetting?.enableChatHistory;
    if (!isChatflow || !enableChatHistory) {
      return {};
    }
    return generateEnvToRelatedContextProperties({
      isNeedBot: !isInProject,
      isNeedConversation: true,
    });
  },
  generateFormInputProperties(node) {
    const formData = node
      .getData(FlowNodeFormData)
      .formModel.getFormItemValueByPath('/');
    const parameters = formData?.inputs?.inputParameters;
    return generateParametersToProperties(parameters, { node });
  },
};
