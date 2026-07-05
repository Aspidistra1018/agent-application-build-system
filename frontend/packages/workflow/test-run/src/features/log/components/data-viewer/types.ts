/*******************************************************************************
 * Log related types
 */
/** The possible states of a line */
export enum LineStatus {
  /** Completely hidden, the last parent attribute nested child attribute will not be wired in the same column */
  Hidden,
  /** Full display, appearing only on adjacent lines of properties */
  Visible,
  /** Semi-display, non-adjacent lines */
  Half,
  /** Adjacent line of last property */
  Last,
}

/** Possible values in JsonViewer */
export type JsonValueType =
  | string
  | null
  | number
  | object
  | boolean
  | undefined;

export interface Field {
  /** The use of arrays instead of'a.b.c 'is due to the possibility that key =' a.b 'will generate false nesting */
  path: string[];
  lines: LineStatus[];
  /** Here value can be any value, here is an incomplete enumeration */
  value: JsonValueType;
  children: Field[];
  /** Whether it is a drillable object (containing an array) */
  isObj: boolean;
}
