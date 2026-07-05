/**
 * Spatially dependent permission spot enumeration
 */
export enum ESpacePermisson {
  /**
   * update space
   */
  UpdateSpace,
  /**
   * delete space
   */
  DeleteSpace,
  /**
   * Add member
   */
  AddBotSpaceMember,
  /**
   * Remove space member
   */
  RemoveSpaceMember,
  /**
   * exit space
   */
  ExitSpace,
  /**
   * Transfer owner permissions
   */
  TransferSpace,
  /**
   * update member
   */
  UpdateSpaceMember,
  /**
   * Manage API-KEY
   */
  API,
}

/**
 * Spatial Role Enumeration
 */
export { SpaceRoleType } from '@coze-arch/idl/developer_api';
