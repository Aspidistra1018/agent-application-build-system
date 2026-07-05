import { devtools } from 'zustand/middleware';
import { create } from 'zustand';
import { type CSpan } from '@coze-devops/common-modules/query-trace';
import {
  type GetTracesMetaInfoData,
  type Span,
} from '@coze-arch/bot-api/ob_query_api';

import {
  type BasicInfo,
  type QueryFilterItemId,
  type TargetOverallSpanInfo,
} from '../typings';
import { IS_DEV_MODE } from '../consts/env';
import { FILTERING_OPTION_ALL } from '../consts';

export type SpanCategory = GetTracesMetaInfoData['span_category'];

interface DebugPanelStore {
  isPanelShow: boolean;
  basicInfo: BasicInfo;
  /**
   * The currently selected Query LogID
   */
  entranceMessageLogId?: string;
  /**
   * date filter results
   */
  targetDateId?: QueryFilterItemId;
  /**
   * status filter results
   */
  targetExecuteStatusId?: QueryFilterItemId;
  /**
   * Trace node information currently selected
   */
  targetOverallSpanInfo?: TargetOverallSpanInfo;
  /**
   * Current Calculated Trace List
   */
  enhancedOverallSpans: CSpan[];
  /**
   * List of Spans under a Trace
   */
  orgDetailSpans?: Span[];
  /**
   * Additional Span type information (server level provided)
   */
  spanCategory?: SpanCategory;
  /**
   * Information about the currently selected Span node
   */
  targetDetailSpan?: CSpan;
  curBatchPage?: number;
}

interface DebugPanelAction {
  setIsPanelShow: (isPanelShow: boolean) => void;
  setBasicInfo: (basicInfo: BasicInfo) => void;
  setEntranceMessageLogId: (entranceMessageLogId: string) => void;
  setTargetOverallSpanInfo: (overallSpanInfo: TargetOverallSpanInfo) => void;
  onSelectDate: (dateId: QueryFilterItemId) => void;
  onSelectExecuteStatus: (executeStatusId: QueryFilterItemId) => void;
  setEnhancedOverallSpans: (enhancedOverallSpans: CSpan[]) => void;
  setOrgDetailSpans: (orgDetailSpans: Span[]) => void;
  setSpanCategory: (spanCategory?: SpanCategory) => void;
  setTargetDetailSpan: (targetDetailSpan?: CSpan) => void;
  setCurBatchPage: (curBatchPage: number) => void;
  resetStore: () => void;
}

const initialStore: DebugPanelStore = {
  isPanelShow: false,
  basicInfo: {
    placement: 'left',
  },
  entranceMessageLogId: undefined,
  targetDateId: FILTERING_OPTION_ALL,
  targetExecuteStatusId: FILTERING_OPTION_ALL,
  enhancedOverallSpans: [],
  targetOverallSpanInfo: undefined,
  orgDetailSpans: undefined,
  targetDetailSpan: undefined,
};

export const useDebugPanelStore = create<DebugPanelStore & DebugPanelAction>()(
  devtools(
    set => ({
      ...initialStore,
      setIsPanelShow: (isPanelShow: boolean) => {
        set({ isPanelShow });
      },
      setBasicInfo: basicInfo => {
        set({ basicInfo });
      },
      setTargetOverallSpanInfo: overallSpanInfo => {
        set({ targetOverallSpanInfo: overallSpanInfo });
      },
      onSelectDate: dateId => {
        set({ targetDateId: dateId });
      },
      onSelectExecuteStatus: executeStatusId => {
        set({ targetExecuteStatusId: executeStatusId });
      },
      setEnhancedOverallSpans: enhancedOverallSpans => {
        set({ enhancedOverallSpans });
      },
      setEntranceMessageLogId: entranceMessageLogId => {
        set({ entranceMessageLogId });
      },
      setOrgDetailSpans: orgDetailSpans => {
        set({ orgDetailSpans });
      },
      setSpanCategory: spanCategory => {
        set({ spanCategory });
      },
      setTargetDetailSpan: targetDetailSpan => {
        set({ targetDetailSpan });
      },
      setCurBatchPage: curBatchPage => {
        set({ curBatchPage });
      },
      resetStore: () => {
        set(initialStore);
      },
    }),
    {
      enabled: IS_DEV_MODE,
      name: 'debug.debugPanelStore',
    },
  ),
);
