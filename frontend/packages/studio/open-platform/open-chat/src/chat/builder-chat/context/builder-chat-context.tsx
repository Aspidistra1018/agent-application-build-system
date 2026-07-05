import {
  createContext,
  type FC,
  type PropsWithChildren,
  useContext,
} from 'react';

import { useUpdateEffect } from 'ahooks';

import { type IBuilderChatProps } from '../type';
import { combineAppDataWithProps } from '../services/get-bot-info';
import { type InitData } from '../data-type';

interface BuilderChatContextValue {
  appDataFromOnLine?: InitData | null;
  appDataCombineWithProps?: InitData | null;
}
type BuilderChatContextProps = BuilderChatContextValue & {
  setAppDataFromOnLine?: (appDataFromOnLint: InitData | null) => void;
  setAppDataCombineWithProps?: (
    appDataCombineWithProps: InitData | null,
  ) => void;
};
const BuilderChatContext = createContext<BuilderChatContextProps>({
  appDataFromOnLine: null,
  appDataCombineWithProps: null,
});

export const BuilderChatProvider: FC<
  PropsWithChildren<BuilderChatContextProps>
> = ({ children, ...props }) => (
  <BuilderChatContext.Provider value={props} children={children} />
);

export const useGetAppDataFromOnLine = () => {
  const { appDataFromOnLine } = useContext(BuilderChatContext);
  return appDataFromOnLine;
};

export const useGetAppDataCombineWithProps = () => {
  const { appDataCombineWithProps } = useContext(BuilderChatContext);
  return appDataCombineWithProps;
};

export const useSetAppDataFromOnLine = () => {
  const { setAppDataFromOnLine } = useContext(BuilderChatContext);
  return setAppDataFromOnLine;
};
export const useUpdateAppDataCombineWithProps = (props: IBuilderChatProps) => {
  const { appDataFromOnLine, setAppDataCombineWithProps } =
    useContext(BuilderChatContext);
  useUpdateEffect(() => {
    if (appDataFromOnLine) {
      const formatAPPInfo = combineAppDataWithProps(appDataFromOnLine, props);
      setAppDataCombineWithProps?.(formatAPPInfo);
    }
  }, [appDataFromOnLine, props]);
};
