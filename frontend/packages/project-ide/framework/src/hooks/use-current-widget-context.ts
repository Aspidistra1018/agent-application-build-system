import { useCurrentWidget } from '@coze-project-ide/client';

import { type ProjectIDEWidget } from '@/widgets/project-ide-widget';

import { type WidgetContext } from '../context/widget-context';

/**
 * Get the current WidgetContext
 * Called within the registry's renderContent
 */
export function useCurrentWidgetContext<T>(): WidgetContext<T> {
  const currentWidget = useCurrentWidget() as ProjectIDEWidget;
  if (!currentWidget.context) {
    throw new Error(
      '[useWidgetContext] Undefined widgetContext from ide context',
    );
  }
  return currentWidget.context as WidgetContext<T>;
}
