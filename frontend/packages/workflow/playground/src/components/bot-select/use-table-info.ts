import { type BotTable, BotTableRWMode } from '@coze-arch/bot-api/memory';

import { transformBotInfo, useBotInfo } from './use-bot-info';

// In multiplayer mode, the product hopes that the front-end will display uuid & id. At present, these two fields will be filtered by the back-end. The front-end will supplement these two fields first, and the back-end will fully evaluate and then remove the filtering logic.
function addUidAndIdToBotFieldsIfIsUnlimitedReadWriteMode(
  tableInfo: BotTable[],
): BotTable[] {
  tableInfo.forEach(bot => {
    if (
      bot.rw_mode === BotTableRWMode.UnlimitedReadWrite &&
      (bot?.field_list?.length as number) > 0
    ) {
      ['id', 'uuid'].forEach(name => {
        const fieldExisted = !!bot.field_list?.find(
          field => field.name === name,
        );
        if (!fieldExisted) {
          bot.field_list?.unshift({ name });
        }
      });
    }
  });

  return tableInfo;
}

export const useTableInfo = (botID?: string) => {
  const { isLoading, botInfo } = useBotInfo(botID);
  let tableInfo: BotTable[] | undefined;
  tableInfo = transformBotInfo.database(botInfo);
  if (tableInfo) {
    tableInfo = addUidAndIdToBotFieldsIfIsUnlimitedReadWriteMode(tableInfo);
  }

  return { tableInfo, isLoading };
};
