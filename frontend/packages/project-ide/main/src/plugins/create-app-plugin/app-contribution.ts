/**
 * Project ide app life cycle
 */
import { injectable, inject } from 'inversify';
import {
  type LifecycleContribution,
  LayoutRestorer,
  Emitter,
} from '@coze-project-ide/framework';

import { WidgetEventService } from './widget-event-service';
import { ProjectInfoService } from './project-info-service';
import { OpenURIResourceService } from './open-url-resource-service';

@injectable()
export class AppContribution implements LifecycleContribution {
  @inject(OpenURIResourceService)
  private openURIResourceService: OpenURIResourceService;

  @inject(WidgetEventService)
  private widgetEventService: WidgetEventService;

  @inject(LayoutRestorer)
  private layoutRestorer: LayoutRestorer;

  @inject(ProjectInfoService)
  private projectInfoService: ProjectInfoService;

  onStartedEmitter = new Emitter<void>();
  onStarted = this.onStartedEmitter.event;

  // When IDE initialization is complete and business logic can be executed
  onStart() {
    // Update project information
    this.projectInfoService.init();

    // Open the resources carried on the URL
    this.openURIResourceService.open();
    this.openURIResourceService.listen();
    // Subscribe to change events
    this.widgetEventService.listen();
    // listen layout store
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.layoutRestorer.listen();
    this.onStartedEmitter.fire();
  }

  onDispose() {
    // Destroy all subscriptions
    this.widgetEventService.dispose();
    this.openURIResourceService.dispose();
    this.onStartedEmitter.dispose();
  }
}
