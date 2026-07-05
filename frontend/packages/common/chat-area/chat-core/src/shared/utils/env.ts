import { type ENV, type DeployVersion } from '../const';

/**
 * Get slardar report environment
 * Data isolation between different environments
 * @returns
 */
export const getSlardarEnv = ({
  env,
  deployVersion,
}: {
  env: ENV;
  deployVersion: DeployVersion;
}) => [deployVersion, env].join('-');
