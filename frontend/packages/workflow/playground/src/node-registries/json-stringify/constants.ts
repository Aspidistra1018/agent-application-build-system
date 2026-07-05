import { nanoid } from 'nanoid';
import { ViewVariableType } from '@coze-workflow/variable';

// Imported parameter path, practice running and other functions rely on this path to extract parameters
export const INPUT_PATH = 'inputs.inputParameters';

// Define fixed exported parameters
export const OUTPUTS = [
  {
    key: nanoid(),
    name: 'output',
    type: ViewVariableType.String,
  },
];

export const DEFAULT_INPUTS = [{ name: 'input' }];
