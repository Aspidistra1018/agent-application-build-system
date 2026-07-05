//Backend undefined, derived from workflow_info profile_memory in bot_info
export interface Variable {
  key: string;
  description?: string;
  default_value?: string;
}

export interface IBotSelectOption {
  name: string;
  avatar: string;
  value: string;
}
