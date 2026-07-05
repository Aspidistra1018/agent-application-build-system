import React, { useEffect } from 'react';

import { useShallow } from 'zustand/react/shallow';
import { I18n } from '@coze-arch/i18n';
import { Space } from '@coze-arch/coze-design';
import { ProductEntityType } from '@coze-arch/bot-api/product_api';
import { ProductApi } from '@coze-arch/bot-api';

import { OFFICIAL_VALUE } from '../../constant';
import { FilterGroupCheckbox, Divider } from '../../../filter-group';
// eslint-disable-next-line @coze-arch/no-deep-relative-import
import { useSearchStore } from '../../../../../pages/search/search-store';

import styles from './index.module.less';

export const TemplateFilter = () => {
  const {
    searchFilter,
    updateSearchFilter,
    setFilterConfig,
    filterConfig,
    setIsClear,
  } = useSearchStore(
    useShallow(state => ({
      updateSearchFilter: state.updateSearchFilter,
      searchFilter: state.searchFilter,
      setFilterConfig: state.setFilterConfig,
      filterConfig: state.filterConfig,
      setIsClear: state.setIsClear,
    })),
  );
  const categoryIds =
    filterConfig[ProductEntityType.TemplateCommon]?.categoryIds || [];

  // 获取分类筛选项
  useEffect(() => {
    if (categoryIds?.length > 0) {
      return;
    }
    (async () => {
      const res = await ProductApi.PublicGetProductCategoryList({
        entity_type: ProductEntityType.TemplateCommon,
      });

      setFilterConfig(ProductEntityType.TemplateCommon, {
        categoryIds: res?.data?.categories ?? [],
      });
    })();
  }, []);

  useEffect(() => {
    const isClear =
      !searchFilter[ProductEntityType.TemplateCommon].is_official &&
      (searchFilter[ProductEntityType.TemplateCommon].category_ids?.length ||
        0) === 0;

    setIsClear(isClear);
  }, [searchFilter]);

  return (
    <Space spacing={0} vertical className={styles.container}>
      <FilterGroupCheckbox
        title=""
        checkList={[
          {
            value: OFFICIAL_VALUE,
            text: I18n.t('template_search_filter_only'),
          },
        ]}
        onClick={value => {
          updateSearchFilter(ProductEntityType.TemplateCommon, {
            is_official: value.includes(OFFICIAL_VALUE) ? true : undefined, // false为非官方，undefined全部
          });
        }}
        value={
          searchFilter[ProductEntityType.TemplateCommon].is_official
            ? [OFFICIAL_VALUE]
            : []
        }
      />
      <Divider />
      <FilterGroupCheckbox
        title={I18n.t('store_search_category')}
        checkList={categoryIds.map(item => ({
          value: item.id ?? '',
          text: item.name ?? '',
        }))}
        onClick={categoryIn => {
          updateSearchFilter(ProductEntityType.TemplateCommon, {
            category_ids: categoryIn as string[],
          });
        }}
        value={searchFilter[ProductEntityType.TemplateCommon].category_ids}
      />
    </Space>
  );
};
