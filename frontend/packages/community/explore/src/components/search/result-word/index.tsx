import { useParams } from 'react-router-dom';
import React, { useMemo } from 'react';

import cls from 'classnames';
import { I18n } from '@coze-arch/i18n';
import { Typography, Space } from '@coze-arch/bot-semi';

import styles from './index.module.less';

interface ResultWordInterface {
  isMobile?: boolean;
}

export const ResultWord = (props: ResultWordInterface) => {
  const { isMobile = false } = props;
  const { word } = useParams();

  const queryWordShow = useMemo(() => {
    try {
      return decodeURIComponent(word ?? '');
    } catch (err) {
      return word;
    }
  }, [word]);
  return (
    <Space
      spacing={8}
      className={cls(styles.container, { [styles.isMobile]: isMobile })}
    >
      <Typography.Text className={styles.result} ellipsis={{ rows: 1 }}>
        {I18n.t('store_search_suggest_result', {
          query: queryWordShow,
        })}
      </Typography.Text>
    </Space>
  );
};
