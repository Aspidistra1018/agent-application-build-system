import { ContainerModule } from 'inversify';
import {
  WorkflowJSONFormatContribution,
  WorkflowDocument,
} from '@flowgram-adapter/free-layout-editor';
import { bindContributions } from '@flowgram-adapter/common';

import { WorkflowJSONFormat } from './workflow-json-format';
import { WorkflowDocumentWithFormat } from './workflow-document-with-format';
import { WorkflowNodesService } from './service';

export const WorkflowNodesContainerModule = new ContainerModule(
  (bind, unbind, isBound, rebind) => {
    bind(WorkflowNodesService).toSelf().inSingletonScope();
    bindContributions(bind, WorkflowJSONFormat, [
      WorkflowJSONFormatContribution,
    ]);
    // Compatible with old canvas documents
    bind(WorkflowDocumentWithFormat).toSelf().inSingletonScope();
    rebind(WorkflowDocument).toService(WorkflowDocumentWithFormat);
  },
);
