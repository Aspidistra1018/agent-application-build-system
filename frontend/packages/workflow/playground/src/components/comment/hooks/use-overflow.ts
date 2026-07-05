import { useCallback, useState, useEffect } from 'react';

import { usePlayground } from '@flowgram-adapter/free-layout-editor';

import type { CommentEditorModel } from '../model';
import { CommentEditorEvent } from '../constant';

export const useOverflow = (params: {
  model: CommentEditorModel;
  height: number;
}) => {
  const { model, height } = params;
  const playground = usePlayground();

  const [overflow, setOverflow] = useState(false);

  const isOverflow = useCallback((): boolean => {
    if (!model.element) {
      return false;
    }
    const containerHeight = height * playground.config.zoom;
    const { height: editorHeight } = model.element.getBoundingClientRect();
    return editorHeight > containerHeight;
  }, [model, height, playground]);

  // Update overflow
  const updateOverflow = useCallback(() => {
    setOverflow(isOverflow());
  }, [isOverflow]);

  // Monitor height change
  useEffect(() => {
    updateOverflow();
  }, [height, updateOverflow]);

  // Monitor change events
  useEffect(() => {
    const changeDispose = model.on<CommentEditorEvent.Change>(
      CommentEditorEvent.Change,
      () => {
        updateOverflow();
      },
    );
    return () => {
      changeDispose();
    };
  }, [model, updateOverflow]);

  return { overflow, updateOverflow };
};
