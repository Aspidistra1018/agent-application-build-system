import { cloneDeep } from 'lodash-es';
import { DebounceTime, type HostedObserverConfig } from '@coze-studio/autosave';

import type { EnabledPluginApi } from '@/types/skill';
import { type BotSkillStore, useBotSkillStore } from '@/store/bot-skill';
import { ItemType } from '@/save-manager/types';

type RegisterSystemContent = HostedObserverConfig<
  BotSkillStore,
  ItemType,
  EnabledPluginApi[]
>;

export const pluginConfig: RegisterSystemContent = {
  key: ItemType.APIINFO,
  selector: store => store.pluginApis,
  debounce: DebounceTime.Immediate,
  middleware: {
    onBeforeSave: dataSource => {
      // You must clone deeply first. Processing the original data will change the value of the store.
      const clonePluginApis = cloneDeep(dataSource);

      const newPluginApis = clonePluginApis.map(item => {
        // AI generated animation only takes effect once, deleted when requesting an interface
        delete item.autoAddCss;
        return item;
      });
      return {
        plugin_info_list: useBotSkillStore
          .getState()
          .transformVo2Dto.plugin(newPluginApis),
      };
    },
  },
};
