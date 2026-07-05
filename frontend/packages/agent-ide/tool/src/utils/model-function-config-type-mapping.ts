import { type AbilityKey } from '@coze-agent-ide/tool-config';
import { ModelFuncConfigType } from '@coze-arch/bot-api/developer_api';

// Mapping of AbilityKey to ModelFuncConfigType
const abilityKeyFuncConfigTypeMap: {
  // Make sure each key is configured here
  [key in AbilityKey]: ModelFuncConfigType | null;
} = {
  plugin: ModelFuncConfigType.Plugin,
  workflow: ModelFuncConfigType.Workflow,
  knowledge: null,
  imageflow: ModelFuncConfigType.ImageFlow,
  variable: ModelFuncConfigType.Variable,
  database: ModelFuncConfigType.Database,
  longTermMemory: ModelFuncConfigType.LongTermMemory,
  fileBox: ModelFuncConfigType.FileBox,
  trigger: ModelFuncConfigType.Trigger,
  onboarding: ModelFuncConfigType.Onboarding,
  suggest: ModelFuncConfigType.Suggestion,
  voice: ModelFuncConfigType.TTS,
  background: ModelFuncConfigType.BackGroundImage,
  document: ModelFuncConfigType.KnowledgeText,
  table: ModelFuncConfigType.KnowledgeTable,
  photo: ModelFuncConfigType.KnowledgePhoto,
  shortcut: ModelFuncConfigType.ShortcutCommand,
  devHooks: ModelFuncConfigType.HookInfo,
  userInput: ModelFuncConfigType.TTS,
};

export const abilityKey2ModelFunctionConfigType = (abilityKey: AbilityKey) =>
  abilityKeyFuncConfigTypeMap[abilityKey];
