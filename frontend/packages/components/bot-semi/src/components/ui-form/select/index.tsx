import { ComponentProps } from 'react';

import { SelectProps } from '@douyinfe/semi-ui/lib/es/select';
import { CommonFieldProps } from '@douyinfe/semi-ui/lib/es/form';
import { withField } from '@douyinfe/semi-ui';

import { UISelect } from '../../ui-select';

// The label attribute of UISelect is provided for the borderless theme. There is no such theme in the form scene. Remove this attribute to avoid mixing with the form label.
const SelectInner: React.FC<
  Omit<ComponentProps<typeof UISelect>, 'label'>
> = props => <UISelect {...props} />;

const FormSelectInner = withField(SelectInner);

export const UIFormSelect: React.FC<
  Omit<SelectProps, 'theme'> & CommonFieldProps
> & {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  OptGroup: typeof UISelect.OptGroup;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Option: typeof UISelect.Option;
} = ({ ...props }) => <FormSelectInner {...props} theme="light" />;

UIFormSelect.Option = UISelect.Option;
UIFormSelect.OptGroup = UISelect.OptGroup;
