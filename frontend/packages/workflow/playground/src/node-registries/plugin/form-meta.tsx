import { get } from 'lodash-es';
import {
  ValidateTrigger,
  type FormMetaV2,
  type FlowNodeEntity,
} from '@flowgram-adapter/free-layout-editor';
import { WorkflowNodeData } from '@coze-workflow/nodes';
import { type StandardNodeType } from '@coze-workflow/base';

import { createProvideNodeBatchVariables } from '@/nodes-v2/materials/provide-node-batch-variable';
import { nodeMetaValidate } from '@/nodes-v2/materials/node-meta-validate';
import { createNodeInputNameValidate } from '@/nodes-v2/components/node-input-name/validate';
import { createValueExpressionInputValidate } from '@/node-registries/common/validators';
import {
  fireNodeTitleChange,
  provideNodeOutputVariablesEffect,
} from '@/node-registries/common/effects';

import { type ApiNodeFormData } from './types';
import { FormRender } from './form';
import { transformOnInit, transformOnSubmit } from './data-transformer';
import { BATCH_INPUT_LIST_PATH, BATCH_MODE_PATH } from './constants';

export const PLUGIN_FORM_META: FormMetaV2<ApiNodeFormData> = {
  // Node form rendering
  render: props => <FormRender {...props} />,

  // verification trigger timing
  validateTrigger: ValidateTrigger.onChange,

  // validation rules
  validate: {
    nodeMeta: nodeMetaValidate,

    // Verify imported parameters
    'inputs.inputParameters.*': createValueExpressionInputValidate({
      // Whether it is required or not needs to be calculated according to the function to obtain the required value of the corresponding field
      required: ({ name, context }) => {
        const { node } = context;

        const apiDetail = (node as FlowNodeEntity)
          .getData<WorkflowNodeData>(WorkflowNodeData)
          .getNodeData<StandardNodeType.Api>();

        const fieldName = (name as string).replace(
          'inputs.inputParameters.',
          '',
        );

        const inputDef = apiDetail?.inputs?.find(v => v.name === fieldName);
        return Boolean(inputDef?.required);
      },
    }),

    // Verify the names of batch imported parameters
    'inputs.batch.inputLists.*.name': createNodeInputNameValidate({
      getNames: ({ formValues }) =>
        (get(formValues, 'batch.inputLists') || []).map(item => item.name),
      skipValidate: ({ formValues }) =>
        formValues?.inputs?.batchMode === 'single',
    }),

    // Validation of batch imported parameters
    'inputs.batch.inputLists.*.input': createValueExpressionInputValidate({
      required: true,
      skipValidate: ({ formValues }) =>
        formValues?.inputs?.batchMode === 'single',
    }),
  },

  // Side effect management
  effect: {
    nodeMeta: fireNodeTitleChange,

    [BATCH_MODE_PATH]: createProvideNodeBatchVariables(
      BATCH_MODE_PATH,
      BATCH_INPUT_LIST_PATH,
    ),

    [BATCH_INPUT_LIST_PATH]: createProvideNodeBatchVariables(
      BATCH_MODE_PATH,
      BATCH_INPUT_LIST_PATH,
    ),

    outputs: provideNodeOutputVariablesEffect,
  },

  // Node Backend Data - > Frontend Form Data
  formatOnInit: transformOnInit,

  // Front-end form data - > node back-end data
  formatOnSubmit: transformOnSubmit,
};
