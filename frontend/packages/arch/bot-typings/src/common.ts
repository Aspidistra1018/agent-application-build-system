/** Bot details page source: currently only bot and explore list */
export enum BotPageFromEnum {
  Bot = 'bot', //bot list
  Explore = 'explore', //Explore List
  Store = 'store',
  Template = 'template',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- had to any
export type Obj = Record<string, any>;

/**
 * Show the full type
 *
 * @example
 * type Intersection = { a: string } & { b: number };
 * type Result = Expand<Intersection>;
 * // Result: { a: string; b: number }
 */
export type Expand<T extends Obj> = T extends infer U
  ? { [K in keyof U]: U[K] }
  : never;

/**
 * Required only for specific fields, often used to correct server level type declaration errors
 *
 * @example
 * interface Agent {
 *  id?: string;
 *  name?: string;
 *  desc?: string
 * }
 * type Result = PartialRequired<Agent, 'id' | 'name'>;
 */
export type PartialRequired<T extends Obj, K extends keyof T> = Expand<
  {
    [P in K]-?: T[P];
  } & Pick<T, Exclude<keyof T, K>>
>;
