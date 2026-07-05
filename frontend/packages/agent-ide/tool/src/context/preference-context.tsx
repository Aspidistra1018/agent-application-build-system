import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
} from 'react';

import { merge } from 'lodash-es';

export interface IPreferenceContext {
  /**
   * Whether to enable Tool Hide Mode
   */
  enableToolHiddenMode: boolean;
  /**
   * Read-only status
   */
  isReadonly: boolean;
}

const DEFAULT_PREFERENCE: IPreferenceContext = {
  enableToolHiddenMode: false,
  isReadonly: false,
};

const PreferenceContext = createContext<IPreferenceContext>(DEFAULT_PREFERENCE);

export const PreferenceContextProvider: FC<
  PropsWithChildren<Partial<IPreferenceContext>>
> = props => {
  const { children, ...rest } = props;

  return (
    <PreferenceContext.Provider value={merge({}, DEFAULT_PREFERENCE, rest)}>
      {children}
    </PreferenceContext.Provider>
  );
};

export const usePreference = () => useContext(PreferenceContext);
