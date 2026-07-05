import { useState, useEffect } from 'react';

import { Input } from '@coze-workflow/test-run/formily';

import { useGlobalState } from '@/hooks';

export const RoleNameInput = ({ value, onChange, onBlur, ...props }) => {
  const [innerValue, setInnerValue] = useState(value);
  const { info } = useGlobalState();

  const handleChange = (val: string) => {
    setInnerValue(val);
  };

  const handleBlur = () => {
    let nextValue = innerValue;
    // If the user deletes the character name, the original value needs to be backfilled after being out of focus
    if (!nextValue && value) {
      nextValue = value;
    }
    onChange(nextValue);
    setInnerValue(nextValue);
    onBlur();
  };

  useEffect(() => {
    if (value !== innerValue) {
      setInnerValue(value);
    }
  }, [value]);

  return (
    <Input
      value={innerValue}
      placeholder={info?.name}
      onChange={handleChange}
      onBlur={handleBlur}
      {...props}
    />
  );
};
