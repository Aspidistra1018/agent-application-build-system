import { type DatabaseInfo } from '@coze-studio/bot-detail-store';
import {
  type AlterBotTableResponse,
  type InsertBotTableResponse,
} from '@coze-arch/bot-api/memory';

export type OnSave = (params: {
  response: InsertBotTableResponse | AlterBotTableResponse;
}) => Promise<void>;

/* eslint-disable @typescript-eslint/naming-convention -- history file copy */
export enum CreateType {
  custom = 'custom',
  template = 'template',
  excel = 'excel',
  // recommended table
  recommend = 'recommend',
  // Enter natural language to build a table
  naturalLanguage = 'naturalLanguage',
}
/* eslint-enable @typescript-eslint/naming-convention -- history file copy */

export interface MapperItem {
  label: string;
  key: string;
  validator: {
    type: VerifyType;
    message: string;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- historical file copy
  defaultValue: any;
  require: boolean;
}

export type TableBasicInfo = Pick<
  DatabaseInfo,
  'name' | 'desc' | 'readAndWriteMode'
> & { prompt_disabled: boolean };
export type TableFieldsInfo = DatabaseInfo['tableMemoryList'];

export enum VerifyType {
  Required = 1,
  Unique = 2,
  Naming = 3,
}

export type TriggerType = 'blur' | 'change' | 'save';

export interface NL2DBInfo {
  prompt: string;
}

export type ReadAndWriteModeOptions = 'excel' | 'normal' | 'expert';
