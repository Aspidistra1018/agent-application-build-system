import { useEffect } from 'react';

import { useFieldArray } from '@/form';

import { useQueryFieldIDs } from './use-query-field-ids';
import { type OrderByFieldSchema } from './types';

// Listen to the query field. When the query field changes, check whether the sorting field exists in the query field. If it does not exist, remove it.
export const useValidateOrderFields = () => {
  const { value, onChange } = useFieldArray<OrderByFieldSchema>();
  const queryFieldIDs = useQueryFieldIDs();
  useEffect(() => {
    const fieldSchemaFiltered = value?.filter(({ fieldID }) =>
      queryFieldIDs.includes(fieldID),
    );
    onChange(fieldSchemaFiltered || []);
  }, [queryFieldIDs?.join(',')]);
};
