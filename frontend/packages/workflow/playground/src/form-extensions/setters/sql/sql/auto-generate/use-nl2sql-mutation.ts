import { useMutation, type DefaultError } from '@tanstack/react-query';
import { MemoryApi } from '@coze-arch/bot-api';

import { useCurrentDatabaseID } from '@/hooks';

export const useNl2SqlMutation = () => {
  const databaseID = useCurrentDatabaseID();
  const {
    data: sql,
    mutate: nl2sql,
    isPending: isFetching,
  } = useMutation<string, DefaultError, { text: string }>({
    mutationFn: async ({ text }) => {
      const data = await MemoryApi.GetNL2SQL({
        // There is a problem with the back-end interface definition bot_id must be passed, but it is not actually needed. Communicate with the back-end and pass 0 processing here.
        bot_id: 0,
        database_id: databaseID,
        text,
        table_type: 1,
      });
      return data.sql;
    },
  });

  return {
    sql,
    nl2sql,
    isFetching,
  };
};
