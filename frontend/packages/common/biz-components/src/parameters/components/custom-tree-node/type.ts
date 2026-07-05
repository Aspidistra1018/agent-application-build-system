import { type TreeNodeData } from '@coze-arch/bot-semi/Tree';

import { type RecursedParamDefinition } from '../../types';
import { type ChangeMode } from './constants';

export type TreeNodeCustomData = TreeNodeData &
  Pick<
    RecursedParamDefinition,
    | 'name'
    | 'type'
    | 'isQuote'
    | 'fixedValue'
    | 'quotedValue'
    | 'fieldRandomKey'
  > & {
    // row unique value
    key: string;
    // Formed fields
    field?: string;
    // Is it the first item?
    isFirst?: boolean;
    // Is it the last item?
    isLast?: boolean;
    // Is there only one item of data?
    isSingle?: boolean;
    // The nesting level of the item, starting at 0
    level?: number;
    // Fields displayed by the auxiliary line
    helpLineShow?: Array<boolean>;
    children?: Array<TreeNodeCustomData>;
    // Variable descriptions, used as hidden bootstraps
    description?: string;
  };

export interface CustomTreeNodeFuncRef {
  data: TreeNodeCustomData;
  level: number;
  readonly: boolean;
  // General change method
  onChange: (mode: ChangeMode, param: TreeNodeCustomData) => void;
  // Customized type change method, mainly used for custom rendering
  // Add child item
  onAppend: () => void;
  // Delete this item
  onDelete: () => void;
  // Delete all children under this item
  onDeleteChildren: () => void;
  // The internal call method when the type changes, mainly used to delete all children when converting from the class Object type to other types
  onSelectChange: (
    val?: string | number | Array<unknown> | Record<string, unknown>,
  ) => void;
}

export interface ActiveMultiInfo {
  // Whether the current line is in a multi-line state, and the vertical line in the multi-line state needs to be extended
  activeMultiKey: string;
  // Is there an error message for the current row paramName data?
  withNameError?: boolean;
}
