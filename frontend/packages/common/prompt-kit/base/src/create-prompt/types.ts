import { type ModalProps } from '@coze-arch/coze-design';

export interface PromptContextInfo {
  botId?: string;
  name?: string;
  description?: string;
  contextHistory?: string;
}

export interface PromptConfiguratorModalProps extends ModalProps {
  mode: 'create' | 'edit' | 'info';
  editId?: string;
  isPersonal?: boolean;
  spaceId: string;
  botId?: string;
  projectId?: string;
  workflowId?: string;
  defaultPrompt?: string;
  canEdit?: boolean;
  /** For event tracking: page source */
  source: string;
  enableDiff?: boolean;
  promptSectionConfig?: {
    /** Cue word text box placeholder */
    editorPlaceholder?: React.ReactNode;
    /** Cue action */
    editorActions?: React.ReactNode;
    /** Head actions */
    headerActions?: React.ReactNode;
    /** Cue text box active line placeholder */
    editorActiveLinePlaceholder?: React.ReactNode;
    /** Tip text box extensions */
    editorExtensions?: React.ReactNode;
  };
  /** outermost container slot */
  containerAppendSlot?: React.ReactNode;
  importPromptWhenEmpty?: string;
  getConversationId?: () => string | undefined;
  getPromptContextInfo?: () => PromptContextInfo;
  onUpdateSuccess?: (mode: 'create' | 'edit' | 'info', id?: string) => void;
  onDiff?: ({
    prompt,
    libraryId,
  }: {
    prompt: string;
    libraryId: string;
  }) => void;
}
