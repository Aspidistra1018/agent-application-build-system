import { useWorkflowNode } from '@coze-workflow/base';
import { I18n } from '@coze-arch/i18n';

/**
 * Use the same useDataSetInfos as the knowledge list in the form.
 * useDataSetInfos will cache the data internally. When a new knowledge base is selected in the form, there is no need to resend the request to pull the data.
 */

import { useDataSetInfos } from '@/hooks';

import { OverflowTagList } from './overflow-tag-list';
import { Field } from './field';

export function Knowledge() {
  const { data } = useWorkflowNode();
  const knowledge = data?.inputs?.datasetParameters?.datasetParam ?? [];
  const { dataSets } = useDataSetInfos({ ids: knowledge });
  return (
    <Field
      label={I18n.t('workflow_detail_knowledge_knowledge')}
      isEmpty={knowledge.length === 0}
    >
      <OverflowTagList
        value={dataSets.map(d => ({
          // The operation and maintenance platform can directly display the ID, because the operation and maintenance platform cannot pull the actual knowledge base information.
          label: IS_BOT_OP ? d.dataset_id : d.name,
          icon: (
            <img className="w-[16px] h-[16px] rounded-mini" src={d.icon_url} />
          ),
        }))}
      />
    </Field>
  );
}
