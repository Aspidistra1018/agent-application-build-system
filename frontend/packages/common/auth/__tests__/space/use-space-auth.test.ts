import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { SpaceRoleType } from '@coze-arch/idl/developer_api';

import { ESpacePermisson } from '../../src/space/constants';

// Simulation useSpaceRole
vi.mock('../../src/space/use-space-role', () => ({
  useSpaceRole: vi.fn(),
}));

// simulated calcPermission
vi.mock('../../src/space/calc-permission', () => ({
  calcPermission: vi.fn(),
}));

import { useSpaceRole } from '../../src/space/use-space-role';
import { calcPermission } from '../../src/space/calc-permission';
import { useSpaceAuth } from '../../src/space/use-space-auth';

describe('useSpaceAuth', () => {
  it('应该使用 useSpaceRole 获取角色并调用 calcPermission 计算权限', () => {
    const spaceId = 'test-space-id';
    const permissionKey = ESpacePermisson.UpdateSpace;
    const mockRoles = [SpaceRoleType.Owner];

    // Simulate useSpaceRole return role
    (useSpaceRole as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockRoles,
    );

    // Simulate calcPermission return permission result
    (calcPermission as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      true,
    );

    // Render hook
    const { result } = renderHook(() => useSpaceAuth(permissionKey, spaceId));

    // Verify that useSpaceRole is called, passing in the correct spaceId.
    expect(useSpaceRole).toHaveBeenCalledWith(spaceId);

    // Verify that calcPermission is called, passing in the correct parameters
    expect(calcPermission).toHaveBeenCalledWith(permissionKey, mockRoles);

    // Verify that the return value is consistent with the return value of calcPermission
    expect(result.current).toBe(true);
  });

  it('应该在没有权限时返回 false', () => {
    const spaceId = 'test-space-id';
    const permissionKey = ESpacePermisson.UpdateSpace;
    const mockRoles = [SpaceRoleType.Member];

    // Simulate useSpaceRole return role
    (useSpaceRole as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockRoles,
    );

    // Simulate calcPermission return permission result
    (calcPermission as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      false,
    );

    // Render hook
    const { result } = renderHook(() => useSpaceAuth(permissionKey, spaceId));

    // Verify that the return value is consistent with the return value of calcPermission
    expect(result.current).toBe(false);
  });

  it('应该在角色为空数组时返回 false', () => {
    const spaceId = 'test-space-id';
    const permissionKey = ESpacePermisson.UpdateSpace;
    const mockRoles: SpaceRoleType[] = [];

    // Simulate useSpaceRole returns an empty character array
    (useSpaceRole as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockRoles,
    );

    // Simulate calcPermission return permission result
    (calcPermission as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      false,
    );

    // Render hook
    const { result } = renderHook(() => useSpaceAuth(permissionKey, spaceId));

    // Verify that calcPermission is called, passing in the correct parameters
    expect(calcPermission).toHaveBeenCalledWith(permissionKey, mockRoles);

    // Verify that the return value is consistent with the return value of calcPermission
    expect(result.current).toBe(false);
  });
});
