import { useNavigate } from 'react-router-dom';

import cls from 'classnames';
import { I18n } from '@coze-arch/i18n';
import { IconCozArrowRight } from '@coze-arch/coze-design/icons';
import { EVENT_NAMES, sendTeaEvent } from '@coze-arch/bot-tea';
import { Typography } from '@coze-arch/bot-semi';

import { useSearchInputStore } from '../../search-input-store';

import styles from './index.module.less';

interface RecommendItemProps {
  onSearch?: (word: string) => void;
}

export const RecommendMore = (props: RecommendItemProps) => {
  const { onSearch } = props;
  const navigate = useNavigate();

  const { inputValue, entityTypeIn } = useSearchInputStore();

  return (
    <div
      className={cls(styles.moreContainer)}
      onMouseDown={() => {
        sendTeaEvent(EVENT_NAMES.store_search_front, {
          search_word: inputValue,
          action: 'enter_search',
        });
        console.log('[dev] mousedown:', onSearch, inputValue, entityTypeIn);
        if (onSearch) {
          onSearch(
            `/search/${encodeURIComponent(
              inputValue,
            )}?entityType=${entityTypeIn}`,
          );
        } else {
          navigate(
            `/search/${encodeURIComponent(
              inputValue,
            )}?entityType=${entityTypeIn}`,
          );
        }
      }}
    >
      <Typography.Text className={styles.text} ellipsis={{ rows: 1 }}>
        {I18n.t('store_search_suggest_page', { query: inputValue })}
      </Typography.Text>
      <IconCozArrowRight className={styles.arrow} />
    </div>
  );
};
