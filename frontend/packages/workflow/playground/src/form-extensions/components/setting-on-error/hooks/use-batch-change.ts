import { useUpdateEffect } from 'ahooks';
import { SettingOnErrorProcessType } from '@coze-workflow/nodes';

import { type SettingOnErrorProps } from '../types';

interface Props
  extends Pick<SettingOnErrorProps, 'isBatch' | 'value' | 'onChange'> {
  isSettingOnErrorV2?: boolean;
}

/**
 * The batch scenario does not support abnormal branches. If abnormal branches are set when the batch is changed, it will be automatically converted to return the set content.
 */
export const useBatchChange = (props: Props) => {
  const { isBatch, value, onChange, isSettingOnErrorV2 } = props;
  useUpdateEffect(() => {
    if (
      isSettingOnErrorV2 &&
      isBatch &&
      value?.processType === SettingOnErrorProcessType.EXCEPTION
    ) {
      onChange?.({
        ...value,
        processType: SettingOnErrorProcessType.RETURN,
      });
    }
  }, [isBatch, isSettingOnErrorV2, onChange, value]);
};
