import { createMinimalBrowserClient } from '@coze-studio/slardar-adapter';
import { getSlardarEnv } from '@coze-common/chat-core';
import { Reporter } from '@coze-arch/logger';

import { ChatSdkError, SDKErrorCode } from '@/util/error';
import { eventMeta } from '@/util/env';

const slardarInstance = createMinimalBrowserClient();
slardarInstance.init({
  bid: 'bot_studio_sdk',
  /**
   * 与core上报到同一处 bid_env，打通数据
   */
  env: getSlardarEnv({
    env: 'thirdPart',
    deployVersion: 'release',
  }),
});
slardarInstance.start();

const eventPrefix = 'open_sdk_custom_event_';
const errorPrefix = 'open_sdk_custom_error_';

const enum OpenReportEvent {
  IframeLoaded = 'IframeLoaded',
  ClientInit = 'ClientInit',
}

class OpenReporter extends Reporter {
  openSdkEvent(eventName: OpenReportEvent, meta: Record<string, unknown>) {
    this.event({
      eventName: eventPrefix + eventName,
      meta: {
        ...(meta ?? {}),
        ...eventMeta,
      },
    });
  }

  openSdkError(error: Error | unknown, code = SDKErrorCode.Base) {
    if (!(error instanceof Error)) {
      this.errorEvent({
        eventName: errorPrefix + SDKErrorCode.NotError,
        error: ChatSdkError.create(SDKErrorCode.NotError),
        meta: {
          error,
        },
      });
      return;
    }

    this.errorEvent({
      eventName: errorPrefix + code,
      error,
      meta: eventMeta,
    });
  }
}

export const studioOpenClientReporter = new OpenReporter();

studioOpenClientReporter.init(slardarInstance);
