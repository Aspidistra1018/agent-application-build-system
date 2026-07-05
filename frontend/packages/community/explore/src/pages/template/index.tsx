import { explore } from '@coze-studio/api-schema';
import {
  TemplateCard,
  type TemplateCardProps,
  TemplateCardSkeleton,
} from '@coze-community/components';
import { I18n } from '@coze-arch/i18n';

import { PageList } from '../../components/page-list';

export const TemplatePage = () => (
  <PageList
    title={
      <h2 className="leading-[72px] text-[20px] m-[0] pl-[24px] pr-[24px]">
        {I18n.t('template_name')}
      </h2>
    }
    getDataList={() => getTemplateData()}
    renderCard={data => <TemplateCard {...(data as TemplateCardProps)} />}
    renderCardSkeleton={() => <TemplateCardSkeleton />}
  />
);

const getTemplateData = async () => {
  const result = await explore.PublicGetProductList({
    entity_type: explore.product_common.ProductEntityType.TemplateCommon,
    sort_type: explore.product_common.SortType.Newest,
    page_num: 0,
    page_size: 1000,
  });
  return result.data?.products || [];
};
