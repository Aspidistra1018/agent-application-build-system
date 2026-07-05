import { WorkflowNode } from '@coze-workflow/base';
import { I18n } from '@coze-arch/i18n';

import { DatabaseNodeService, ValueExpressionService } from '@/services';

export const createConditionValidator = (conditionFieldPath: string) => ({
  [`${conditionFieldPath}.*.left`]: ({ value }) => {
    if (value === undefined) {
      return I18n.t('workflow_detail_node_error_empty');
    }
  },
  [`${conditionFieldPath}.*.operator`]: ({ value }) => {
    if (value === undefined) {
      return I18n.t('workflow_detail_condition_condition_empty');
    }
  },
  [`${conditionFieldPath}.*.right`]: ({ name, value, context }) => {
    const node = new WorkflowNode(context.node);
    const conditionPathName = name.replace('.right', '');
    const condition = node.getValueByPath(conditionPathName);
    const databaseNodeService = context.node.getService(DatabaseNodeService);
    const valueExpressionService = context.node.getService(
      ValueExpressionService,
    );

    // If no rvalue is required, skip the verification
    if (
      databaseNodeService.checkConditionOperatorNoNeedRight(condition?.operator)
    ) {
      return;
    }

    if (value === undefined) {
      return I18n.t('workflow_detail_node_error_empty');
    }

    // Check if the reference variable is deleted
    if (
      valueExpressionService.isRefExpression(value) &&
      !valueExpressionService.isRefExpressionVariableExists(value, context.node)
    ) {
      return I18n.t('workflow_detail_variable_referenced_error');
    }
  },
});
