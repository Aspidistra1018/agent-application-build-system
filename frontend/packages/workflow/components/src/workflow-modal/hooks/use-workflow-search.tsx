import React, { useContext } from 'react';

import { useDebounceFn } from 'ahooks';
import { UISearch } from '@coze-studio/components';
import { SortType } from '@coze-arch/idl/product_api';
import { I18n } from '@coze-arch/i18n';

import WorkflowModalContext from '../workflow-modal-context';
import { DataSourceType, type WorkflowModalState } from '../type';

export function useWorkflowSearch() {
  const context = useContext(WorkflowModalContext);
  const { run: debounceChangeSearch, cancel } = useDebounceFn(
    (search: string) => {
      /** Search maximum number of characters */
      const maxCount = 100;
      if (search.length > maxCount) {
        updateSearchQuery(search.substring(0, maxCount));
      } else {
        updateSearchQuery(search);
      }
    },
    { wait: 300 },
  );

  if (!context) {
    return null;
  }

  const { dataSourceType, query, isSpaceWorkflow, sortType } =
    context.modalState;

  const updateSearchQuery = (search?: string) => {
    const newState: Partial<WorkflowModalState> = { query: search ?? '' };
    if (dataSourceType === DataSourceType.Workflow) {
      // If there are tags when searching, reset all
      newState.workflowTag = isSpaceWorkflow ? 0 : 1;
      newState.sortType = undefined;
    }

    if (dataSourceType === DataSourceType.Product) {
      if (!search && sortType === SortType.Relative) {
        newState.sortType = SortType.Heat;
      }
      if (search && !context.modalState.query) {
        newState.sortType = newState.sortType = SortType.Relative;
      }
    }

    context.updateModalState(newState);
  };
  return (
    <UISearch
      tabIndex={-1}
      value={query}
      placeholder={I18n.t('workflow_add_search_placeholder')}
      data-testid="workflow.modal.search"
      onSearch={search => {
        if (!search) {
          // If the search is empty, update the query immediately
          cancel();
          updateSearchQuery('');
        } else {
          // If search has a value, then anti-shake update
          debounceChangeSearch(search);
        }
      }}
    />
  );
}
