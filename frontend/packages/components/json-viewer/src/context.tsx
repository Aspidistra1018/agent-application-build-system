import React, {
  useCallback,
  useState,
  type PropsWithChildren,
  useEffect,
} from 'react';

import { createContext } from 'use-context-selector';
import { noop } from 'lodash-es';

import { type Field } from './types';

interface JsonViewerContextType {
  expand: Record<string, boolean> | null;
  onExpand: (path: string, val: boolean) => void;
}
interface JsonViewerProviderProps {
  fields: Field[];
  defaultExpandAllFields?: boolean;
}

/**
 * When the root has only one item and it can be drilled down, it is expanded by default
 */
const generateInitialExpandValue = (fields: Field[], expandAll?: boolean) => {
  if (expandAll) {
    return setExpandAllFields(fields);
  }
  if (fields.length === 1 && fields[0]?.isObj) {
    return {
      [fields[0].path.join('.')]: true,
    };
  }
  return null;
};

const setExpandAllFields = (fields: Field[]) =>
  fields.reduce(
    (acc, field) => ({
      ...acc,
      [field.path.join('.')]: true,
      ...setExpandAllFields(field.children),
    }),
    {},
  );

export const JsonViewerContext = createContext<JsonViewerContextType>({
  expand: {},
  onExpand: noop,
});

export const JsonViewerProvider: React.FC<
  PropsWithChildren<JsonViewerProviderProps>
> = ({ fields, children, defaultExpandAllFields }) => {
  /** Because there is logic that does not belong to a single item, the state of unfolding and folding is managed centrally */
  const [expand, setExpand] = useState<JsonViewerContextType['expand'] | null>(
    null,
  );
  const handleExpand = useCallback(
    (path: string, val: boolean) => setExpand(e => ({ ...e, [path]: val })),
    [setExpand],
  );

  /**
   * Fields are dynamically updated, pay attention to solidifying expand data here, because fields are always increased by less
   * Due to the existence of automatic expansion logic, assignment is required when changing from 0 = > 1
   */
  useEffect(() => {
    if (!expand) {
      const autoExpand = generateInitialExpandValue(
        fields,
        defaultExpandAllFields,
      );
      if (autoExpand) {
        setExpand(autoExpand);
      }
    }
  }, [expand, fields, setExpand, defaultExpandAllFields]);
  return (
    <JsonViewerContext.Provider value={{ expand, onExpand: handleExpand }}>
      {children}
    </JsonViewerContext.Provider>
  );
};
