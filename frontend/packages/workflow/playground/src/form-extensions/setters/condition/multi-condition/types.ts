import {
  type RefExpression,
  type ValueExpression,
} from '@coze-workflow/base/types';
import { type ConditionType } from '@coze-workflow/base/api';

import { Logic } from './constants';

export interface ConditionItem {
  /**
   * Expression left data
   *  */
  left?: RefExpression;
  /**
   * Expression Operators
   */
  operator?: ConditionType;
  /**
   * Expression right data
   */

  right?: ValueExpression;
}

export { Logic };

export interface ConditionBranchValue {
  condition: {
    // And or or operations, corresponding to the logic of the backend data
    logic: Logic;
    conditions: ConditionItem[];
  };
}

export interface ConditionBranchValueWithUid extends ConditionBranchValue {
  uid: number;
}

export type ConditionValue = Array<ConditionBranchValue>;
export type ConditionValueWithUid = Array<ConditionBranchValueWithUid>;

export type ElementOfRecord<T> = T[keyof T];
