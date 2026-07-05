import { set } from 'lodash-es';
import {
  type FormMetaV2,
  ValidateTrigger,
} from '@flowgram-adapter/free-layout-editor';
import {
  variableUtils,
  provideMergeGroupVariablesEffect,
} from '@coze-workflow/variable';

import { nodeMetaValidate } from '../materials/node-meta-validate';
import { variablesValidator } from './validators/variables-validator';
import { variableValidator } from './validators/variable-validator';
import { mergeGroupsValidator } from './validators/merge-groups-validator';
import { groupNameValidator } from './validators/group-name-validator';
import { variablesChangeEffects } from './effects/variables-change-effects';
import { VariableMergeForm } from './components/variable-merge-form';

export const VARIABLE_MERGE_FORM_META: FormMetaV2<FormData> = {
  effect: {
    'inputs.mergeGroups': provideMergeGroupVariablesEffect,
    'inputs.mergeGroups.*.variables': variablesChangeEffects,
  },
  render: props => <VariableMergeForm {...props} />,
  // validation
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    nodeMeta: nodeMetaValidate,
    'inputs.mergeGroups.*.name': groupNameValidator,
    'inputs.mergeGroups.*.variables.*': variableValidator,
    'inputs.mergeGroups.*.variables': variablesValidator,
    'inputs.mergeGroups': mergeGroupsValidator,
  },
  formatOnInit(value, context) {
    const { playgroundContext } = context;
    const { variableService } = playgroundContext;

    // initial value setting
    // Failure to set the initial value here will not trigger the form's onValueInit time
    const initValue = value || {
      inputs: {
        mergeGroups: [
          {
            name: 'Group1',
            variables: [],
          },
        ],
      },
      outputs: [],
    };

    if (initValue?.inputs?.mergeGroups) {
      initValue.inputs.mergeGroups.forEach(_mergeGroup => {
        if (_mergeGroup?.variables) {
          set(
            _mergeGroup,
            'variables',
            _mergeGroup.variables.map(_expr =>
              variableUtils.valueExpressionToVO(_expr, variableService),
            ),
          );
        }
      });
    }

    return initValue;
  },
  formatOnSubmit(value, context) {
    const { node, playgroundContext } = context;
    const { variableService } = playgroundContext;

    if (value?.inputs?.mergeGroups) {
      value.inputs.mergeGroups.forEach(_mergeGroup => {
        if (_mergeGroup?.variables) {
          set(
            _mergeGroup,
            'variables',
            _mergeGroup.variables.map(_expr =>
              variableUtils.valueExpressionToDTO(_expr, variableService, {
                node,
              }),
            ),
          );
        }
      });
    }
    return value;
  },
};
