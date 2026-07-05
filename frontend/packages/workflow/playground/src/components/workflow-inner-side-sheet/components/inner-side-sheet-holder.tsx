/**
 * This component provides a sidesheet rendering space in the workflow canvas, so that the sidesheet space in the canvas can squeeze the canvas to achieve some side-pull interaction
 * In this space, the semi-ui SideSheet is still used by default to render the pull window, keeping development simple
 */
import { useEffect } from 'react';

import { useSingletonInnerSideSheet } from '../hooks/use-singleton-inner-side-sheet';
import { WORKFLOW_INNER_SIDE_SHEET_HOLDER } from '../../../constants';

import styles from './index.module.less';

export const WorkflowInnerSideSheetHolder = () => {
  const { forceClose } = useSingletonInnerSideSheet('');

  // Clear single pop-up window status when destroyed
  useEffect(() => () => forceClose(), []);

  return (
    <div
      id={WORKFLOW_INNER_SIDE_SHEET_HOLDER}
      className={styles.workflowInnerSideSheetHolder}
    ></div>
  );
};
