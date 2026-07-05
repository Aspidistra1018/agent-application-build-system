/* eslint-disable @typescript-eslint/naming-convention */
import {
  ValidateTrigger,
  type FormMetaV2,
} from '@flowgram-adapter/free-layout-editor';

import { TriggerService } from '@/services';
import { nodeMetaValidate } from '@/nodes-v2/materials/node-meta-validate';
import { createValueExpressionInputValidate } from '@/node-registries/common/validators';
import {
  fireNodeTitleChange,
  provideNodeOutputVariablesEffect,
} from '@/node-registries/common/effects';

import { undefinedChecker } from './utils';
import { type NodeDataVO } from './types';
import { FormRender } from './form';
import { transformOnInit, transformOnSubmit } from './data-transformer';
import { OUTPUTS } from './constants';

export const TRIGGER_UPSERT_FORM_META: FormMetaV2<Partial<NodeDataVO>> = {
  // Node form rendering
  render: () => <FormRender />,

  defaultValues: context => {
    const triggerService =
      context.node.getService<TriggerService>(TriggerService);
    const { triggerNodeDefaultFormValue } =
      triggerService.getTriggerDynamicFormMeta();

    return {
      inputs: {
        fixedInputs: {},
        dynamicInputs: triggerNodeDefaultFormValue,
        payload: {},
      },
      outputs: OUTPUTS,
    };
  },
  // verification trigger timing
  validateTrigger: ValidateTrigger.onChange,

  // validation rules
  validate: {
    nodeMeta: nodeMetaValidate,
    'inputs.fixedInputs.userId': createValueExpressionInputValidate({
      required: true,
    }),
    'inputs.fixedInputs.triggerName': createValueExpressionInputValidate({
      required: true,
    }),
    'inputs.bindWorkflowId': ({ value }) => undefinedChecker(value),
    // Required
    'inputs.dynamicInputs.timeZone': createValueExpressionInputValidate({
      required: true,
    }),
    'inputs.dynamicInputs.crontab': props =>
      createValueExpressionInputValidate({
        required: true,
      })({
        ...props,
        value: props.value?.content,
      }),

    'inputs.payload.*': ({ value, formValues, context, name }) => {
      const bindWorkflowId = formValues?.inputs?.bindWorkflowId;
      if (!bindWorkflowId) {
        return undefined;
      }
      const triggerService =
        context.node.getService<TriggerService>(TriggerService);
      const bindWorkflowInfo =
        triggerService.getBindWorkflowInfo(bindWorkflowId);
      const required = (
        bindWorkflowInfo?.inputs as { name: string; required: boolean }[]
      )?.find(d => d.name === name?.replace('inputs.payload.', ''))?.required;
      if (required) {
        return undefinedChecker(value);
      }
    },
  },

  // Side effect management
  effect: {
    nodeMeta: fireNodeTitleChange,
    outputs: provideNodeOutputVariablesEffect,
  },

  // Node Backend Data - > Frontend Form Data
  formatOnInit: transformOnInit,

  // Front-end form data - > node back-end data
  formatOnSubmit: transformOnSubmit,
};
