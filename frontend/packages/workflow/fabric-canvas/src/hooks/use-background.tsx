import { useEffect, useState } from 'react';

import { type Canvas } from 'fabric';
import { useDebounceEffect } from 'ahooks';

import { type FabricSchema } from '../typings';

export const useBackground = ({
  canvas,
  schema,
}: {
  canvas?: Canvas;
  schema: FabricSchema;
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string>();

  useEffect(() => {
    if (!canvas) {
      return;
    }

    setBackgroundColor(
      (canvas as unknown as { backgroundColor: string }).backgroundColor,
    );
  }, [canvas]);

  // The effect of stabilization is that the change of form.schema.backgroundColor is asynchronous, and the change of setBackgroundColor is synchronous, and the two may fight
  useDebounceEffect(
    () => {
      setBackgroundColor(schema.backgroundColor as string);
    },
    [schema.backgroundColor],
    {
      wait: 300,
    },
  );

  useEffect(() => {
    if (
      backgroundColor &&
      canvas &&
      (canvas as unknown as { backgroundColor: string }).backgroundColor !==
        backgroundColor
    ) {
      canvas.set({
        backgroundColor,
      });
      canvas.fire('object:modified');
      canvas.requestRenderAll();
    }
  }, [backgroundColor, canvas]);

  return {
    backgroundColor,
    setBackgroundColor,
  };
};
