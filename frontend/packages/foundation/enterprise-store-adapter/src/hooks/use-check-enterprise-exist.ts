/**
 * The @file open-source version does not provide enterprise management functions for the time being. The methods exported in this file are for future expansion.
 */

import { useCallback } from 'react';

import { useShallow } from 'zustand/react/shallow';

import { useEnterpriseStore } from '../stores/enterprise';
export const useCheckEnterpriseExist = () => {
  const { isEnterpriseExist } = useEnterpriseStore(
    useShallow(store => ({
      isEnterpriseExist: store.isEnterpriseExist,
    })),
  );
  const checkEnterpriseExist = useCallback(() => {
    console.log('checkEnterpriseExist');
  }, []);

  return {
    checkEnterpriseExist,
    checkEnterpriseExistLoading: false,
    isEnterpriseExist,
  };
};
