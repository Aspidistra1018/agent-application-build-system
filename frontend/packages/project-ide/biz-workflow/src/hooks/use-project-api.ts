import { useMemoizedFn } from 'ahooks';
import { type ProjectApi } from '@coze-workflow/playground';
import {
  useSendMessageEvent,
  useIDENavigate,
  useCurrentWidgetContext,
  useIDEGlobalContext,
} from '@coze-project-ide/framework';

/**
 * The ability to inject project APIs into workflow.
 * Note: non-responsive
 */
export const useProjectApi = () => {
  const { sendOpen } = useSendMessageEvent();
  const { widget: uiWidget } = useCurrentWidgetContext();
  const navigate = useIDENavigate();
  const ideGlobalContext = useIDEGlobalContext();

  const getProjectAPI = useMemoizedFn(() => {
    const api: ProjectApi = {
      navigate,
      ideGlobalStore: ideGlobalContext,
      setWidgetUIState: (status: string) => uiWidget.setUIState(status as any),
      sendMsgOpenWidget: sendOpen,
    };
    return api;
  });

  return getProjectAPI;
};
