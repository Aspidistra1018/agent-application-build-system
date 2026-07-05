import type React from 'react';

import { type ValueExpression } from '@coze-workflow/variable';
import { type RoleType } from '@coze-arch/idl/social_api';

export interface RoleInformation {
  /** The unique ID of the character in the scene. */
  biz_role_id: string;
  /** character name */
  role: string;
  /** character nickname */
  nickname?: string;
  /** character type */
  role_type: RoleType;
  /** Role Description */
  description?: string;
}

export interface RoleSetting {
  biz_role_id: string;
  role: string;
  nickname?: string;
}

export interface NicknameVariableSetting {
  biz_role_id: '';
  role: '';
  nickname: string;
}

export type UserSettings = RoleSetting[] | NicknameVariableSetting[];

export interface MessageVisibilityValue {
  visibility?: string;
  user_settings?: UserSettings;
}

export interface RenderSelectOptionParams {
  className?: string;
  disabled?: boolean;
  focused?: boolean;
  selected?: boolean;
  inputValue?: string;
  label: string;
  value: string;
  onClick: (e: React.MouseEvent) => void;
}

export interface NicknameVariable {
  name: string;
  input?: ValueExpression;
}

export type NicknameVariables = Array<NicknameVariable>;
export interface MessageVisibilitySetterOptions {
  nicknameVariables: NicknameVariables;
}

export type RoleSelectHandler = (value: UserSettings) => void;
