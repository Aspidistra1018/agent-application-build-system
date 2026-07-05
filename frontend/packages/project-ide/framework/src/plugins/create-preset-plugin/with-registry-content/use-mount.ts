/**
 * True mount timing of cgroup pieces
 */
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';

import { isFunction } from 'lodash-es';

import { type ProjectIDEWidget } from '@/widgets/project-ide-widget';
import { type RegistryHandler } from '@/types';

export const useMount = (
  registry: RegistryHandler,
  widget: ProjectIDEWidget,
) => {
  /**
   * Is it already mounted?
   */
  const [mounted, setMounted] = useState(widget.isVisible);
  const [version, setVersion] = useState(0);
  const mountedRef = useRef(widget.isVisible);

  /**
   * Is it loaded?
   */
  const [loaded, setLoaded] = useState(!registry.load);

  /**
   * renderContent function result cache
   * Since the registry and widget are essentially unchanged, it is guaranteed that the renderContent function will only run once within the same widget
   * Unless the WidgetComp component is uninstalled =. =
   */
  const content = useMemo(() => {
    if (!isFunction(registry.renderContent)) {
      return null;
    }

    return registry.renderContent(widget.context, widget);
  }, [registry, widget, version]);

  /**
   * Support registry definition load function
   */
  const load = useCallback(async () => {
    if (!registry.load || !isFunction(registry.load)) {
      return;
    }
    await registry.load(widget.context);
    setLoaded(true);
  }, [registry, widget, setLoaded]);

  /**
   * Monitor the display hidden state of the widget. If the widget is displayed and not mounted, you need to actively mount it once.
   */
  const watchWidgetStatus = useCallback(
    (w: ProjectIDEWidget) => {
      const { isVisible } = w;
      if (isVisible && !mountedRef.current) {
        setMounted(true);
        mountedRef.current = true;
      }
      return w.onDidChangeVisibility(visible => {
        if (visible && !mountedRef.current) {
          setMounted(true);
          mountedRef.current = true;
        }
      });
    },
    [setMounted, mountedRef],
  );

  /**
   * Listeners can be mounted earlier to avoid multiple renders
   */
  useLayoutEffect(() => {
    const dispose = watchWidgetStatus(widget);
    const disposeRefresh = widget.onRefresh(() => {
      setVersion(prev => prev + 1);
    });
    return () => {
      dispose.dispose();
      disposeRefresh.dispose();
    };
  }, [widget, watchWidgetStatus]);

  /**
   * There is no special design for loading function timing, so keep it consistent with historical logic
   */
  useEffect(() => {
    load();
  }, [load]);

  return {
    loaded,
    mounted,
    content,
  };
};
