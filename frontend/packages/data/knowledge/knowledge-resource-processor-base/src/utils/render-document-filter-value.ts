import { I18n } from '@coze-arch/i18n';

import {
  type FilterPageConfig,
  type PDFDocumentFilterValue,
} from '@/features/knowledge-type/text/interface';

export const getSortedFilterPages = (filterPagesConfig: FilterPageConfig[]) =>
  filterPagesConfig
    .filter(config => config.isFilter)
    .map(config => config.pageIndex)
    .sort((prev, after) => prev - after);

export const getFilterPagesString = (pages: number[]) => pages.join(' / ');

/**
 * Render as the following example:
 * Paper 1: Filter page 2/4/6; set page local filtering
 * Paper 2: Filtering Page 1...
 */
export const renderDocumentFilterValue = ({
  filterValue,
  pdfList,
}: {
  filterValue: PDFDocumentFilterValue[];
  pdfList: { name: string; uri: string }[];
}) =>
  filterValue
    .map(value => {
      const pdf = pdfList.find(item => item.uri === value.uri);
      if (!pdf) {
        return null;
      }

      const filterPages = getSortedFilterPages(value.filterPagesConfig);

      if (!filterPages.length) {
        return null;
      }
      const filterPagesString = getFilterPagesString(filterPages);
      return `${pdf.name}: ${I18n.t('data_filter_values', {
        filterPages: filterPagesString,
      })}`;
    })
    .filter((filterString): filterString is string => Boolean(filterString))
    .join('\n');
