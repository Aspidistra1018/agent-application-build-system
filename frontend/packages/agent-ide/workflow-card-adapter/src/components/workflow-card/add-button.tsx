import { AddButton as BaseAddButton } from '@coze-agent-ide/tool';
import { I18n } from '@coze-arch/i18n';

interface AddButtonProps {
  /** Click to create a workflow */
  onCreate: () => void;

  /** Click to import workflow */
  onImport: () => void;
}

export const AddButton = ({ onCreate, onImport }: AddButtonProps) => (
  <BaseAddButton
    tooltips={I18n.t('bot_edit_workflow_add_tooltip')}
    onClick={() => {
      onImport();
    }}
    enableAutoHidden={true}
    data-testid={'bot.editor.tool.workflow.add-button'}
  />
);
