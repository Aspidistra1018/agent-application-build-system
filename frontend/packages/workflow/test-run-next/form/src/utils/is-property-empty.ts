import { isObject } from 'lodash-es';

/**
 * Is it an empty property?
 */
export const isFormSchemaPropertyEmpty = (properties: unknown) =>
  isObject(properties) ? !Object.keys(properties).length : true;
