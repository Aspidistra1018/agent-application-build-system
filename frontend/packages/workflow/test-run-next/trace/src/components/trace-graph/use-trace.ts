import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { useMemoizedFn } from 'ahooks';
import { workflowApi } from '@coze-workflow/base';
import { type TraceFrontendSpan } from '@coze-arch/bot-api/workflow_api';

import { sortSpans } from '../../utils';
import { useTraceListStore } from '../../contexts';
import { MAX_TRACE_TIME } from '../../constants';

export const useTrace = () => {
  const [loading, setLoading] = useState(false);
  const [spans, setSpans] = useState<TraceFrontendSpan[] | null>(null);

  const { span } = useTraceListStore(store => ({
    span: store.span,
  }));

  const fetch = useMemoizedFn(async (logId: string) => {
    setLoading(true);
    /** When querying the log, the start and end time must be passed. Since the user can check the range within 7 days, he can directly fake the 7-day time interval. */
    const now = dayjs().endOf('day').valueOf();
    const end = dayjs()
      .subtract(MAX_TRACE_TIME, 'day')
      .startOf('day')
      .valueOf();

    try {
      const { data } = await workflowApi.GetTraceSDK({
        log_id: logId,
        start_at: end,
        end_at: now,
      });
      if (!data || !data.spans) {
        return;
      }
      const next = sortSpans(data.spans);
      setSpans(next);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (span?.log_id) {
      fetch(span.log_id);
    }
  }, [span, fetch]);

  return { spans, loading };
};
