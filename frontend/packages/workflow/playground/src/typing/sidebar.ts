import { type FormDataTypeName } from '@flowgram-adapter/free-layout-editor';
import { type ViewVariableType } from '@coze-workflow/base';

export interface OutputType {
  name: string;
  required: boolean;
  // Hack: At present, the backend will echo to ParamTypeAlias type after saving.
  // The front end uses the FormDataTypeName string type.
  type: FormDataTypeName | ViewVariableType;
  key: string;
}
