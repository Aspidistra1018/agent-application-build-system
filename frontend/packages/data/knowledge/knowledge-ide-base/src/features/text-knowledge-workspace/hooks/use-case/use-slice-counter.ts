import { useShallow } from 'zustand/react/shallow';
import { useKnowledgeStore } from '@coze-data/knowledge-stores';

/**
 * Hooks that handle document fragment counting
 */
export const useSliceCounter = () => {
  const { dataSetDetail, setDataSetDetail } = useKnowledgeStore(
    useShallow(state => ({
      dataSetDetail: state.dataSetDetail,
      setDataSetDetail: state.setDataSetDetail,
    })),
  );

  // Update count when processing added blocks
  const handleIncreaseSliceCount = () => {
    if (!dataSetDetail) {
      return;
    }

    setDataSetDetail({
      ...dataSetDetail,
      slice_count:
        // @ts-expect-error -- linter-disable-autofix
        dataSetDetail.slice_count > -1
          ? // @ts-expect-error -- linter-disable-autofix
            dataSetDetail.slice_count + 1
          : 0,
    });
  };

  // Update count when processing deleted blocks
  const handleDecreaseSliceCount = () => {
    if (!dataSetDetail) {
      return;
    }

    setDataSetDetail({
      ...dataSetDetail,
      slice_count:
        // @ts-expect-error -- linter-disable-autofix
        dataSetDetail.slice_count > -1
          ? // @ts-expect-error -- linter-disable-autofix
            dataSetDetail.slice_count - 1
          : 0,
    });
  };

  return {
    handleIncreaseSliceCount,
    handleDecreaseSliceCount,
  };
};
