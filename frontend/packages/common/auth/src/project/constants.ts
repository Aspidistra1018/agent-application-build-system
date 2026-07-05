// TODO: replace with idl exported by Project interface
export enum ProjectRoleType {
  Owner = 'owner',
  Editor = 'editor',
}

export enum EProjectPermission {
  /**
   * Visit/view projects
   */
  View,
  /**
   * Edit project basic information
   */
  EDIT_INFO,
  /**
   * Delete project
   */
  DELETE,
  /**
   * Publish project
   */
  PUBLISH,
  /**
   * Create project resources
   */
  CREATE_RESOURCE,
  /**
   * Copy resources within the project
   */
  COPY_RESOURCE,
  /**
   * Copy project/create copy
   */
  COPY,
  /**
   * Practice running plugins
   */
  TEST_RUN_PLUGIN,
  /**
   * Practice running workflow
   */
  TEST_RUN_WORKFLOW,
  /**
   * Add project collaborators
   */
  ADD_COLLABORATOR,
  /**
   * Delete project collaborator
   */
  DELETE_COLLABORATOR,
  /**
   * Roll back the APP version
   */
  ROLLBACK,
}
