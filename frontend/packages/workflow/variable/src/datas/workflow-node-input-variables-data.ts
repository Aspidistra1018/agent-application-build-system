import { type FlowNodeEntity } from '@flowgram-adapter/free-layout-editor';
import { EntityData } from '@flowgram-adapter/free-layout-editor';
import {
  getFormValueByPathEnds,
  type RefExpressionContent,
  type InputValueVO,
  type WorkflowNodeRegistry,
} from '@coze-workflow/base';

import { type WorkflowVariable, WorkflowVariableFacadeService } from '../core';

interface InputVariable {
  name?: string;
  refVariable?: WorkflowVariable;
}

/**
 * Represents the data for ref variables of a flow node.
 */
export class WorkflowNodeInputVariablesData extends EntityData {
  static readonly type = 'WorkflowNodeInputVariablesData';

  declare entity: FlowNodeEntity;

  getDefaultData() {
    return {};
  }

  protected get facadeService() {
    return this.entity.getService(WorkflowVariableFacadeService);
  }

  /**
   * Get the entered form value
   */
  get inputParameters(): InputValueVO[] {
    const registry = this.entity.getNodeRegister() as WorkflowNodeRegistry;

    if (registry.getNodeInputParameters) {
      return registry.getNodeInputParameters(this.entity) || [];
    } else {
      return (
        getFormValueByPathEnds<InputValueVO[]>(
          this.entity,
          '/inputParameters',
        ) || []
      );
    }
  }

  /**
   * Get all input variables, including variable names and referenced variable instances
   */

  get inputVariables(): InputVariable[] {
    return this.inputParameters.map(_input => {
      const { name } = _input;

      const refVariable = this.facadeService.getVariableFacadeByKeyPath(
        (_input.input?.content as RefExpressionContent)?.keyPath,
        { node: this.entity, checkScope: true },
      );

      return {
        name,
        refVariable,
      };
    });
  }
}
