import React from 'react';

import {
  PluginCard,
  type PluginCardProps,
  PluginCardSkeleton,
  TemplateCard,
  type TemplateCardProps,
  TemplateCardSkeleton,
} from '@coze-community/components';
import {
  ProductEntityType,
  type ProductInfo,
} from '@coze-arch/bot-api/product_api';

interface SearchCardProps {
  detail: ProductInfo;
  entityType: ProductEntityType;
  className?: string;
}

export const SearchCard = (props: SearchCardProps) => {
  const { detail, entityType, className } = props;

  switch (detail.meta_info.entity_type ?? entityType) {
    case ProductEntityType.Plugin:
    case ProductEntityType.SaasPlugin:
      return (
        <PluginCard {...(detail as PluginCardProps)} className={className} />
      );
    case ProductEntityType.BotTemplate:
    case ProductEntityType.ImageflowTemplateV2:
    case ProductEntityType.WorkflowTemplateV2:
    case ProductEntityType.ProjectTemplate:
    case ProductEntityType.TemplateCommon:
      return <TemplateCard {...(detail as TemplateCardProps)} />;
    default:
      return null;
  }
};

export const SearchSkeleton = (props: { entityType: ProductEntityType }) => {
  const { entityType } = props;

  switch (entityType) {
    case ProductEntityType.Plugin:
      return <PluginCardSkeleton />;
    case ProductEntityType.TemplateCommon:
      return <TemplateCardSkeleton />;
    default:
      return null;
  }
};
