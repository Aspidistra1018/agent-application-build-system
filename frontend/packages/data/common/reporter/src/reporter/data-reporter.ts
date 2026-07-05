import { get } from 'lodash-es';
import type { ErrorEvent, CustomEvent } from '@coze-arch/logger';

import { type DataNamespace } from '../constants';
import { reporterFun } from './utils';

enum ParamsIndex {
  SPACE_ID = 1,
  KNOWLEDGE_ID = 3,
  DOCUMENT_ID = 5,
}

/**
 * Distinguished from use-data-reporter
 * Use-data-reporter for component scenarios
 * Data-reporter for ts/js scenarios
 */
class DataReporter {
  /**
   * Access to public meta information
   */
  getMeta() {
    const pathName = window.location.pathname;
    const reg = /\/space\/(\d+)\/knowledge(\/(\d+)(\/(\d+))?)?/gi;
    const regRes = reg.exec(pathName);
    const meta = {
      spaceId: get(regRes, ParamsIndex.SPACE_ID),
      knowledgeId: get(regRes, ParamsIndex.KNOWLEDGE_ID),
      documentId: get(regRes, ParamsIndex.DOCUMENT_ID),
    };

    return meta;
  }

  /**
   * Error event reporting
   * @param namespace
   * @param event
   */
  errorEvent<EventEnum extends string>(
    namespace: DataNamespace,
    event: ErrorEvent<EventEnum>,
  ) {
    const meta = this.getMeta();
    reporterFun({ type: 'error', namespace, event, meta });
  }

  /**
   * Customs event report
   * @param namespace
   * @param event
   */
  event<EventEnum extends string>(
    namespace: DataNamespace,
    event: CustomEvent<EventEnum>,
  ) {
    const meta = this.getMeta();
    reporterFun({ type: 'custom', namespace, event, meta });
  }
}

export const dataReporter = new DataReporter();
