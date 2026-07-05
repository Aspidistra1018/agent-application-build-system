import React from 'react';

import { Form } from '@coze-arch/bot-semi';

import style from './index.module.less';

// TODO: hzf, the named component is a bit strange
export type FormInputWithMaxCountProps = {
  maxCount: number;
} & React.ComponentProps<typeof Form.Input>;
// After input, put a suffix to indicate the maximum number of words that can be entered
export const FormInputWithMaxCount = (props: FormInputWithMaxCountProps) => {
  const [count, setCount] = React.useState(0);
  const handleChange = (v: string) => {
    setCount(v.length);
  };
  const countSuffix = (
    <div
      className={style['form-input-with-count']}
    >{`${count}/${props.maxCount}`}</div>
  );
  return (
    <Form.Input
      {...props}
      onChange={value => handleChange(value)}
      suffix={countSuffix}
    />
  );
};
