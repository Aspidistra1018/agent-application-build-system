import { I18n } from '@coze-arch/i18n';

import { useCurrentDatabaseID, useCurrentDatabaseQuery } from '@/hooks';
import { useOpenDatabaseDetail } from '@/components/database-detail-modal';

import { Field, OverflowTagList } from '../../fields';

export function Database() {
  const databaseID = useCurrentDatabaseID();
  const { data: database } = useCurrentDatabaseQuery();
  const { openDatabaseDetail } = useOpenDatabaseDetail();

  const list = database
    ? [
        {
          icon: (
            <img
              src={database.iconUrl}
              className="w-[16px] h-[16px] rounded-mini"
            />
          ),
          // The operation and maintenance platform can directly display the ID, because the operation and maintenance platform cannot pull the actual database information.
          label: IS_BOT_OP ? databaseID : database.tableName,
        },
      ]
    : [];

  return (
    <Field
      label={I18n.t('workflow_database_node_database_table_title')}
      isEmpty={!database}
    >
      <div
        className="inline-flex cursor-pointer"
        onClick={() => openDatabaseDetail()}
      >
        <OverflowTagList value={list} />
      </div>
    </Field>
  );
}
