import omit from 'lodash-es/omit';
import {
  type InputValueVO,
  type ViewVariableTreeNode,
  type NodeDataDTO,
} from '@coze-workflow/base';

const isEmptyArrayOrNil = (value: unknown) =>
  // eslint-disable-next-line eqeqeq
  (Array.isArray(value) && value.length === 0) || value == null;
/**
 * Node Backend Data - > Frontend Form Data
 */
export const createTransformOnInit =
  (
    defaultInputValue: InputValueVO[] = [],
    defaultOutputValue: ViewVariableTreeNode[] = [],
  ) =>
  (value: NodeDataDTO) => {
    const { inputs, outputs } = value || {};
    const inputParameters = inputs?.inputParameters || [];

    // Since variables that are not filled in will be filtered out during commit, the default value needs to be added during initialization
    // See also: packages/workflow/nodes/src/workflow-json-format: 241
    const refillInputParamters = defaultInputValue.map(cur => {
      const { name } = cur;
      const target = inputParameters.find(item => item.name === name);
      if (target) {
        return target;
      }
      return cur;
    }, []);

    const initValue = {
      ...omit(value, ['inputs']),
      inputParameters: refillInputParamters,
      outputs: isEmptyArrayOrNil(outputs) ? defaultOutputValue : outputs,
    };

    return initValue;
  };
