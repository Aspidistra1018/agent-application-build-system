export interface SlardarConfig {
  sessionId?: string;
  [key: string]: unknown;
}

export type SlardarEvents =
  | 'captureException'
  | 'sendEvent'
  | 'sendLog'
  | 'context.set';

export interface Slardar {
  (event: string, params?: Record<string, unknown>): void;
  (
    event: 'captureException',
    error?: Error,
    meta?: Record<string, string>,
    reactInfo?: { version: string; componentStack: string },
  ): void;
  (
    event: 'sendEvent',
    params: {
      name: string;
      metrics: Record<string, number>;
      categories: Record<string, string>;
    },
  ): void;
  (
    event: 'sendLog',
    params: {
      level: string;
      content: string;
      extra: Record<string, string | number>;
    },
  ): void;
  (event: 'context.set', key: string, value: string): void;
  config: (() => SlardarConfig) & ((options: Partial<SlardarConfig>) => void);
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  off: (event: string, callback: (...args: unknown[]) => void) => void;
}

// The slardar instance types that can be used to constrain incoming
export type SlardarInstance = Slardar;

export type { Slardar as default };
