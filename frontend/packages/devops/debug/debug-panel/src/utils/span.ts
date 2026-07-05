import { span2CSpan } from '@coze-devops/common-modules/query-trace';
import {
  checkIsBatchBasicCSpan,
  type CSPanBatch,
  type CSpan,
  type CSpanSingle,
} from '@coze-devops/common-modules/query-trace';
import {
  type Span,
  type TraceAdvanceInfo,
} from '@coze-arch/bot-api/ob_query_api';

export const getSpanProp = (span: CSpan, key: string) => {
  if (checkIsBatchBasicCSpan(span)) {
    const batchSpan = span as CSPanBatch;
    return (
      batchSpan[key as keyof CSPanBatch] ??
      batchSpan.spans[0]?.extra?.[key as keyof CSPanBatch['spans'][0]['extra']]
    );
  } else {
    const singleSpan = span as CSpanSingle;
    return (
      singleSpan[key as keyof CSpanSingle] ??
      singleSpan.extra?.[key as keyof CSpanSingle['extra']]
    );
  }
};

/**
 * Enhance the original Span information (inject token, status, etc. collected at the server level)
 * @param originSpans Span[]
 * @param traceAdvanceInfo TraceAdvanceInfo[]
 * @returns CSpan[]
 */
export const enhanceOriginalSpan = (
  originSpans: Span[],
  traceAdvanceInfo: TraceAdvanceInfo[],
): CSpan[] => {
  const traceAdvanceInfoMap: Record<string, TraceAdvanceInfo> =
    traceAdvanceInfo.reduce<Record<string, TraceAdvanceInfo>>((pre, cur) => {
      pre[cur.trace_id] = cur;
      return pre;
    }, {});
  const traceCSpans = originSpans.map(item => span2CSpan(item));
  const enhancedOverallSpans: CSpan[] = traceCSpans.map(item => {
    const {
      tokens: { input, output },
      status,
    } = traceAdvanceInfoMap[item.trace_id];
    return {
      ...item,
      status,
      input_tokens_sum: input,
      output_tokens_sum: output,
    };
  });
  return enhancedOverallSpans;
};
