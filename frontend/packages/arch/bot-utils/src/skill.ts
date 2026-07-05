import { type SkillKeyEnum } from '@coze-agent-ide/tool-config';

/**
 * 'Capability module primary key 'to'interface-defined attribute name' function
 * ⚠️ For naming, see @/services/auto-generate/developer_api/namespaces/developer_api > TabDisplayItems
 */
export const skillKeyToApiStatusKeyTransformer = ($key: SkillKeyEnum) =>
  `${$key}_tab_status`;
