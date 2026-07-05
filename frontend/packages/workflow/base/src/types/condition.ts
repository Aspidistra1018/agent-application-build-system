export enum ConditionLogic {
  OR = 1,
  AND = 2,
}

export enum ConditionLogicDTO {
  OR = 'OR',
  AND = 'AND',
}

export type ConditionOperator =
  | 'EQUAL' // "="
  | 'NOT_EQUAL' // "< >" or "! ="
  | 'GREATER_THAN' // ">"
  | 'LESS_THAN' // "<"
  | 'GREATER_EQUAL' // ">="
  | 'LESS_EQUAL' // "<="
  | 'IN' // "IN"
  | 'NOT_IN' // "NOT IN"
  | 'IS_NULL' // "IS NULL"
  | 'IS_NOT_NULL' // "IS NOT NULL"
  | 'LIKE' // "LIKE" fuzzy match string
  | 'NOT_LIKE' // "NOT LIKE" inverse fuzzy match
  | 'BE_TRUE' // "BE TRUE" is true
  | 'BE_FALSE'; // "BE FALSE" Boolean value false
