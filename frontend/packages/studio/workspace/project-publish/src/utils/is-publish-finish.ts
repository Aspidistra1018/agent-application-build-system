import {
  type PublishRecordDetail,
  PublishRecordStatus,
  ConnectorPublishStatus,
} from '@coze-arch/idl/intelligence_api';

/**
 * Determine whether the publishing process has ended and stop polling
 */
export function isPublishFinish(record: PublishRecordDetail) {
  // Project packaging failed/review failed
  const projectFinish =
    record.publish_status === PublishRecordStatus.PackFailed ||
    record.publish_status === PublishRecordStatus.AuditNotPass;
  // All channels are under review, failed, or successful
  const connectorsFinish =
    record.connector_publish_result?.every(
      item =>
        item.connector_publish_status === ConnectorPublishStatus.Auditing ||
        item.connector_publish_status === ConnectorPublishStatus.Failed ||
        item.connector_publish_status === ConnectorPublishStatus.Success,
    ) ?? false;
  return projectFinish || connectorsFinish;
}
