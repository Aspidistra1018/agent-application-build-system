import { useGetSceneFlowRoleList } from '../../../hooks/use-get-scene-flow-params';
import { type SpeakerMessageSetValue } from './types';

export const useNormalizeValueWithRoleList = (
  remoteValue: Array<SpeakerMessageSetValue | undefined> | undefined,
) => {
  const { isLoading, data: roleList } = useGetSceneFlowRoleList();
  if (!remoteValue || isLoading) {
    return [];
  }

  return remoteValue.map(item => {
    // If there is no biz_role_id, it means it is a nickname variable and will not be processed here
    if (!item?.biz_role_id) {
      return item;
    }

    const role = roleList?.find(
      _role => _role.biz_role_id === item?.biz_role_id,
    );

    // If the corresponding role is not found, it means that it has been deleted, and it will not be processed here. The error prompt outside has expired.
    if (!role) {
      return item;
    }

    // If both the nickname saved by value and the character list are available, the character list shall prevail
    if (role?.nickname && item.nickname) {
      return {
        ...item,
        role: role.role,
        nickname: role.nickname,
      } as unknown as SpeakerMessageSetValue;
    }

    return item;
  });
};
