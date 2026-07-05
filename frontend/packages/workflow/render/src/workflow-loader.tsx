import React, { useLayoutEffect, useMemo, useEffect } from 'react';

import { FlowRendererRegistry } from '@flowgram-adapter/free-layout-editor';
import {
  LoggerEvent,
  LoggerService,
  useService,
} from '@flowgram-adapter/free-layout-editor';
import { WorkflowDocument } from '@flowgram-adapter/free-layout-editor';
import { reportTti } from '@coze-arch/report-tti/custom-perf-metric';

import styles from './index.module.less';

export const WorkflowLoader: React.FC = () => {
  const doc = useService<WorkflowDocument>(WorkflowDocument);
  const renderRegistry = useService<FlowRendererRegistry>(FlowRendererRegistry);
  const loggerService = useService<LoggerService>(LoggerService);
  useMemo(() => renderRegistry.init(), [renderRegistry]);
  useLayoutEffect(() => {
    // load data
    doc.load();
    // Destroy data
    return () => doc.dispose();
  }, [doc]);

  useEffect(() => {
    const disposable = loggerService.onLogger(({ event }) => {
      if (event === LoggerEvent.CANVAS_TTI) {
        // Report to coze
        reportTti();
      }
    });

    return () => {
      disposable?.dispose();
    };
  }, []);

  return <div className={styles.playgroundLoad} />;
};
