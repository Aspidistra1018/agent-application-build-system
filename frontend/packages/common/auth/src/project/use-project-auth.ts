import { useSpace } from '@coze-arch/foundation-sdk';

import { useSpaceRole } from '../space/use-space-role';
import { useProjectRole } from './use-project-role';
import { type EProjectPermission } from './constants';
import { calcPermission } from './calc-permission';

export function useProjectAuth(
  key: EProjectPermission,
  projectId: string,
  spaceId: string,
) {
  // Get space type information
  const space = useSpace(spaceId);

  if (!space?.space_type) {
    throw new Error(
      'useSpaceAuth must be used after space list has been pulled.',
    );
  }

  // Get space role information
  const spaceRoles = useSpaceRole(spaceId);

  // Get project role information
  const projectRoles = useProjectRole(projectId);

  // Calculate permission spot
  return calcPermission(key, {
    projectRoles,
    spaceRoles,
    spaceType: space.space_type,
  });
}
