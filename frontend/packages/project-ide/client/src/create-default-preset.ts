import { bindContributions } from '@flowgram-adapter/common';
import { createHistoryPlugin } from '@flowgram-adapter/common';
import {
  createViewPlugin,
  createContextMenuPlugin,
} from '@coze-project-ide/view';
import {
  OpenHandler,
  createEventPlugin,
  createPreferencesPlugin,
  CommandContribution,
  createCommandPlugin,
  createResourcePlugin,
  createStylesPlugin,
  type PluginsProvider,
  type Plugin,
  createShortcutsPlugin,
  createLifecyclePlugin,
  LifecycleContribution,
  createNavigationPlugin,
  createLabelPlugin,
} from '@coze-project-ide/core';

import { type IDEClientOptions, type IDEClientContext } from './types';
import { ClientDefaultContribution } from './contributions/client-default-contribution';

export function createDefaultPreset<CTX extends IDEClientContext>(
  optionsProvider: (ctx: CTX) => IDEClientOptions,
): PluginsProvider<CTX> {
  return (ctx: CTX) => {
    const opts = optionsProvider(ctx);
    const plugins: Plugin[] = [];
    /**
     * Register built-in plugins
     */
    plugins.push(
      createResourcePlugin(opts.resource || {}), // resource system
      createViewPlugin(
        opts.view || {
          widgetFactories: [],
          defaultLayoutData: {
            activityBarItems: [],
            defaultWidgets: [],
          },
        },
      ), // layout system
      // Breaking change: bw additionally introduced from the business side
      createNavigationPlugin(opts.navigation || {}),
      createCommandPlugin(opts.command || {}), // Instruction registration
      createHistoryPlugin(opts.history || {}), // historical registration
      createLifecyclePlugin(opts), // IDE Lifecycle Registration
      createLabelPlugin(opts.label || {}), // label registration
      createShortcutsPlugin(opts.shortcut || {}), // shortcut
      createPreferencesPlugin(opts.preferences || {}), // preferences
      createStylesPlugin({}),
      createContextMenuPlugin(), // Right-click menu to register
      createEventPlugin(), // global event registration
    );
    /**
     * client extension
     */
    plugins.push(
      createLifecyclePlugin({
        onBind({ bind }) {
          bindContributions(bind, ClientDefaultContribution, [
            CommandContribution,
            LifecycleContribution,
          ]);
          if (opts.openHandlers) {
            opts.openHandlers.forEach(handler => {
              if (typeof handler === 'function') {
                bind(handler).toSelf().inSingletonScope();
                bind(OpenHandler).toService(handler);
              } else {
                bind(OpenHandler).toConstantValue(handler);
              }
            });
          }
        },
      }),
    );
    /**
     * Register plugins for business extensions
     */
    if (opts.plugins) {
      plugins.push(...opts.plugins);
    }
    return plugins;
  };
}
