/**
 * TestSet List Page Size
 */
export const TESTSET_PAGE_SIZE = 10;

/** Test set connector ID is a fixed string */
export const TESTSET_CONNECTOR_ID = '10000';

export enum FormItemSchemaType {
  STRING = 'string',
  BOT = 'bot',
  CHAT = 'chat',
  NUMBER = 'number',
  OBJECT = 'object',
  BOOLEAN = 'boolean',
  INTEGER = 'integer',
  FLOAT = 'float',
  LIST = 'list',
  TIME = 'time',
}

export enum TestsetFormValuesForBoolSelect {
  TRUE = 'true',
  FALSE = 'false',
  UNDEFINED = 'undefined',
}

/** Boolean Type Options */
export const TESTSET_FORM_BOOLEAN_SELECT_OPTIONS = [
  {
    value: TestsetFormValuesForBoolSelect.TRUE,
    label: 'true',
  },
  {
    value: TestsetFormValuesForBoolSelect.FALSE,
    label: 'false',
  },
];

/** bot testset key */
export const TESTSET_BOT_NAME = '_WORKFLOW_VARIABLE_NODE_BOT_ID';
