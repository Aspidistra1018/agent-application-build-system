import { I18n } from '@coze-arch/i18n';
import { UIToast } from '@coze-arch/bot-semi';

export const hasBraces = (str: string) => {
  const pattern = /{{/g;
  return pattern.test(str);
};
// Determine whether it is all environments or just release the environment restriction {{}} and pop up the toast prompt
export const verifyBracesAndToast = (str: string, isAll = false) => {
  if (isAll && hasBraces(str)) {
    UIToast.warning({
      showClose: false,
      content: I18n.t('bot_prompt_bracket_error'),
    });
    return false;
  }
  return true;
};
