import { ConditionLogic } from '@coze-workflow/base';

import { useCurrentDatabaseQuery } from '@/hooks';
import { useForm } from '@/form';

export function useResetCondition(conditionFieldName: string) {
  const form = useForm();
  const { data: currentDatabase } = useCurrentDatabaseQuery();

  return () => {
    // There is currently a selected database, and an empty condition is required.
    if (currentDatabase) {
      form.setFieldValue(conditionFieldName, {
        conditionList: [
          { left: undefined, operator: undefined, right: undefined },
        ],
        logic: ConditionLogic.AND,
      });
    } else {
      form.setFieldValue(conditionFieldName, undefined);
    }
  };
}
