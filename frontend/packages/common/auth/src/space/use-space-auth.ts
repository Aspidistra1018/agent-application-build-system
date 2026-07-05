import { useSpaceRole } from './use-space-role';
import { type ESpacePermisson } from './constants';
import { calcPermission } from './calc-permission';

export function useSpaceAuth(key: ESpacePermisson, spaceId: string) {
  // Get space role information
  const role = useSpaceRole(spaceId);
  // Calculate permission spot
  return calcPermission(key, role);
}
