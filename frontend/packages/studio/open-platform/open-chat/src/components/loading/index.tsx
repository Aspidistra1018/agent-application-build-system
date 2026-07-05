import { Spin } from '@coze-arch/coze-design';

import styles from './index.module.less';

export const Loading = () => (
  <div className={styles.loading}>
    <Spin size="large" />
  </div>
);
