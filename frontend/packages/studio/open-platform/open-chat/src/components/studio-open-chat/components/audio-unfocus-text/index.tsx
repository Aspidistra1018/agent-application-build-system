import { I18n } from '@coze-arch/i18n';

import styles from './index.module.less';
export const AudioUnfocusText = () => (
  <div className={styles['unfocus-text']}>
    {I18n.t('chat_voice_input_need_focus')}
  </div>
);
