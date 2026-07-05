/* eslint-disable @typescript-eslint/naming-convention -- inner value */
/* eslint-disable react-hooks/exhaustive-deps -- init */
import { type RefObject, useCallback, useEffect, useState } from 'react';

import { debounce } from 'lodash-es';

import type { CommentEditorModel } from '../../model';
import { CommentEditorEvent, CommentToolbarDisplayDelay } from '../../constant';

export const useActivate = (params: {
  model: CommentEditorModel;
  toolbarRef: RefObject<HTMLDivElement>;
}) => {
  const { model, toolbarRef } = params;
  const [activated, _setActivated] = useState(false);

  const setActivated = useCallback(
    debounce((active: boolean) => {
      _setActivated(active);
    }, CommentToolbarDisplayDelay),
    [],
  );

  // Clean up the debounce
  useEffect(() => () => setActivated.cancel(), [setActivated]);

  // Listening for handling model events
  useEffect(() => {
    const eventHandlers = {
      [CommentEditorEvent.MultiSelect]: () => setActivated(true),
      [CommentEditorEvent.Select]: () => setActivated(false),
      [CommentEditorEvent.Change]: () => setActivated(false),
      [CommentEditorEvent.Blur]: () => setActivated(false),
    };

    const disposers = Object.entries(eventHandlers).map(([event, handler]) =>
      model.on(event as CommentEditorEvent, handler),
    );

    return () => {
      disposers.forEach(dispose => dispose());
    };
  }, [model, setActivated]);

  // mouse event handling
  useEffect(() => {
    const mouseHandler = (e: MouseEvent) => {
      if (
        !toolbarRef.current ||
        toolbarRef.current.contains(e.target as Node)
      ) {
        return;
      }
      setActivated(false);
    };

    window.addEventListener('mousedown', mouseHandler);
    return () => window.removeEventListener('mousedown', mouseHandler);
  }, [toolbarRef, setActivated]);

  return activated;
};
