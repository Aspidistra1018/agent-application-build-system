export interface FormItemMeta {
  name: string;
  label: string;
  required?: boolean;
  setter: string;
  setterProps?: {
    defaultValue?: unknown;
    [k: string]: unknown;
  };
  layout?: 'horizontal' | 'vertical';
}

export type FormMeta = FormItemMeta[];

export interface DynamicComponentProps<T> {
  value?: T; // field value
  readonly?: boolean; // Is it read-only?
  disabled?: boolean; // Whether to disable
  onChange: (newValue?: T) => void;
}
