import { type PropsWithChildren } from 'react';

import classNames from 'classnames';
import { RadioGroup, type RadioGroupProps } from '@coze-arch/coze-design';

import styles from './index.module.less';

export type CardRadioGroupProps<T = unknown> = PropsWithChildren<
  Pick<RadioGroupProps, 'value' | 'className'>
> & {
  onChange?: (value: T) => void;
};

/**
 * Always use the card style and conform to the UI design style {@link RadioGroup}
 */
export function CardRadioGroup<T = unknown>({
  value,
  onChange,
  className,
  children,
}: CardRadioGroupProps<T>) {
  return (
    <RadioGroup
      type="pureCard"
      direction="vertical"
      value={value}
      onChange={e => {
        onChange?.(e.target.value as T);
      }}
      className={classNames(styles['card-radio-group'], className)}
    >
      {children}
    </RadioGroup>
  );
}
