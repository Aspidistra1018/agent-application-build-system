import cronstrue from 'cronstrue/i18n';
import { I18n } from '@coze-arch/i18n';

const langMap = {
  // Simplified Chinese
  'zh-CN': 'zh_CN',
  zh: 'zh-CN',
  // Traditional Chinese
  zh_TW: 'zh_TW',
  // English
  'en-US': 'en',
  en: 'en',
  // Japanese
  'ja-JP': 'ja',
  ja: 'ja',
  // Korean
  'ko-KR': 'ko',
  ko: 'ko',
  // French
  'fr-FR': 'fr',
  fr: 'fr',
  // German
  'de-DE': 'de',
  de: 'de',
  // Italian
  'it-IT': 'it',
  it: 'it',
  // Spanish
  'es-ES': 'es',
  es: 'es',
};

// Verify translation results using cronjob
export const isCronJobVerify = cronJob => {
  // Only 6-bit cronjobs are supported (backend limit).
  const parts = cronJob?.split(' ');
  if (parts?.length !== 6) {
    return false;
  }
  try {
    const rs = cronstrue.toString(cronJob, {
      locale: langMap['zh-CN'],
      throwExceptionOnParseError: true,
    });

    // Extra check if the string contains null undefined
    // 1 2 3 31 1- 1 at 03:02:01 am, limited to the 31st of each month, or for Monday, January to undefined
    // 1 2 3 31 1 1 #6 at 03:02:01 am, limited to the 31st of each month, limited to null Mondays of each month, only in January
    if (rs.includes('null') || rs.includes('undefined')) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const cronJobTranslator = (
  cronJob?: string,
  errorMsg?: string,
): string => {
  if (!cronJob) {
    return '';
  }
  const lang = I18n.getLanguages();

  if (isCronJobVerify(cronJob)) {
    return cronstrue.toString(cronJob, {
      locale: langMap[lang[0]] ?? langMap['zh-CN'],
      use24HourTimeFormat: true,
    });
  }
  return (
    errorMsg ??
    I18n.t('workflow_trigger_param_unvalid_cron', {}, '参数为非法 cron 表达式')
  );
};
