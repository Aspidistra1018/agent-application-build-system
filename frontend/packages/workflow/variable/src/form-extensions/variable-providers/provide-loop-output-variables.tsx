import { type VariableProviderAbilityOptions } from '@flowgram-adapter/free-layout-editor';
import { ASTFactory } from '@flowgram-adapter/free-layout-editor';

import { createWrapArrayExpression } from '../../core/extend-ast/wrap-array-expression';
import { type InputItem, uniqInputs } from './common';

export const parseLoopOutputsByViewVariableMeta = (
  nodeId: string,
  value: InputItem[],
) => {
  const properties = uniqInputs(value || []).map(_input => {
    const keyPath = _input?.input?.content?.keyPath;
    // If you choose a variable in the Variable of the Loop
    if (keyPath?.[0] === nodeId) {
      return ASTFactory.createProperty({
        key: _input?.name,
        // Direct reference to variables
        initializer: ASTFactory.createKeyPathExpression({
          keyPath: _input?.input?.content?.keyPath || [],
        }),
      });
    }

    return ASTFactory.createProperty({
      key: _input?.name,
      // Output Type Packet Layer Array
      initializer: createWrapArrayExpression({
        keyPath: _input?.input?.content?.keyPath || [],
      }),
    });
  });

  return [
    ASTFactory.createVariableDeclaration({
      key: `${nodeId}.outputs`,
      type: ASTFactory.createObject({
        properties,
      }),
    }),
  ];
};

/**
 * loop output variable synchronization
 */
export const provideLoopOutputsVariables: VariableProviderAbilityOptions = {
  key: 'provide-loop-output-variables',
  namespace: '/node/outputs',
  private: false,
  scope: 'public',
  parse(value, context) {
    return parseLoopOutputsByViewVariableMeta(context.node.id, value);
  },
};
