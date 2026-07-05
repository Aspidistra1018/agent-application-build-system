import { type ReportLog } from '@/report-log';
import type { EventPayloadMaps } from '@/plugins/upload-plugin/types/plugin-upload';
import type {
  ContentType,
  CreateMessageOptions,
  FileMessageProps,
  ImageMessageProps,
  Message,
  NormalizedMessageProps,
  TextAndFileMixMessageProps,
  TextMessageProps,
} from '@/message/types';
import { type PreSendLocalMessageEventsManager } from '@/message/presend-local-message/presend-local-message-events-manager';
import { type PreSendLocalMessageFactory } from '@/message';

import { type PluginsService } from './plugins-service';

export interface CreateMessageServicesProps {
  preSendLocalMessageFactory: PreSendLocalMessageFactory;
  preSendLocalMessageEventsManager: PreSendLocalMessageEventsManager;
  reportLogWithScope: ReportLog;
  pluginsService: PluginsService;
}

export class CreateMessageService {
  preSendLocalMessageFactory: PreSendLocalMessageFactory;
  preSendLocalMessageEventsManager: PreSendLocalMessageEventsManager;
  reportLogWithScope: ReportLog;
  pluginsService: PluginsService;
  constructor({
    preSendLocalMessageFactory,
    preSendLocalMessageEventsManager,
    reportLogWithScope,
    pluginsService,
  }: CreateMessageServicesProps) {
    this.preSendLocalMessageFactory = preSendLocalMessageFactory;
    this.preSendLocalMessageEventsManager = preSendLocalMessageEventsManager;
    this.reportLogWithScope = reportLogWithScope;
    this.pluginsService = pluginsService;
  }

  /**
   * Create text message
   */
  createTextMessage(
    props: TextMessageProps,
    options?: CreateMessageOptions,
  ): Message<ContentType.Text> {
    return this.preSendLocalMessageFactory.createTextMessage(
      props,
      this.preSendLocalMessageEventsManager,
      options,
    );
  }

  /**
   * Create image message
   */
  createImageMessage<M extends EventPayloadMaps = EventPayloadMaps>(
    props: ImageMessageProps<M>,
    options?: CreateMessageOptions,
  ): Message<ContentType.Image> {
    const { UploadPlugin, uploadPluginConstructorOptions } =
      this.pluginsService;
    if (!UploadPlugin) {
      this.reportLogWithScope.info({
        message: '请先注册上传插件',
      });
      throw new Error('请先注册上传插件');
    }
    return this.preSendLocalMessageFactory.createImageMessage({
      messageProps: props,
      UploadPlugin,
      uploadPluginConstructorOptions,
      messageEventsManager: this.preSendLocalMessageEventsManager,
      options,
    });
  }

  /**
   * Create file message
   */
  createFileMessage<M extends EventPayloadMaps = EventPayloadMaps>(
    props: FileMessageProps<M>,
    options?: CreateMessageOptions,
  ): Message<ContentType.File> {
    const { UploadPlugin, uploadPluginConstructorOptions } =
      this.pluginsService;
    if (!UploadPlugin) {
      this.reportLogWithScope.info({
        message: '请先注册上传插件',
      });
      throw new Error('请先注册上传插件');
    }
    return this.preSendLocalMessageFactory.createFileMessage({
      messageProps: props,
      UploadPlugin,
      uploadPluginConstructorOptions,
      messageEventsManager: this.preSendLocalMessageEventsManager,
      options,
    });
  }

  /**
   * Create a mixed message
   */
  createTextAndFileMixMessage(
    props: TextAndFileMixMessageProps,
    options?: CreateMessageOptions,
  ): Message<ContentType.Mix> {
    return this.preSendLocalMessageFactory.createTextAndFileMixMessage(
      props,
      this.preSendLocalMessageEventsManager,
      options,
    );
  }

  /**
   * Create standardized messages, messages with payload content structure already processed
   */
  createNormalizedPayloadMessage<T extends ContentType>(
    props: NormalizedMessageProps<T>,
    options?: CreateMessageOptions,
  ): Message<T> {
    return this.preSendLocalMessageFactory.createNormalizedMessage<T>(
      props,
      this.preSendLocalMessageEventsManager,
      options,
    );
  }
}
