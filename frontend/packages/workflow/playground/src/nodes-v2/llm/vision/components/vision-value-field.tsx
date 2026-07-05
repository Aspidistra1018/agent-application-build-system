import { type FC } from 'react';

import {
  Field,
  type FieldRenderProps,
} from '@flowgram-adapter/free-layout-editor';
import { type ValueExpression, ViewVariableType } from '@coze-workflow/base';

import { ValueExpressionInput } from '@/nodes-v2/components/value-expression-input';
import { FormItemFeedback } from '@/nodes-v2/components/form-item-feedback';

import { DEFUALT_VISION_INPUT } from '../constants';

interface VisionProps {
  name: string;
  enabledTypes: ViewVariableType[];
}

/**
 * input value field
 * @returns */
export const VisionValueField: FC<VisionProps> = ({ enabledTypes, name }) => {
  const disabledTypes = ViewVariableType.getComplement([
    ...enabledTypes,
    ViewVariableType.String,
  ]);

  return (
    <Field name={name}>
      {({
        field: childInputField,
        fieldState: inputFieldState,
      }: FieldRenderProps<ValueExpression | undefined>) => (
        <div className="flex-[3] min-w-0">
          <ValueExpressionInput
            {...childInputField}
            isError={!!inputFieldState?.errors?.length}
            disabledTypes={disabledTypes}
            defaultInputType={enabledTypes[0]}
            inputTypes={enabledTypes}
            onChange={v => {
              const expression = v as ValueExpression;
              if (!expression) {
                // The default value needs to be accompanied by raw meta, otherwise it is impossible to distinguish whether it is visual understanding or not.
                childInputField?.onChange(DEFUALT_VISION_INPUT);
                return;
              }
              const newExpression: ValueExpression = {
                ...expression,
                rawMeta: {
                  ...(expression.rawMeta || {}),
                  isVision: true,
                },
              };
              childInputField?.onChange(newExpression);
            }}
          />
          <FormItemFeedback errors={inputFieldState?.errors} />
        </div>
      )}
    </Field>
  );
};
