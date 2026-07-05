import {
  type ObjectRefExpression,
  type InputValueVO,
  ValueExpressionType,
} from '@coze-workflow/base';

interface InputObjectRefVO extends InputValueVO {
  input: ObjectRefExpression;
}

/**
 * Is there a variable reference?
 * @param vos
 * @returns
 */
function hasRef(vos?: InputValueVO[]): boolean {
  if (!vos?.length) {
    return false;
  }

  return vos.some(
    vo => vo.input?.type === ValueExpressionType.REF || hasRef(vo.children),
  );
}

/**
 * Is it a static object ref?
 * Inside are the constants used
 */
export function isStaticObjectRef(value: InputObjectRefVO): boolean {
  const input = value?.input;

  if (input?.type !== ValueExpressionType.OBJECT_REF) {
    return false;
  }

  return !hasRef(value.children);
}
