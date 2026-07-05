import { nanoid } from 'nanoid';
import { ViewVariableType } from '@coze-workflow/variable';

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

/** scenario workflow role information keyword */
export const ROLE_INFORMATION_KEYWORD = 'role_information';

export const DEFAULT_ROLE_NAME = 'role';
export const DEFAULT_NICKNAME_NAME = 'nickname';
export const DEFAULT_PLAYER_DESCRIPTION_NAME = 'player_description';
