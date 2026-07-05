import { type FlowNodeEntity } from '@flowgram-adapter/free-layout-editor';
import {
  type ValueExpression,
  type ValueExpressionDTO,
  type RefExpression,
} from '@coze-workflow/variable';

export abstract class ValueExpressionService {
  /**
   * Determine whether a value is a value expression
   * @param value
   * @Returns is a value expression
   */
  abstract isValueExpression(value: unknown): boolean;

  /**
   * Determine whether a value is a value expression DTO
   * @param value
   * @Returns is a value expression DTO
   */
  abstract isValueExpressionDTO(value: unknown): boolean;

  /**
   * Determine whether the value is a reference expression
   * @param value
   * @Returns is a reference expression
   */
  abstract isRefExpression(value: unknown): boolean;

  /**
   * Determine whether the value is a literal expression
   * @param value
   * @Returns is a literal expression
   */
  abstract isLiteralExpression(value: RefExpression): boolean;

  /**
   * Determine whether a reference expression variable exists
   * @param value reference expression
   * @param node Current node
   * Does @returns exist
   */
  abstract isRefExpressionVariableExists(
    value: RefExpression,
    node: FlowNodeEntity,
  ): boolean;

  /**
   * Convert value expressions to DTO
   * @param valueExpression
   * @param currentNode
   * @Returns value expression DTO
   */
  abstract toDTO(
    valueExpression?: ValueExpression,
    currentNode?: FlowNodeEntity,
  ): ValueExpressionDTO | undefined;

  /**
   * Converting a value expression DTO to a value expression
   * @param dto value expression DTO
   * @Returns value expression
   */
  abstract toVO(dto?: ValueExpressionDTO): ValueExpression | undefined;
}
