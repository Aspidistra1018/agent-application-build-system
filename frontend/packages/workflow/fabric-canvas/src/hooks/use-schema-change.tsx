import { useEffect, useState } from 'react';

import { type Canvas, type FabricObject } from 'fabric';

import { setElementAfterLoad } from '../utils';
import { type FabricSchema } from '../typings';

/**
 * Listen for schema changes, reload canvas
 * Read-only state required
 */
export const useSchemaChange = ({
  canvas,
  schema,
  readonly,
}: {
  canvas: Canvas | undefined;
  schema: FabricSchema;
  readonly: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    canvas
      ?.loadFromJSON(JSON.stringify(schema), (elementSchema, element) => {
        // Here is the callback for each element in the schema after it has been loaded
        setElementAfterLoad({
          element: element as FabricObject,
          options: { readonly },
          canvas,
        });
      })
      .then(() => {
        setLoading(false);
        canvas?.requestRenderAll();
      });
  }, [schema, canvas]);

  return {
    loading,
  };
};
