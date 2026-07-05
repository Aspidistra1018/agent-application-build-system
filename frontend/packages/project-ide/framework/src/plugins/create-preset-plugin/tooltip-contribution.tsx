import React from 'react';

import { inject, injectable, postConstruct } from 'inversify';
import {
  type URI,
  type LabelHandler,
  HoverService,
} from '@coze-project-ide/client';
import { Tooltip } from '@coze-arch/coze-design';

// Custom IDE HoverService style
@injectable()
class TooltipContribution implements LabelHandler {
  @inject(HoverService) hoverService: HoverService;

  visible = false;

  @postConstruct()
  init() {
    this.hoverService.enableCustomHoverHost();
  }

  canHandle(uri: URI): number {
    return 500;
  }

  renderer(uri: URI, opt?: any): React.ReactNode {
    // The reason for the opacity and width settings below:
    // Semi source code location: https://github.com/DouyinFE/semi-design/blob/main/packages/semi-foundation/tooltip/foundation.ts#L342
    // Semi has a trigger element to judge, and this custom semi component does not have a focus internal element.
    return opt?.content ? (
      <Tooltip
        key={opt.content}
        content={opt.content}
        position={opt.position}
        // Override settings to reset foundation opacity to avoid tooltip jumping
        style={{ opacity: 1 }}
        trigger="custom"
        getPopupContainer={() => document.body}
        visible={true}
      >
        {/* Width 0 to avoid Tooltip positioning errors due to global style influence */}
        <div style={{ width: 0 }}></div>
      </Tooltip>
    ) : null;
  }

  onDispose() {
    return;
  }
}

export { TooltipContribution };
