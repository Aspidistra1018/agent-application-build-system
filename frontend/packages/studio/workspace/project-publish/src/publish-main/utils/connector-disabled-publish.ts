import {
  type PublishConnectorInfo,
  ConnectorBindType,
  ConnectorConfigStatus,
} from '@coze-arch/idl/intelligence_api';

// Unconfigured/Authorized Scenario
export const getConnectorNotConfigured = (
  connector: PublishConnectorInfo,
): boolean => {
  const { bind_type, config_status } = connector;
  // Unbound & Unauthorized
  const notConfigured =
    [
      ConnectorBindType.KvBind,
      ConnectorBindType.AuthBind,
      ConnectorBindType.KvAuthBind,
      ConnectorBindType.TemplateBind, // Disable when mcp is not configured, the template is always configured
    ].includes(bind_type) &&
    config_status === ConnectorConfigStatus.NotConfigured;
  return notConfigured;
};

// Scenarios that cannot be published:
// 1. Unbound & Unauthorized
// 2. Those sent by the backend cannot be released (such as: APIs cannot be sent without workflow, templates cannot be sent with private plugins, and channels that cannot be released during review)
export const getDisabledPublish = (
  connector: PublishConnectorInfo,
): boolean => {
  const { allow_publish } = connector;
  // Unbound & Unauthorized
  const notConfigured = getConnectorNotConfigured(connector);

  const connectorDisabled = notConfigured || !allow_publish;

  // The backend of the scenario where the channel cannot be released during the review is issued allow_publish
  return connectorDisabled;
};
