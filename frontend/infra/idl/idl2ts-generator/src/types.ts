import { type IPlugin } from '@coze-arch/idl2ts-plugin';
import { type IParseResultItem } from '@coze-arch/idl2ts-helper';

export interface Options {
  entries: string[];
  idlRoot: string;
  parsedResult?: IParseResultItem[];
  plugins?: IPlugin[];
  allowNullForOptional?: boolean;
  mapEnumKeyAsNumber?: boolean;
  outputDir: string;
  genSchema: boolean;
  genMock: boolean;
  genClient: boolean;
  entryName?: string;
  // createAPI file path
  commonCodePath?: string;
  // Decoding encoding will lose the type, here provides a way to manually add the corresponding type
  patchTypesOutput?: string;
  // PatchTypesOutput alias, patch type needs to be provided when using additional pkg organization
  patchTypesAliasOutput?: string;
}

export interface IGenOptions extends Options {
  idlRoot: string;
  outputDir: string;
  formatter?: (file: string, code: string) => string;
}
