import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';

import { InputProps } from '@douyinfe/semi-ui/lib/es/input';

import { Input } from '../ui-input';

export type UISearchInputProps = InputProps & {
  onSearch?: (value?: string) => void;
};

type InputRefType = HTMLInputElement | null;

/**
 * Input component in the search scene, combined with the composition API to optimize the Chinese input scene
 * @returns Input
 */
export const UISearchInput = forwardRef(
  (
    {
      onSearch,
      onChange,
      onCompositionStart,
      onCompositionUpdate,
      onCompositionEnd,
      ...props
    }: UISearchInputProps,
    ref: ForwardedRef<InputRefType>,
  ) => {
    const compositionFlag = useRef(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle<InputRefType, InputRefType>(
      ref,
      () => inputRef.current,
    );

    return (
      <Input
        {...props}
        data-testid="ui.search-input"
        ref={inputRef}
        onChange={(...args) => {
          onChange?.(...args);
          if (!compositionFlag.current) {
            onSearch?.(args[0]);
          }
        }}
        onCompositionStart={(...args) => {
          onCompositionStart?.(...args);
          compositionFlag.current = true;
        }}
        onCompositionUpdate={(...args) => {
          onCompositionUpdate?.(...args);
          compositionFlag.current = true;
        }}
        onCompositionEnd={(...args) => {
          onCompositionEnd?.(...args);
          compositionFlag.current = false;
          onSearch?.(inputRef.current?.value);
        }}
      />
    );
  },
);
