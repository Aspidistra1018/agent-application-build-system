import React, { useEffect } from 'react';

import { Renderer, EditorProvider } from '@coze-editor/editor/react';
import { EditorView } from '@codemirror/view';

import { type EditorOtherProps, type EditorProps } from '../../interface';
import {
  initInputAndOutput,
  initTypescriptServer,
} from './typescript-editor-utils';
import preset from './preset';

initTypescriptServer();

export const TypescriptEditor = (props: EditorProps & EditorOtherProps) => {
  const {
    defaultContent,
    uuid,
    readonly,
    height,
    didMount,
    onChange,
    defaultLanguage,
    input,
    output,
  } = props;

  const uri = `file:///ts_editor_${uuid}.ts`;

  useEffect(() => {
    initInputAndOutput(input, output, uuid);
  }, [uuid]);

  return (
    <EditorProvider>
      <Renderer
        plugins={preset}
        domProps={{
          style: {
            height: 'calc(100% - 48px)',
          },
        }}
        didMount={api => {
          didMount?.(api);
          api.$on('change', ({ value }) => {
            onChange?.(value, defaultLanguage);
          });
        }}
        defaultValue={defaultContent}
        extensions={[
          EditorView.theme({
            '&.cm-focused': {
              outline: 'none',
            },
            '&.cm-editor': {
              height: height || 'unset',
            },
            '.cm-content': {
              fontFamily: 'Menlo, Monaco, "Courier New", monospace',
            },
            '.cm-content *': {
              fontFamily: 'inherit',
            },
          }),
        ]}
        options={{
          uri,
          languageId: 'typescript',
          theme: 'code-editor-dark',
          height,
          readOnly: readonly,
          editable: !readonly,
          fontSize: 12,
          tabSize: 4,
        }}
      />
    </EditorProvider>
  );
};
