import { get, set } from 'lodash-es';
import { type NodeFormContext } from '@flowgram-adapter/free-layout-editor';
import { VariableTypeDTO } from '@coze-workflow/base';

import { type FormData, type NodeDataDTO, TerminatePlan } from './types';

/**
 * Node Backend Data - > Frontend Form Data
 */
export const transformOnInit = (
  value: NodeDataDTO,
  { playgroundContext }: NodeFormContext,
) => {
  const { isChatflow } = playgroundContext.globalState;

  const finalValue = {
    ...value,
    inputs: {
      ...value?.inputs,
      content: get(value, 'inputs.content.value.content') as string | undefined,
    },
  };
  // Set the initial value of each field
  if (typeof finalValue.inputs.inputParameters === 'undefined') {
    set(finalValue, 'inputs.inputParameters', [{ name: 'output' }]);
  }
  if (typeof finalValue.inputs.streamingOutput === 'undefined') {
    set(finalValue, 'inputs.streamingOutput', isChatflow);
  }
  if (typeof finalValue.inputs.terminatePlan === 'undefined') {
    set(
      finalValue,
      'inputs.terminatePlan',
      isChatflow
        ? TerminatePlan.UseAnswerContent
        : TerminatePlan.ReturnVariables,
    );
  }
  return finalValue;
};

/**
 * Front-end form data - > node back-end data
 * @param value
 * @returns
 */
export const transformOnSubmit = (value: FormData) => {
  const nodeMeta = get(value, 'nodeMeta');
  const { terminatePlan, inputParameters, streamingOutput, content } =
    value.inputs ?? {};
  if (terminatePlan === TerminatePlan.ReturnVariables) {
    return {
      nodeMeta,
      inputs: {
        terminatePlan,
        inputParameters,
      },
    };
  }
  return {
    nodeMeta,
    inputs: {
      terminatePlan,
      streamingOutput,
      inputParameters,
      content: {
        type: VariableTypeDTO.string,
        value: {
          type: 'literal',
          content,
        },
      },
    },
  };
};
