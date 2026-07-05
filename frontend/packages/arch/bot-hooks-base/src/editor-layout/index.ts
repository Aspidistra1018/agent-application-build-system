/**
 * @Description 'LayoutContext' is used to pass layout-related information across components
 * @since 2024.03.05
 */
import { createContext, useContext } from 'react';

export enum PlacementEnum {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

interface ILayoutContext {
  placement: PlacementEnum;
}

const context = createContext<ILayoutContext>({
  placement: PlacementEnum.CENTER,
});

export const useLayoutContext = () => useContext(context);

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LayoutContext = context.Provider;
