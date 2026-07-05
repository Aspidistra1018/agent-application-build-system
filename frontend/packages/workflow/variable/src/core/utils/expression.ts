import { intersection } from 'lodash-es';
import {
  type ASTNode,
  type BaseVariableField,
  type BaseExpression,
  ASTNodeFlags,
} from '@flowgram-adapter/free-layout-editor';

// Get all child AST nodes
export function getAllChildren(ast: ASTNode): ASTNode[] {
  return [
    ...ast.children,
    ...ast.children.map(_child => getAllChildren(_child)).flat(),
  ];
}

// Get Parent Fields
export function getParentFields(ast: ASTNode): BaseVariableField[] {
  let curr = ast.parent;
  const res: BaseVariableField[] = [];

  while (curr) {
    if (curr.flags & ASTNodeFlags.VariableField) {
      res.push(curr as BaseVariableField);
    }
    curr = curr.parent;
  }

  return res;
}

// Get all variables referenced by the child AST
export function getAllRefs(ast: ASTNode): BaseVariableField[] {
  return getAllChildren(ast)
    .filter(_child => _child.flags & ASTNodeFlags.Expression)
    .map(_child => (_child as BaseExpression).refs)
    .flat()
    .filter(Boolean) as BaseVariableField[];
}

/**
 * Check if it is a ring.
 * @param curr current expression
 * Variable node referenced by @param refNode
 * @Returns is a loop
 */
export function checkRefCycle(
  curr: BaseExpression,
  refNodes: (BaseVariableField | undefined)[],
): boolean {
  // If the scope is not cyclic, it cannot be cyclic
  if (
    intersection(
      curr.scope.coverScopes,
      refNodes.map(_ref => _ref?.scope).filter(Boolean),
    ).length === 0
  ) {
    return false;
  }

  // BFS Traversal
  const visited = new Set<BaseVariableField>();
  const queue = [...refNodes];

  while (queue.length) {
    const currNode = queue.shift();
    if (!currNode) {
      continue;
    }
    visited.add(currNode);

    for (const ref of getAllRefs(currNode).filter(_ref => !visited.has(_ref))) {
      queue.push(ref);
    }
  }

  // If the referenced variable contains the parent variable of the expression, it forms a ring
  return intersection(Array.from(visited), getParentFields(curr)).length > 0;
}
