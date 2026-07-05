import { inject, injectable } from 'inversify';
import {
  WorkflowCommands,
  WorkflowDocument,
  WorkflowLineEntity,
  WorkflowNodeEntity,
  type WorkflowNodeMeta,
  WorkflowSelectService,
} from '@flowgram-adapter/free-layout-editor';
import type {
  WorkflowShortcutsContribution,
  WorkflowShortcutsRegistry,
} from '@coze-workflow/render';

import { WorkflowGlobalStateEntity } from '@/typing';

import { safeFn } from '../../utils';
import { isValid } from './is-valid';

/**
 * Remove shortcuts
 */
@injectable()
export class WorkflowDeleteShortcutsContribution
  implements WorkflowShortcutsContribution
{
  @inject(WorkflowDocument) private document: WorkflowDocument;
  @inject(WorkflowSelectService) private selection: WorkflowSelectService;
  @inject(WorkflowGlobalStateEntity)
  private globalState: WorkflowGlobalStateEntity;
  /** Registration shortcut */
  public registerShortcuts(registry: WorkflowShortcutsRegistry): void {
    registry.addHandlers({
      commandId: WorkflowCommands.DELETE_NODES,
      shortcuts: ['backspace', 'delete'],
      isEnabled: () => !this.globalState.readonly,
      execute: safeFn(this.handle.bind(this)),
    });
  }
  private handle(): void {
    if (!isValid(this.selectedNodes)) {
      return;
    }
    // Delete the selected entity
    this.selection.selection.forEach(entity => {
      if (entity instanceof WorkflowNodeEntity) {
        this.removeNode(entity);
      } else if (entity instanceof WorkflowLineEntity) {
        this.removeLine(entity);
      } else {
        entity.dispose();
      }
    });
    // Filter out deleted entities
    this.selection.selection = this.selection.selection.filter(
      s => !s.disposed,
    );
  }
  /** Get the selected node */
  private get selectedNodes(): WorkflowNodeEntity[] {
    return this.selection.selection.filter(
      n => n instanceof WorkflowNodeEntity,
    ) as WorkflowNodeEntity[];
  }
  /** Delete Node */
  private removeNode(node: WorkflowNodeEntity): void {
    if (!this.document.canRemove(node)) {
      return;
    }
    const nodeMeta = node.getNodeMeta<WorkflowNodeMeta>();
    const subCanvas = nodeMeta.subCanvas?.(node);
    if (subCanvas?.isCanvas) {
      subCanvas.parentNode.dispose();
      return;
    }
    node.dispose();
  }
  /** Delete Connection */
  private removeLine(line: WorkflowLineEntity): void {
    if (!this.document.linesManager.canRemove(line)) {
      return;
    }
    line.dispose();
  }
}
