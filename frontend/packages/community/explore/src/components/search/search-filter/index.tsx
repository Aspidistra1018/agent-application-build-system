import React from 'react';

import { ProductEntityType } from '@coze-arch/bot-api/product_api';

import { PluginFilter, TemplateFilter } from './components';

export const SearchFilterComponent = (props: {
  entityType: ProductEntityType;
  isResponsive: boolean;
}) => {
  const { entityType } = props;

  switch (entityType) {
    case ProductEntityType.Plugin:
      return <PluginFilter />;
    case ProductEntityType.TemplateCommon:
      return <TemplateFilter />;
    default:
      return null;
  }
};
