import { useState } from 'react';

import queryString from 'query-string';
import { useLoggedIn } from '@coze-arch/bot-hooks';
import { ProductEntityType } from '@coze-arch/bot-api/product_api';

import { type ValidEntityType } from '../pages/search/type';
import { getAllowEntitySortList } from '../pages/search/config';
export const useEntityType = (): {
  entityType: ValidEntityType;
  setEntityType: (entityType: ValidEntityType) => void;
} => {
  const isLogin = useLoggedIn();

  const [entityTypeDefaylt] = useState(() => {
    const queryParam = queryString.parse(location.search);
    const entityTypeParam =
      Number(queryParam.entityType as unknown as string) ||
      ProductEntityType.SaasPlugin;

    const allowEntityType = getAllowEntitySortList({
      isLogin,
    });
    if (allowEntityType.includes(entityTypeParam)) {
      return entityTypeParam;
    }
    return ProductEntityType.SaasPlugin;
  });
  const [entityType, setEntityType] = useState(entityTypeDefaylt);
  return {
    entityType,
    setEntityType,
  };
};
