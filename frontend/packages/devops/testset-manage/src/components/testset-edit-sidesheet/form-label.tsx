import { type CSSProperties } from 'react';

import cls from 'classnames';

import s from './form-label.module.less';

interface FormLabelProps {
  label: string;
  typeLabel?: string;
  required?: boolean;
  className?: string;
  style?: CSSProperties;
}

// The built-in FormLabel style does not support typeLabel, so it is easy to customize
export function FormLabel({
  label,
  typeLabel,
  required,
  className,
  style,
}: FormLabelProps) {
  return (
    <div className={cls(s.wrapper, className)} style={style}>
      <div className={cls(s.label, required && s.required)}>{label}</div>
      {typeLabel ? <div className={s['type-label']}>{typeLabel}</div> : null}
    </div>
  );
}
