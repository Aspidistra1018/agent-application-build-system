import { InteractiveType } from './mouse-pad-selector';
import { CACHE_KEY, SHOW_KEY, IS_MAC_OS } from './constants';

export const getPreferInteractiveType = () => {
  const data = localStorage.getItem(CACHE_KEY) as string;
  if (
    data &&
    [InteractiveType.Mouse, InteractiveType.Pad].includes(
      data as InteractiveType,
    )
  ) {
    return data;
  }
  return IS_MAC_OS ? InteractiveType.Pad : InteractiveType.Mouse;
};

/** Record the selected interaction mode */
export const setPreferInteractiveType = (type: InteractiveType) => {
  localStorage.setItem(CACHE_KEY, type);
};

export const hideGuidingPopover = () => {
  localStorage.setItem(SHOW_KEY, 'true');
};

export const needShowGuidingPopover = () => {
  const data = localStorage.getItem(SHOW_KEY) as string;
  return data !== 'true';
};
