import { TestFormFieldName } from '@coze-workflow/test-run-next';

export const getTestsetField = () => ({
  [TestFormFieldName.TestsetSelect]: {
    // Sort by top
    ['x-index']: 0,
    ['x-component']: 'TestsetSelect',
  },
  [TestFormFieldName.TestsetSave]: {
    ['x-component']: 'TestsetSave',
  },
});
