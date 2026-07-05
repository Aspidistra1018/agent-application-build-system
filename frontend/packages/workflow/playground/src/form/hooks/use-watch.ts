import { useWatch as useBaseWatch } from '@flowgram-adapter/free-layout-editor';

import { type FieldName } from '../type';

/**
 * Monitors the value of the specified field.
 *
 * @Param name field name.
 * @Returns the value of the field.
 */
export function useWatch<Value = unknown>(
  name: FieldName | { name: FieldName },
) {
  const value = useBaseWatch(
    typeof name === 'string' ? name : name.name,
  ) as Value;

  return value;
}
