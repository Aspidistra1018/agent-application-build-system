import {
  type VersionMetaInfo,
  type OperateType,
} from '@coze-workflow/base/api';

/** Process Submission History List Component */
export interface WorkflowCommitListProps {
  className?: string;
  spaceId: string;
  workflowId: string;
  /** operation type */
  type: OperateType;
  /** Read-only mode, read-only history cards cannot be clicked, does not affect action */
  readonly?: boolean;
  /** Number of pulls per page, default 10 */
  limit?: number;
  /** current selection */
  value?: string;
  /** Whether to display the current node */
  showCurrent?: boolean;
  /** Whether to support publishing to PPE function */
  enablePublishPPE?: boolean;
  /** Hide the commitId (the commitId is less readable, and non-professional users do not need to perceive it) */
  hideCommitId?: boolean;
  /** Card click */
  onItemClick?: (item: VersionMetaInfo) => void;
  /** Restore to a certain version Click */
  onResetToCommit?: (item: VersionMetaInfo) => void;
  /** To view a version click */
  onShowCommit?: (item: VersionMetaInfo) => void;
  /** Publish to Multi-environment Click */
  onPublishPPE?: (item: VersionMetaInfo) => void;
  /** Click [Now] */
  onCurrentClick?: (currentKey: string) => void;
}
