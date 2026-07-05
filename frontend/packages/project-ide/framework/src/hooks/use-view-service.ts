import { type ViewService } from '@/plugins/create-preset-plugin/view-service';

import { useProjectIDEServices } from './use-project-ide-services';

/**
 * Get all view operations of Project IDE
 */
export const useViewService = (): ViewService => {
  const projectIDEServices = useProjectIDEServices();
  return projectIDEServices.view;
};
