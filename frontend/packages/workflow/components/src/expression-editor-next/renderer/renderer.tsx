import { useCallback, useEffect, useMemo, useRef } from 'react';

import { Renderer as SDKRenderer } from '@coze-editor/editor/react';
import expression, {
  type EditorAPI as ExpressionEditorAPI,
} from '@coze-editor/editor/preset-expression';

import { type ExpressionEditorTreeNode } from '@/expression-editor';

import { useDeepEqualMemo, useLatest } from '../shared';
import { useInputRules, useExtensions } from './hooks';

interface RendererProps {
  value?: string;
  className?: string;
  readonly?: boolean;
  placeholder?: string;
  dataTestID?: string;
  variableTree: ExpressionEditorTreeNode[];
  onChange?: (value: string) => void;
}

function Renderer({
  value,
  variableTree,
  className,
  readonly,
  placeholder,
  dataTestID,
  onChange,
}: RendererProps) {
  const apiRef = useRef<ExpressionEditorAPI | null>(null);
  const variableTreeRef = useLatest<ExpressionEditorTreeNode[] | undefined>(
    variableTree,
  );
  const changedVariableTree = useDeepEqualMemo(variableTree);
  const inputRules = useInputRules(apiRef);
  const extensions = useExtensions(variableTreeRef);
  const contentAttributes = useMemo(
    () => ({
      class: `${className ?? ''} flow-canvas-not-draggable`,
      'data-testid': dataTestID ?? '',
      'data-flow-editor-selectable': 'false',
    }),
    [className, dataTestID],
  );

  const handleChange = useCallback(
    (e: { value: string }) => {
      if (typeof onChange === 'function') {
        onChange(e.value);
      }
    },
    [onChange],
  );

  // Note: changedVariableTree is only used for performance optimization
  // useVariableTree still has issues with the timing of triggering, and scaling the canvas also frequently triggers variableTree changes
  useEffect(() => {
    const editor = apiRef.current;

    if (!editor) {
      return;
    }

    editor.updateWholeDecorations();
  }, [changedVariableTree]);

  function handleFocus() {
    const editor = apiRef.current;

    if (!editor) {
      return;
    }

    editor.updateWholeDecorations();
  }

  // value controlled
  useEffect(() => {
    const editor = apiRef.current;

    if (!editor) {
      return;
    }

    if (typeof value === 'string' && value !== editor.getValue()) {
      editor.setValue(value);
    }
  }, [value]);

  return (
    <SDKRenderer
      plugins={expression}
      defaultValue={value ?? ''}
      options={{
        fontSize: 14,
        inputRules,
        readOnly: readonly,
        placeholder,
        contentAttributes,
      }}
      onFocus={handleFocus}
      onChange={handleChange}
      extensions={extensions}
      didMount={api => (apiRef.current = api)}
    />
  );
}

export { Renderer };
