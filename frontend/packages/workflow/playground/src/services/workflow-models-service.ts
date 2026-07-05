import { injectable, inject } from 'inversify';
import { WorkflowDocument } from '@flowgram-adapter/free-layout-editor';
import { getLLMModels } from '@coze-workflow/nodes';
import { PUBLIC_SPACE_ID } from '@coze-workflow/base';
import { type Model } from '@coze-arch/bot-api/developer_api';

import { WorkflowGlobalStateEntity } from '@/entities';
@injectable()
export class WorkflowModelsService {
  @inject(WorkflowGlobalStateEntity)
  readonly globalState: WorkflowGlobalStateEntity;
  @inject(WorkflowDocument)
  readonly document: WorkflowDocument;

  protected models: Model[] = [];
  async load() {
    // TODO: Temporary solution, the template space is virtual space, and the model list is not loaded in read-only mode to solve the permission problem
    if (
      this.globalState.readonly &&
      this.globalState.spaceId === PUBLIC_SPACE_ID
    ) {
      this.models = [];
      return;
    }
    this.models = await getLLMModels({
      info: this.globalState.info,
      spaceId: this.globalState.spaceId,
      document: this.document,
      isBindDouyin: this.globalState.isBindDouyin,
    });
  }

  getModels() {
    return this.models;
  }

  /**
   * Acquire all COT models
   * @Returns all COT models
   */
  getCoTModels() {
    return this.models.filter(model => model.model_ability?.cot_display);
  }

  /**
   * Determine whether it is a COT model
   * @param modelType
   * @returns
   */
  isCoTModel(modelType: number): boolean {
    return !!this.getCoTModels().find(model => model.model_type === modelType);
  }

  /**
   * Determine whether it is a FunctionCall model
   */
  isFunctionCallModel(modelType: number): boolean {
    return !!this.getModelAbility(modelType)?.function_call;
  }

  /**
   * Get the model by type
   * @param modelType
   * @returns
   */
  getModelByType(modelType?: number) {
    return this.models.find(model => model.model_type === modelType);
  }

  /**
   * Acquire model capabilities
   * @param modelType
   * @returns
   */
  getModelAbility(modelType?: number) {
    return this.getModelByType(modelType)?.model_ability;
  }
}
