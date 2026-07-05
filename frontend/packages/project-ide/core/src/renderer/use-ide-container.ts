import React from 'react';

import { type interfaces } from 'inversify';

import { IDEContainerContext } from './context';

/**
 * Acquire ide inversified container
 */
export function useIDEContainer(): interfaces.Container {
  return React.useContext(IDEContainerContext);
}
