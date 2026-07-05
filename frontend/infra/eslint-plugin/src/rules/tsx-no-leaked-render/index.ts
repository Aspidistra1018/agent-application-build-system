import ruleComposer from 'eslint-rule-composer';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import reactPlugin from 'eslint-plugin-react';

const originRule = reactPlugin.rules['jsx-no-leaked-render'];

// Expand the react/jsx-no-leaked-render. If the left side of the "& &" expression is boolean, null, undefined TS type, no error will be reported.
export const tsxNoLeakedRender = ruleComposer.filterReports(
  originRule,
  problem => {
    const { parent } = problem.node;
    // If the expression is used for jsx properties, it does not need to be fixed. Such as < Comp prop = {{foo: 1} & & obj}/>
    if (
      parent?.type === AST_NODE_TYPES.JSXExpressionContainer &&
      parent?.parent?.type === AST_NODE_TYPES.JSXAttribute
    ) {
      return false;
    }

    return true;
  },
);
