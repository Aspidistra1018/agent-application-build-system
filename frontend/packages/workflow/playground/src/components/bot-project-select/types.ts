//Backend undefined, derived from workflow_info profile_memory in bot_info
import { type IntelligenceType } from '@coze-arch/idl/intelligence_api';

export interface Variable {
  key: string;
  description?: string;
  default_value?: string;
}

export interface IBotSelectOption {
  name: string;
  avatar: string;
  value: string;
  type: IntelligenceType;
}

export interface ValueType {
  id?: string;
  type?: IntelligenceType;
}

export type IBotSelectOptions = IBotSelectOption[];

export interface DisableExtraOptions {
  disableBot?: boolean;
  disableProject?: boolean;
  disableBotTooltip?: string;
  disableProjectTooltip?: string;
}
