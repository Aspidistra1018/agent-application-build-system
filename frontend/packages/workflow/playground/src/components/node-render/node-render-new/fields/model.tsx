import { useState, useEffect } from 'react';

import { useWorkflowNode } from '@coze-workflow/base';
import { I18n } from '@coze-arch/i18n';
import { CozAvatar } from '@coze-arch/coze-design';
import { useWorkflowModels } from '@/hooks';
import { Field } from './field';

export function Model() {
  const { data } = useWorkflowNode();
  const [modelName, setModelName] = useState(data?.model?.modelName);
  const { models } = useWorkflowModels();

  useEffect(() => {
    // fix:
    // The drop-down box on the right shows that the model name is obtained in the name field, not the modelName.
    // Therefore, you need to find the original model according to the modeType, display the name field, and keep the display on both sides consistent.
    if (data?.model?.modelType) {
      const model = models.find(v => v.model_type === data?.model?.modelType);
      if (model) {
        setModelName(model.name);
      }
    }
  }, [models, data, data?.model]);

  return (
    <Field label={I18n.t('workflow_detail_llm_model')} isEmpty={!modelName}>
      <div className="flex items-center leading-[20px]">
        <CozAvatar
          size={'mini'}
          shape="square"
          src={
            models.find(item => item.model_type === data?.model?.modelType)
              ?.model_icon
          }
          className={'shrink-0 h-4 w-4 mr-1'}
          data-testid="bot-detail.model-config-modal.model-avatar"
        />
        {modelName}
      </div>
    </Field>
  );
}
