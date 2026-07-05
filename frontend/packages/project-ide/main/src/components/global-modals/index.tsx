import React from 'react';

import { ResourceModal } from './resource-modal';
import { CloseConfirmModal } from './close-confirm-modal';

export const GlobalModals = () => (
  // do something
  <>
    {/* Mobile resource library global pop-up window */}
    <ResourceModal />
    {/* Saving resource closes pop-up window */}
    <CloseConfirmModal />
  </>
);
