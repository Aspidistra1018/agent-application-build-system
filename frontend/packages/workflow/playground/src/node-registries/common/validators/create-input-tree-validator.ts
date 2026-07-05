import { type Validate } from '@flowgram-adapter/free-layout-editor';
import { inputTreeValidator } from '@coze-workflow/nodes';

/**
 * tree input validator
 * @param param0
 * @returns
 */
export const createInputTreeValidator: () => Validate =
  () =>
  ({ value, context }) => {
    const res = inputTreeValidator({
      value,
      context,
      options: {},
    });

    if (res === true) {
      return;
    }

    return res;
  };
