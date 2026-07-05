import { nanoid } from 'nanoid';
import {
  type ViewVariableMeta,
  ViewVariableType,
} from '@coze-workflow/variable';

// Imported parameter path, practice running and other functions rely on this path to extract parameters
export const INPUT_PATH = 'inputs';

// Define fixed exported parameters
export const OUTPUTS: ViewVariableMeta[] = [
  {
    key: nanoid(),
    name: 'triggerId',
    type: ViewVariableType.String,
  },
];
