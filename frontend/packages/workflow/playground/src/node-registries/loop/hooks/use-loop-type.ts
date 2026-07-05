import { useCurrentEntity } from '@flowgram-adapter/free-layout-editor';
import {
  FlowNodeFormData,
  type FormModelV2,
} from '@flowgram-adapter/free-layout-editor';
import { useEffect, useLayoutEffect, useState } from 'react';
import { LoopPath, LoopType } from '../constants';

export const useLoopType = () => {
  const [loopType, setLoopType] = useState<LoopType | undefined>();

  const node = useCurrentEntity();
  const formModel = node.getData(FlowNodeFormData).getFormModel<FormModelV2>();
  const getLoopType = () =>
    formModel.getValueIn<LoopType>(LoopPath.LoopType) ?? LoopType.Array;

  // Synchronized form value initialization
  useLayoutEffect(() => {
    setLoopType(getLoopType());
  }, [formModel]);

  // Synchronize form external value changes: undo/redo/synergy
  useEffect(() => {
    const disposer = formModel.onFormValuesChange(({ name }) => {
      if (name !== LoopPath.LoopType) {
        return;
      }
      setLoopType(getLoopType());
    });
    return () => disposer.dispose();
  }, [formModel]);

  return loopType;
};
