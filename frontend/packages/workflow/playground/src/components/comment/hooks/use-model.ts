import { useEffect, useMemo } from 'react';

import { type FormModelV2 } from '@flowgram-adapter/free-layout-editor';
import { FlowNodeFormData } from '@flowgram-adapter/free-layout-editor';
import { useEntityFromContext } from '@flowgram-adapter/free-layout-editor';
import {
  useNodeRender,
  type WorkflowNodeEntity,
} from '@flowgram-adapter/free-layout-editor';

import { CommentEditorModel } from '../model';
import { CommentEditorFormField } from '../constant';
import {
  boldCommand,
  headingOneCommand,
  headingThreeCommand,
  headingTwoCommand,
  italicCommand,
  paragraphCommand,
  selectAllCommand,
  strikethroughCommand,
  underlineCommand,
  clearFormatBackspaceCommand,
  clearFormatEnterCommand,
  blockPrefixCommand,
} from '../commands';

const createModel = () =>
  new CommentEditorModel()
    .registerCommand(boldCommand)
    .registerCommand(italicCommand)
    .registerCommand(underlineCommand)
    .registerCommand(strikethroughCommand)
    .registerCommand(paragraphCommand)
    .registerCommand(headingOneCommand)
    .registerCommand(headingTwoCommand)
    .registerCommand(headingThreeCommand)
    .registerCommand(blockPrefixCommand)
    .registerCommand(selectAllCommand)
    .registerCommand(clearFormatEnterCommand)
    .registerCommand(clearFormatBackspaceCommand);

export const useModel = () => {
  const node = useEntityFromContext<WorkflowNodeEntity>();
  const { selected: focused } = useNodeRender();

  const formModel = node.getData(FlowNodeFormData).getFormModel<FormModelV2>();

  const model = useMemo(createModel, []);

  // Synchronized out-of-focus state
  useEffect(() => {
    if (focused) {
      return;
    }
    model.setFocus(focused);
  }, [focused, model]);

  // Synchronized form value initialization
  useEffect(() => {
    const value = formModel.getValueIn<string>(CommentEditorFormField.Note);
    model.setValue(value); // Set initial value
    model.selectEnd(); // Set the initialization cursor position
  }, [formModel, model]);

  // Synchronize form external value changes: undo/redo/synergy
  useEffect(() => {
    const disposer = formModel.onFormValuesChange(({ name }) => {
      if (name !== CommentEditorFormField.Note) {
        return;
      }
      const value = formModel.getValueIn<string>(CommentEditorFormField.Note);
      model.setValue(value);
    });
    return () => disposer.dispose();
  }, [formModel, model]);

  return model;
};
