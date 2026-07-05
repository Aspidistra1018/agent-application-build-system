import { type GrabNode } from '@coze-common/text-grab';
import { WriteableAppLifeCycleService } from '@coze-common/chat-area';

import {
  PublicEventNames,
  type GrabPluginBizContext,
} from '../../types/plugin-biz-context';

export class GrabAppLifeCycleService extends WriteableAppLifeCycleService<GrabPluginBizContext> {
  onBeforeDestroy(): void {
    const { unsubscribe, eventCenter, publicEventCenter, scene } =
      this.pluginInstance.pluginBizContext;

    // There are some problems with the Store history logic, which leads to the situation that destroy is called multiple times but not initialized. Instead of going through the following forced cleaning process, the component life cycle is destroyed.
    if (scene === 'store') {
      return;
    }

    unsubscribe();
    eventCenter.all.clear();
    publicEventCenter.all.clear();
  }
  onBeforeInitial(): void {
    const {
      publicEventCenter,
      grabPluginId: currentGrabPluginId,
      storeSet,
    } = this.pluginInstance.pluginBizContext;

    const { useQuoteStore } = storeSet;

    const { updateQuoteContent, updateQuoteVisible } = useQuoteStore.getState();

    publicEventCenter.on(
      PublicEventNames.UpdateQuote,
      ({
        grabPluginId,
        quote,
      }: {
        grabPluginId: string;
        quote: GrabNode[] | null;
      }) => {
        if (currentGrabPluginId !== grabPluginId) {
          return;
        }

        updateQuoteContent(quote);
        updateQuoteVisible(true);
      },
    );
  }
}
