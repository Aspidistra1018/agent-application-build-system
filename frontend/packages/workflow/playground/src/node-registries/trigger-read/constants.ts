import { nanoid } from 'nanoid';
import { ViewVariableType } from '@coze-workflow/variable';

// Imported parameter path, practice running and other functions rely on this path to extract parameters
export const INPUT_PATH = 'inputs.inputParameters';

// Define fixed exported parameters
export const OUTPUTS = [
  {
    key: nanoid(),
    name: 'outputList',
    type: ViewVariableType.ArrayObject,
    children: [
      {
        key: nanoid(),
        name: 'triggerId',
        type: ViewVariableType.String,
      },
      {
        key: nanoid(),
        name: 'triggerName',
        type: ViewVariableType.String,
      },
      {
        key: nanoid(),
        name: 'createTime',
        type: ViewVariableType.String,
      },
      {
        key: nanoid(),
        name: 'triggerTime',
        type: ViewVariableType.String,
      },
      {
        key: nanoid(),
        name: 'userId',
        type: ViewVariableType.String,
      },
    ],
  },
];
