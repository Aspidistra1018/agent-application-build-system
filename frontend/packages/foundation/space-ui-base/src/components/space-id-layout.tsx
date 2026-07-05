import { Outlet, useParams } from 'react-router-dom';

import { useDestorySpace } from '@coze-common/auth';
import { useInitSpaceRole } from '@coze-common/auth-adapter';

const SpaceIdContainer = ({ spaceId }: { spaceId: string }) => {
  // When the space component is destroyed, empty the corresponding space data
  useDestorySpace(spaceId);

  // Initialize spatial permission data
  const isCompleted = useInitSpaceRole(spaceId);

  // isCompleted, the judgment condition is very important to ensure that the permission data of the space can be obtained in the Space space.
  return isCompleted ? <Outlet /> : null;
};

export const SpaceIdLayout = () => {
  const { space_id: spaceId } = useParams<{
    space_id: string;
  }>();

  return spaceId ? <SpaceIdContainer key={spaceId} spaceId={spaceId} /> : null;
};
