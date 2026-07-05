/**
 * This component provides a sidesheet rendering space in the workflow canvas, so that the sidesheet space in the canvas can squeeze the canvas to achieve some side-pull interaction
 * In this space, the semi-ui SideSheet is still used by default to render the pull window, keeping development simple
 */

import { WORKFLOW_OUTER_SIDE_SHEET_HOLDER } from '../../constants';

import styles from './index.module.less';

export const WorkflowOuterSideSheetHolder = () => (
  <div
    id={WORKFLOW_OUTER_SIDE_SHEET_HOLDER}
    className={styles.workflowOuterSideSheetHolder}
  ></div>
);
