// Introducing our test method

import { describe, expect, it, vi } from 'vitest';

import { getEnv } from '@/util/get-env';

describe('getEnv function', () => {
  it('should return "cn-boe" when not in production', () => {
    vi.stubGlobal('IS_PROD', undefined);
    // Do not set IS_PROD, default to non-production environment
    const env = getEnv();
    expect(env).toBe('cn-boe');
  });

  it('should return "cn-release" when in production, not overseas, and is release version', () => {
    vi.stubGlobal('IS_PROD', true); // Set to production environment
    vi.stubGlobal('IS_OVERSEA', false); // Not overseas.
    vi.stubGlobal('IS_RELEASE_VERSION', true); // Is the release version
    const env = getEnv();
    expect(env).toBe('cn-release');
  });

  it('should return "cn-inhouse" when in production, not overseas, and is not release version', () => {
    vi.stubGlobal('IS_PROD', true); // Set to production environment
    vi.stubGlobal('IS_OVERSEA', false); // Not overseas.
    vi.stubGlobal('IS_RELEASE_VERSION', false); // Not the release version
    const env = getEnv();
    expect(env).toBe('cn-inhouse');
  });

  it('should return "oversea-release" when in production, overseas, and is release version', () => {
    vi.stubGlobal('IS_PROD', true); // Set to production environment
    vi.stubGlobal('IS_OVERSEA', true); // Is overseas
    vi.stubGlobal('IS_RELEASE_VERSION', true); // Is the release version
    const env = getEnv();
    expect(env).toBe('oversea-release');
  });

  it('should return "oversea-inhouse" when in production, overseas, and is not release version', () => {
    vi.stubGlobal('IS_PROD', true); // Set to production environment
    vi.stubGlobal('IS_OVERSEA', true); // Is overseas
    vi.stubGlobal('IS_RELEASE_VERSION', false); // Not the release version
    const env = getEnv();
    expect(env).toBe('oversea-inhouse');
  });
});
