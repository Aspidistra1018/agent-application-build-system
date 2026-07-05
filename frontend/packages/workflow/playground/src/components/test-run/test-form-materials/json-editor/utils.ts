import { type SchemaObject } from 'ajv';
import { type MonacoEditor } from '@coze-arch/bot-monaco-editor/types';

const getGlobalSchemas = (monaco: MonacoEditor) =>
  monaco.languages.json.jsonDefaults.diagnosticsOptions.schemas || [];

/*  diagnosticsOptions is a global sharing configuration, and overwriting needs to be avoided in multi-instance scenarios */
export const setJsonSchema = (
  monaco: MonacoEditor,
  schema: SchemaObject,
  uri: string,
) => {
  monaco.languages.json.jsonDefaults.diagnosticsOptions;
  const schemas = getGlobalSchemas(monaco);

  // During local development, the monaco plug-in is commented out due to performance. You can manually add the plug-in back when developing related functions (apps/bot/edenx.config.ts)
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemaValidation: 'error',
    schemas: [
      ...schemas,
      {
        uri,
        fileMatch: [uri],
        schema,
      },
    ],
  });
};

export const clearJsonSchema = (monaco: MonacoEditor, uri: string) => {
  const schemas = getGlobalSchemas(monaco);
  const disposedSchema = schemas.filter(schema => schema.uri !== uri);

  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    schemas: disposedSchema,
  });
};
