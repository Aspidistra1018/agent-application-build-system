import { type FC, useRef } from 'react';

import styles from './index.module.less';

export const Background: FC<{
  bgInfo?: {
    imgUrl: string;
    themeColor: string; // 背景颜色
  };
}> = props => {
  const targetRef = useRef(null);
  const { bgInfo } = props;

  if (!bgInfo || !bgInfo?.imgUrl) {
    return null;
  }
  const { themeColor = 'transparent', imgUrl } = bgInfo;

  return (
    <div
      ref={targetRef}
      className={styles['bg-image']}
      style={{
        backgroundColor: themeColor,
      }}
    >
      <div className={styles.mask} />
      <div className={styles['img-container']}>
        {imgUrl ? <img src={imgUrl} className={styles.img} /> : null}
      </div>
    </div>
  );
};
