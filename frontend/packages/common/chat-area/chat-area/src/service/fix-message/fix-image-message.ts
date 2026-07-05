import { cloneDeep } from 'lodash-es';
import { type ContentType, type MessageContent } from '@coze-common/chat-core';
import { type Reporter } from '@coze-arch/logger';

import { getIsImageMessage } from '../../utils/message';
import { type Message } from '../../store/types';
import { ReportErrorEventNames } from '../../report-events/report-event-names';

// There are problems with downstream dependencies, and it is not easy to modify this time, so cooperate with the server level to smooth the structure at the front end
export const fixImageMessage = (message: Message, reporter: Reporter) => {
  if (!getIsImageMessage(message)) {
    return message;
  }

  const fixedMessage = cloneDeep(message);

  // Although I don't understand why this abnormal data is generated online, I still handle it with the bottom line.
  if (!fixedMessage.content_obj) {
    fixedMessage.content_obj = {
      image_list: [
        {
          key: '',
          image_ori: { url: '', width: 0, height: 0 },
          image_thumb: { url: '', width: 0, height: 0 },
        },
      ],
    };
  }

  if (!('image_list' in fixedMessage.content_obj)) {
    fixedMessage.content_obj = {
      image_list:
        fixedMessage.content_obj as MessageContent<ContentType.Image>['image_list'],
    };
  }

  if (fixedMessage.content_obj.image_list?.length) {
    fixedMessage.content_obj.image_list?.forEach(img => {
      if (!img.image_ori) {
        img.image_ori = {
          url: '',
          width: 0,
          height: 0,
        };
        reporter.errorEvent({
          eventName:
            ReportErrorEventNames.OldChatMessageImageStructNotImageObjectError,
          error: new Error('image_ori not exist'),
        });
      }

      if (!img.image_thumb) {
        img.image_thumb = {
          url: '',
          width: 0,
          height: 0,
        };
        reporter.errorEvent({
          eventName:
            ReportErrorEventNames.OldChatMessageImageStructNotImageObjectError,
          error: new Error('image_thumb not exist'),
        });
      }

      if (!img.image_thumb.url) {
        img.image_thumb.url = img.image_ori.url;
      }
    });
  }

  fixedMessage.content = JSON.stringify(fixedMessage.content_obj);

  return fixedMessage;
};
