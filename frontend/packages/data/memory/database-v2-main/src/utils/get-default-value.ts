import { format } from 'date-fns';
import { FieldItemType } from '@coze-arch/bot-api/memory';

export const getDefaultValue = (type: FieldItemType) => {
  if (type === FieldItemType.Boolean) {
    return false;
  } else if ([FieldItemType.Number, FieldItemType.Float].includes(type)) {
    return 0;
  } else if (type === FieldItemType.Text) {
    return '';
  } else if (type === FieldItemType.Date) {
    // TODO: @liushuoyan There may be a time zone problem here, please pay attention when joint debugging
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  } else {
    return undefined;
  }
};
