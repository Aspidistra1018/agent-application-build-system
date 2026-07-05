import { get } from 'lodash-es';
import {
  type Effect,
  FlowNodeFormData,
  type FormModelV2,
} from '@flowgram-adapter/free-layout-editor';

import { formatOutput } from '../utils';

export const syncQuestionOutputsEffect: Effect = props => {
  const { value, formValues, context } = props;
  const { node } = context;

  const formModel = node.getData(FlowNodeFormData).getFormModel<FormModelV2>();
  const outputs = get(formValues, 'outputs');

  // Synchronize the value of questionOutputs to outputs
  if (outputs) {
    formModel.setValueIn('outputs', formatOutput(value));
  }
};
