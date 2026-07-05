import { nanoid } from '@flowgram-adapter/free-layout-editor';
import { ViewVariableType } from '@coze-workflow/variable';

// Define fixed exported parameters
export const OUTPUTS = [
  {
    key: nanoid(),
    name: 'input',
    type: ViewVariableType.String,
    required: true,
  },
];
