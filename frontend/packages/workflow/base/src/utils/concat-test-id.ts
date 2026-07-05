import { type FlowNodeEntity } from '@flowgram-adapter/free-layout-editor';

import { NODE_TEST_ID_PREFIX } from '../constants';

export const concatTestId = (...testIds: string[]) =>
  testIds.filter(id => !!id).join('.');

/**
 * Generate the test ID of the node.
 * @example concatNodeTestId(node, 'right-panel') => playground.node.100001.right-panel
 * @param node
 * @param testIds other id
 * @returns
 */
export const concatNodeTestId = (node: FlowNodeEntity, ...testIds: string[]) =>
  concatTestId(
    node?.id ? concatTestId(NODE_TEST_ID_PREFIX, node.id) : '',
    ...testIds,
  );
