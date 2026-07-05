import {
  useCurrentWidgetFromArea,
  LayoutPanelType,
} from '@coze-project-ide/client';

import { type ProjectIDEWidget } from '@/widgets/project-ide-widget';
import { type WidgetContext } from '@/context/widget-context';

/**
 * The widget context used to provide the current focus
 */
export const useActivateWidgetContext = (): WidgetContext => {
  const currentWidget = useCurrentWidgetFromArea(LayoutPanelType.MAIN_PANEL);
  return (currentWidget as ProjectIDEWidget)?.context;
};
