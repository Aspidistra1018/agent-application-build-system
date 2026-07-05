/* eslint-disable @typescript-eslint/naming-convention */
import { inject, injectable } from 'inversify';
import { PlaygroundConfigEntity } from '@flowgram-adapter/free-layout-editor';
import { WorkflowCommands } from '@flowgram-adapter/free-layout-editor';
import { HistoryService } from '@flowgram-adapter/common';
import {
  type WorkflowShortcutsContribution,
  type WorkflowShortcutsRegistry,
} from '@coze-workflow/render';
import { reporter } from '@coze-workflow/base';

import { WorkflowHistoryConfig } from './workflow-history-config';

/**
 * History shortcut
 */
@injectable()
export class WorkflowHistoryShortcutsContribution
  implements WorkflowShortcutsContribution
{
  @inject(HistoryService)
  private _historyService: HistoryService;
  @inject(WorkflowHistoryConfig)
  private _config: WorkflowHistoryConfig;
  @inject(PlaygroundConfigEntity)
  private _playgroundConfig: PlaygroundConfigEntity;

  registerShortcuts(registry: WorkflowShortcutsRegistry): void {
    registry.addHandlers(
      /**
       * revoke
       */
      {
        commandId: WorkflowCommands.UNDO,
        shortcuts: ['meta z', 'ctrl z'],
        isEnabled: () => !this._playgroundConfig.readonly,
        execute: () => {
          if (this._config.disabled) {
            return;
          }
          this._historyService.undo();
          reporter.info({
            message: 'workflow_undo',
          });
        },
      },
      /**
       * redo
       */
      {
        commandId: WorkflowCommands.REDO,
        shortcuts: ['meta shift z', 'ctrl shift z'],
        isEnabled: () => !this._playgroundConfig.readonly,
        execute: () => {
          if (this._config.disabled) {
            return;
          }
          this._historyService.redo();
          reporter.info({
            message: 'workflow_redo',
          });
        },
      },
    );
  }
}
