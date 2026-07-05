import { useMemo, useState } from 'react';

import { Tooltip, UIButton, UIInput } from '@coze-arch/bot-semi';
import { IconDeleteOutline, IconToastError } from '@coze-arch/bot-icons';

import { type ValidatorProps } from '../types';

import styles from './index.module.less';
export interface EditHeaderRenderProps {
  value: string;
  deleteProps?: {
    // disable deletion
    disabled: boolean;
    // Delete callback
    onDelete?: (v: string) => void;
  };
  editProps?: {
    // edit callback
    onChange?: (v: string) => void;
    // out of focus callback
    onBlur?: (v: string) => void;
  };
  // out of focus callback
  onBlur: (v: string) => void;
  // header check logic
  validator: ValidatorProps;
  editable?: boolean;
}

export const EditHeaderRender = ({
  value,
  validator = {},
  deleteProps = { disabled: false },
  editProps = {},
  editable = true,
}: EditHeaderRenderProps) => {
  const { validate, errorMsg } = validator;

  const { onChange, onBlur } = editProps;
  const { disabled: deleteDisabled, onDelete } = deleteProps;

  const [isEditCom, setIsEditCom] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [readonly, setReadonly] = useState(true);

  const onBlurFn = () => {
    if (onBlur) {
      onBlur(inputValue);
    }
    setReadonly(true);
    setIsEditCom(false);
  };
  const onChangeFn = (v: string) => {
    if (onChange) {
      onChange(v);
    }
    setInputValue(v);
  };
  const isError = useMemo(() => validate && validate(value), [inputValue]);
  return (
    <div className={styles['edit-header-render']}>
      {/* edit state component */}
      {isEditCom && (
        <UIInput
          autoFocus
          readonly={readonly}
          validateStatus={isError ? 'error' : 'default'}
          suffix={
            isError ? (
              <Tooltip content={errorMsg}>
                <IconToastError />
              </Tooltip>
            ) : null
          }
          className={styles['header-input']}
          value={inputValue}
          onClick={() => {
            if (editable) {
              setReadonly(false);
            }
          }}
          onBlur={onBlurFn}
          onChange={onChangeFn}
        />
      )}

      {/* preview component */}
      {!isEditCom && (
        <div
          className={styles['header-preview']}
          onClick={() => setIsEditCom(true)}
        >
          {inputValue}
        </div>
      )}

      {/* column delete button */}
      {editable && (
        <UIButton
          disabled={deleteDisabled}
          icon={<IconDeleteOutline />}
          className={styles['header-delete']}
          onClick={() => onDelete && onDelete(inputValue)}
        ></UIButton>
      )}
    </div>
  );
};
