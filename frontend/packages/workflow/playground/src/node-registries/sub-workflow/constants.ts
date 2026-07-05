import { nanoid } from 'nanoid';
import { ViewVariableType } from '@coze-workflow/variable';
import { I18n } from '@coze-arch/i18n';

// Imported parameter path, practice running and other functions rely on this path to extract parameters
export const INPUT_PATH = 'inputs.inputParameters';
export const BATCH_MODE_PATH = 'inputs.batchMode';
export const BATCH_INPUT_LIST_PATH = 'inputs.batch.inputLists';

// Define fixed exported parameters
export const OUTPUTS = [
  {
    key: nanoid(),
    name: 'outputList',
    type: ViewVariableType.ArrayObject,
    children: [
      {
        key: nanoid(),
        name: 'id',
        type: ViewVariableType.String,
      },
      {
        key: nanoid(),
        name: 'content',
        type: ViewVariableType.String,
      },
    ],
  },
];

export const COLUMNS = [
  {
    label: I18n.t('workflow_detail_node_parameter_name'),
    style: { width: 148 },
  },
  { label: I18n.t('workflow_detail_end_output_value') },
];
