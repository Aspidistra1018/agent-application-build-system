import {
  ASTFactory,
  type ASTNodeJSON,
  type BaseVariableField,
} from '@flowgram-adapter/free-layout-editor';

import {
  CustomKeyPathExpression,
  type RefExpressionJSON,
} from './custom-key-path-expression';

/**
 * Traverse the expression, traverse the list, and get the traversed variable type
 */
export class WrapArrayExpression extends CustomKeyPathExpression {
  static kind = 'WrapArrayExpression';

  getReturnTypeJSONByRef(
    _ref: BaseVariableField | undefined,
  ): ASTNodeJSON | undefined {
    return ASTFactory.createArray({
      items: _ref?.type?.toJSON(),
    });
  }

  toJSON() {
    return {
      kind: this.kind,
      keyPath: this._keyPath,
      rawMeta: this._rawMeta,
    };
  }
}

export const createWrapArrayExpression = ({
  keyPath,
  rawMeta,
}: RefExpressionJSON) => ({
  kind: WrapArrayExpression.kind,
  keyPath,
  rawMeta,
});
