/* eslint-disable @typescript-eslint/no-explicit-any */
/*******************************************************************************
 * Test form related types
 */

import type { CSSProperties } from 'react';

import type { TestFormType } from '../constants';

export type TestFormField = any;
/**
 * Run the test run required test form schema
 */
export interface TestFormSchema {
  /**
   * Start Node ID
   * A single node runs for the node id.
   * Full run as start node id
   */
  id: string;

  /**
   * Type of form
   */
  type: TestFormType;
  /** form model */
  mode?: 'form' | 'json';
  /**
   * Render the form schema
   */
  fields: TestFormField[];
}

export type FormDataType = any;

/**
 * Common props for testing formed materials
 */
export interface ComponentAdapterCommonProps<T> {
  value: T;
  style?: CSSProperties;
  onChange?: (v?: T) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export interface TestFormDefaultValue {
  input?: Record<string, string>;
  batch?: Record<string, string>;
  bot_id?: string;
  // Null indicates the whole process
  node_id?: string;
}
