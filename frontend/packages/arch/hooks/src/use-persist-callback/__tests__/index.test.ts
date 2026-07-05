import {
  act,
  renderHook,
  type RenderHookResult,
} from '@testing-library/react-hooks';
import { useState } from 'react';
import usePersistCallback from '..';

// The function changes, but the address remains the same

const TestHooks = () => {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount(c => c + 1);
  };
  const persistFn = usePersistCallback(() => count);

  return { addCount, persistFn };
};

let hook: RenderHookResult<[], ReturnType<typeof TestHooks>>;

describe('usePersistCallback', () => {
  it('usePersistCallback should work', () => {
    act(() => {
      hook = renderHook(() => TestHooks());
    });
    const currentFn = hook.result.current.persistFn;
    expect(hook.result.current.persistFn()).toEqual(0);

    act(() => {
      hook.result.current.addCount();
    });

    expect(currentFn).toEqual(hook.result.current.persistFn);
    expect(hook.result.current.persistFn()).toEqual(1);
  });
});
