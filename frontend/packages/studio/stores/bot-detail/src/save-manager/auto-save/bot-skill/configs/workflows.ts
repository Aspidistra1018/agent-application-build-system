import { cloneDeep, uniqBy } from 'lodash-es';
import { DebounceTime, type HostedObserverConfig } from '@coze-studio/autosave';

import type { WorkFlowItemType } from '@/types/skill';
import { type BotSkillStore, useBotSkillStore } from '@/store/bot-skill';
import { ItemType } from '@/save-manager/types';

type RegisterWorkflows = HostedObserverConfig<
  BotSkillStore,
  ItemType,
  WorkFlowItemType[]
>;

export const workflowsConfig: RegisterWorkflows = {
  key: ItemType.WORKFLOW,
  selector: store => store.workflows,
  debounce: DebounceTime.Immediate,
  middleware: {
    onBeforeSave: (dataSource: WorkFlowItemType[]) => {
      const workflowsToBackend = cloneDeep(dataSource);

      const filterList = uniqBy(workflowsToBackend, 'workflow_id').map(v => {
        // Solve the problem of loading the icon due to the failure of the icon link and report an error. Do not save the plugin_icon of the invalid workflow here, but pull the latest valid icon link every time.
        v.plugin_icon = '';
        return v;
      });
      return {
        workflow_info_list: useBotSkillStore
          .getState()
          .transformVo2Dto.workflow(filterList),
      };
    },
  },
};
