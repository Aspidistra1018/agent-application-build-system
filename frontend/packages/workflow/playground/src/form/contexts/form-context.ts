/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useContext } from 'react';

export interface FormContextType {
  /**
   * When set to true, form fields should be read-only
   */
  readonly?: boolean;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined,
);

export const FormProvider = FormContext.Provider;

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
}
