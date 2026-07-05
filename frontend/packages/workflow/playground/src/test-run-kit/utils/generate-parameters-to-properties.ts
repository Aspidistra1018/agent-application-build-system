/* eslint-disable @typescript-eslint/no-explicit-any */
import { isGlobalVariableKey } from '@coze-workflow/variable';
import { getSortedInputParameters } from '@coze-workflow/nodes';
import { ValueExpressionType } from '@coze-workflow/base';

import { isStaticObjectRef } from '@/components/test-run/utils/is-static-object-ref';

import type { WorkflowNodeEntity } from '../types';
import { generateInputToField } from './generate-input-to-field';

export const generateParametersToProperties = (
  parameters: any[],
  { node }: { node: WorkflowNodeEntity },
) => {
  if (!parameters || !Array.isArray(parameters)) {
    return {};
  }

  const fields = parameters.filter(i => {
    /** Object reference types do not need to be filtered, all static fields need to be filtered */
    if (i.input?.type === ValueExpressionType.OBJECT_REF) {
      return !isStaticObjectRef(i);
    }
    /** Direct filtering of non-reference types, no direct filtering of reference values */
    if (i.input?.type !== 'ref' || !i.input?.content) {
      return false;
    }
    /** If the reference is from itself, there is no need to fill it in */
    const [nodeId] = i.input.content.keyPath || [];
    if (nodeId && nodeId === node.id) {
      return false;
    }
    if (isGlobalVariableKey(nodeId)) {
      return false;
    }

    return true;
  });
  const sortedFields = getSortedInputParameters(fields);

  return sortedFields
    .map(field => generateInputToField(field, { node }))
    .reduce((properties, field) => {
      if (field.name) {
        properties[field.name] = field;
      }
      return properties;
    }, {});
};
