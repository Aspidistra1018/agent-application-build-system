import { type FabricObject } from 'fabric';

export const REF_VARIABLE_ID_PREFIX = 'variable';

export interface FabricObjectSchema extends CustomFabricProps {
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  textAlign?: TextAlign;
  width?: number;
  height?: number;
  lineHeight?: number;
  text?: string;
  /**
   * image link
   */
  src?: string;
  objects?: FabricObjectSchema[];
}

export interface VariableRef {
  variableId: string;
  objectId: string;
  variableName: string;
}
export interface FabricSchema extends FabricObjectSchema {
  width: number;
  height: number;
  background: string;
  objects: FabricObjectSchema[];
  customVariableRefs: VariableRef[];
}

/**
 * Why not use FabricObject.type?
 * Because fabricSchema.type does not match fabricObject.type
 * Eg: Textbox is a textbox in the schema, and a Textbox after instantiation
 */
export enum Mode {
  INLINE_TEXT = 'inline_text',
  BLOCK_TEXT = 'block_text',
  RECT = 'rect',
  TRIANGLE = 'triangle',
  CIRCLE = 'ellipse',
  STRAIGHT_LINE = 'straight_line',
  PENCIL = 'pencil',
  IMAGE = 'img',
  GROUP = 'group',
}

/**
 * Fill and Stroke
 */
export enum ColorMode {
  FILL = 'fill',
  STROKE = 'stroke',
}

/**
 * text alignment
 */
export enum TextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  JUSTIFY = 'justify',
}
/**
 * Image filling method
 */
export enum ImageFixedType {
  AUTO = 'auto',
  FILL = 'fill',
  FULL = 'full',
}

export interface CustomFabricProps {
  customType: Mode;
  customId: string;
  customFixedHeight?: number;
  customFixedType?: ImageFixedType;
  /** @deprecated compatible history, no new consumption */
  customVariableName?: string;
  [k: string]: unknown;
}

export interface FabricObjectWithCustomProps
  extends FabricObject,
    CustomFabricProps {}

export const UNKNOWN_VARIABLE_NAME = '__unknown__';
