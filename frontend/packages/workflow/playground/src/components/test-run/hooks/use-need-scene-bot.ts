import { type StandardNodeType } from '@coze-workflow/base/types';
import { I18n } from '@coze-arch/i18n';

import { FieldName } from '../constants';
import { useGetSceneFlowBot } from '../../../hooks/use-get-scene-flow-params';
import { useGetWorkflowMode } from '../../../hooks';

/**
 * Determine if testrun needs an associated bot_id under the scenario workflow
 */
export const useNeedSceneBot = (nodeType: StandardNodeType) => {
  const { isSceneFlow } = useGetWorkflowMode();
  const sceneFlowHost = useGetSceneFlowBot();

  return {
    needSceneBot: isSceneFlow,
    sceneBotSchema: {
      type: 'FormString',
      name: FieldName.Bot,
      initialValue: sceneFlowHost?.participantId,
      title: I18n.t('workflow_detail_testrun_bot', {}, '关联 Bot'),
      disabled: true,
      // No nodeType, the description is the whole practice run, hidden bot
      hidden: !nodeType,
      decorator: {
        type: 'FormItem',
      },
      component: {
        type: 'Select',
        props: {
          optionList: [
            {
              label: sceneFlowHost?.name,
              value: sceneFlowHost?.participantId,
            },
          ],
          disabled: true,
        },
      },
    },
  };
};
