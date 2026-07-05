import React from 'react';

import styles from './index.module.less';

// The demo environment self-draws cross-hair, and the formal environment uses IconAdd.
export default function CrossHair(): JSX.Element {
  return (
    <div className={styles.symbol}>
      <div className={styles.crossHair} />
    </div>
  );
}
