/* eslint-disable @coze-arch/no-deep-relative-import */
/**
 * Interactively, when the operator is selected, when the rvalue is switched between disabled and disabled, it needs to keep the type the same as last time, so here is a state store
 */
import React, { type FC, useEffect, useState } from 'react';

import { ConditionType } from '@coze-arch/idl/workflow_api';
import { Input } from '@coze-arch/coze-design';

import {
  ValueExpressionInput,
  type ValueExpressionInputProps,
} from '../../../../../components/value-expression-input';

export const ValueExpressionWithState: FC<
  ValueExpressionInputProps & {
    operator?: ConditionType;
  }
> = props => {
  const { value, operator } = props;

  const [valueType, setValueType] = useState(value?.type);

  useEffect(() => {
    if (value?.type) {
      setValueType(value?.type);
    }
  }, [value?.type]);

  if (
    operator &&
    [ConditionType.Null, ConditionType.NotNull].includes(operator)
  ) {
    return <Input disabled value="empty" size="small" />;
  }
  if (
    operator &&
    [ConditionType.True, ConditionType.False].includes(operator)
  ) {
    if (operator === ConditionType.True) {
      return <Input disabled value="true" size="small" />;
    } else {
      return <Input disabled value="false" size="small" />;
    }
  }

  return (
    <ValueExpressionInput
      {...props}
      value={value ?? (valueType ? { type: valueType } : undefined)}
    />
  );
};
