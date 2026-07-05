import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { useLineClamp } from '../src/use-line-clamp';

describe('useLineClamp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return contentRef and isClamped', () => {
    const { result } = renderHook(() => useLineClamp());

    expect(result.current.contentRef).toBeDefined();
    expect(result.current.isClamped).toBe(false);
  });

  it('should add and remove resize event listener', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useLineClamp());

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function),
    );
  });

  it('should update isClamped when content height changes', () => {
    const mockDiv = document.createElement('div');
    Object.defineProperties(mockDiv, {
      scrollHeight: {
        configurable: true,
        get: () => 100,
      },
      clientHeight: {
        configurable: true,
        get: () => 50,
      },
    });

    const { result } = renderHook(() => useLineClamp());

    // Use vi.spyOn to simulate contentRef.current
    vi.spyOn(result.current.contentRef, 'current', 'get').mockReturnValue(
      mockDiv,
    );

    // Wrap asynchronous operations with act
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.isClamped).toBe(true);
  });

  it('should handle null contentRef', () => {
    const { result } = renderHook(() => useLineClamp());

    // Use vi.spyOn to simulate contentRef. current is null
    vi.spyOn(result.current.contentRef, 'current', 'get').mockReturnValue(null);

    // Wrap asynchronous operations with act
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current.isClamped).toBe(false);
  });
});
