import { type ProductShowFrontParams } from '@coze-arch/bot-tea';
import {
  ProductEntityType,
  type ProductMetaInfo,
} from '@coze-arch/bot-api/product_api';

const entityIdKeyMap = {
  [ProductEntityType.Bot]: 'bot_id',
  [ProductEntityType.Project]: 'project_id',
  [ProductEntityType.Plugin]: 'plugin_id',
} satisfies Partial<Record<ProductEntityType, keyof ProductShowFrontParams>>;

const entityTypeMap = {
  [ProductEntityType.Bot]: 'bot',
  [ProductEntityType.Project]: 'project',
  [ProductEntityType.Plugin]: 'plugin',
} satisfies Partial<
  Record<ProductEntityType, ProductShowFrontParams['entity_type']>
>;

export const getProductShowFrontCommonParams = (metaInfo: ProductMetaInfo) => {
  const entityIdKey =
    entityIdKeyMap[metaInfo.entity_type ?? ProductEntityType.Bot];
  const entityType =
    entityTypeMap[metaInfo.entity_type ?? ProductEntityType.Bot];

  return {
    product_id: metaInfo.id ?? '',
    product_name: metaInfo.name ?? '',
    ...(entityIdKey
      ? {
          [entityIdKey]: metaInfo.entity_id,
        }
      : {}),
    entity_type: entityType ?? 'bot',
  } satisfies Partial<ProductShowFrontParams>;
};
