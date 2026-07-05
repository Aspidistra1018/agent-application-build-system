import { create } from 'zustand';
import { ProductEntityType } from '@coze-arch/bot-api/product_api';

import { type SearchFilter, type FilterConfig } from './type';
import {
  defaultEntityNumMap,
  defaultEntityFilterConfigMap,
  defaultEntitySearchFilterMap,
} from './config';

interface SearchStore {
  sortType: number;
  updateSortType: (type: number) => void;
  searchFilter: SearchFilter;
  isClear: boolean;
  setIsClear: (isClear: boolean) => void;
  updateSearchFilter: <T extends keyof SearchFilter>(
    entity: T,
    filter: SearchFilter[T],
  ) => void;
  resetSearchFilter: () => void;
  pageNum: number;
  updatePageNum: (num: number) => void;
  //entityType: ProductEntityType;
  //updateEntityType: (enityType: ProductEntityType) => void;
  totalCount: Partial<Record<ProductEntityType, number>>;
  updateTotalCount: (total: Partial<Record<ProductEntityType, number>>) => void;
  resetTotalCount: () => void;

  filterConfig: FilterConfig;
  setFilterConfig: <T extends keyof FilterConfig>(
    entityType: T,
    filterConfig: FilterConfig[T],
  ) => void;
}

const defaultData = {
  sortType: 0,
  isClear: true,
  searchFilter: {
    ...defaultEntitySearchFilterMap,
  },
  filterConfig: { ...defaultEntityFilterConfigMap },
  pageNum: 0,
  totalCount: {
    ...defaultEntityNumMap,
  },
};

export const useSearchStore = create<SearchStore>((set, get) => ({
  ...defaultData,
  updateSortType: (type: number) => {
    set({
      sortType: type,
    });
  },
  setFilterConfig: <T extends keyof FilterConfig>(
    entityType: T,
    filterConfig: FilterConfig[T],
  ) => {
    const currentConfig = get().filterConfig;
    set({
      filterConfig: {
        ...currentConfig,
        [entityType]: { ...currentConfig[entityType], ...filterConfig },
      },
    });
  },
  updateSearchFilter: <T extends keyof SearchFilter>(
    entity: T,
    filter: SearchFilter[T],
  ) => {
    const currentFilter = get().searchFilter;
    set({
      searchFilter: {
        ...currentFilter,
        [entity]: { ...currentFilter[entity], ...filter },
      },
    });
  },
  resetSearchFilter: () => {
    set({
      searchFilter: { ...defaultEntitySearchFilterMap },
    });
  },
  updatePageNum: (num: number) => {
    set({ pageNum: num });
  },
  /*updateEntityType: (entityType: ProductEntityType) => {
    set({ entityType });
  },
  */
  updateTotalCount: (total: Partial<Record<ProductEntityType, number>>) => {
    set({
      totalCount: {
        ...total,
        // 混排显示，bot 数量需要加上 project 数量
        [ProductEntityType.Bot]:
          (total[ProductEntityType.Bot] ?? 0) +
          (total[ProductEntityType.Project] ?? 0),
      },
    });
  },
  resetTotalCount: () => {
    set({
      totalCount: defaultData.totalCount,
    });
  },
  setIsClear: isClear => {
    set({
      isClear,
    });
  },
}));
