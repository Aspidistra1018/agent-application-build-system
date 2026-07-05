import { isUndefined, omitBy } from 'lodash-es';

/**
 * Zustand updates helper methods, checking imported parameter objects, discarding items with undefined values.
 * Zustand itself has no filtering logic. If there is no problem with the type, it may accidentally set the item to an undefined value
 */
export const updateOnlyDefined = <T extends Record<string, unknown>>(
  updater: (sth: T) => void,
  val: T,
) => {
  const left = omitBy(val, isUndefined) as T;
  if (!Object.keys(left).length) {
    return;
  }
  updater(left);
};
