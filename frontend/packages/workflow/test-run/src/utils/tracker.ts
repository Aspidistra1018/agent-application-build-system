import { nanoid } from 'nanoid';

export type ExtraType = Record<string, any>;

/**
 * cache type
 */
export interface CacheMapType {
  start: number;
  disabled: boolean;
  extra?: ExtraType;
}

export class Tracker {
  cache = new Map<string, CacheMapType>();

  start(extra?: ExtraType) {
    const key = nanoid();
    const start = performance.now();
    const prev = this.cache.get(key);
    const value = {
      start,
      extra,
      // If it already exists, permanently disable the event reporting
      disabled: !!prev,
    };
    this.cache.set(key, value);
    return key;
  }
  end(key: string): null | (CacheMapType & { duration: number }) {
    const prev = this.cache.get(key);
    if (!prev || prev.disabled) {
      return null;
    }
    const duration = performance.now() - prev.start;
    // Successfully report the reset status and wait for the next report.
    this.cache.delete(key);
    return { ...prev, duration };
  }
}
