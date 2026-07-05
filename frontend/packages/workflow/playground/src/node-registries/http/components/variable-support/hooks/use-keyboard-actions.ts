import { useEffect } from 'react';

import { useEditor } from '@coze-editor/editor/react';
import { type EditorAPI } from '@coze-editor/editor/preset-universal';

import { getOptionInfoFromDOM } from '../utils';
import { useOptionsOperations } from './use-options-operations';
import { useKeyboard } from './use-keyboard';

export const useKeyboardActions = ({
  dropDownVisible,
  editorRef,
  interpolationContent,
  dropdownRef,
  variableMenuRef,
  openMenu,
  setActiveOptionHover,
  setTreeVisible,
  isInputDropdownOpen,
  applyNode,
}) => {
  const editor = useEditor<EditorAPI>();

  const isOptionsVisible = getOptionInfoFromDOM(
    variableMenuRef.current?.treeContainerRef,
    '.semi-tree-option-list .semi-tree-option',
  );

  /**
   * Disable the default behavior of ArrowUp/ArrowDown/Enter when the recommendation panel appears
   * Change up and down keys to switch recommendations
   * Left-click to close the variable list, right-click to open the variable list, and press Enter to insert.
   */
  useEffect(() => {
    if (!editor) {
      return;
    }

    if (dropDownVisible) {
      editor.disableKeybindings([
        'ArrowUp',
        'ArrowLeft',
        'ArrowRight',
        'ArrowDown',
      ]);
    }

    // When the variable list is detected, disable carriage return
    if (isOptionsVisible) {
      editor.disableKeybindings([
        'Enter',
        'ArrowUp',
        'ArrowLeft',
        'ArrowRight',
        'ArrowDown',
      ]);
    }

    if (!dropDownVisible && !isOptionsVisible) {
      editor.disableKeybindings([]);
    }
  }, [dropDownVisible, editor, isOptionsVisible]);

  const { prev, next, left, right, apply } = useOptionsOperations({
    editorRef,
    context: interpolationContent,
    dropdownContext: {
      setActiveOptionHover,
      dropdownRef,
      variableMenuRef,
    },
    setTreeVisible,
    isInputDropdownOpen,
    applyNode,
  });

  // Press the up and down keys to switch the recommended items, and press Enter to fill in.
  useKeyboard(dropDownVisible, {
    ArrowUp: prev,
    ArrowDown: next,
    ArrowLeft: left,
    ArrowRight: right,
    Enter: apply,
  });

  // ESC Close
  useKeyboard(dropDownVisible, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Escape() {
      openMenu(false);
      setTreeVisible(false);
    },
  });
};
