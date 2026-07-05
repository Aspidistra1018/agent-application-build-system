/**
 * Make a simple style encapsulation for the banner of semi-ui, which conforms to the UX design draft specification
 */

import { type FC } from 'react';

import classnames from 'classnames';
import { Banner, type BannerProps } from '@coze-arch/coze-design';
import { IconClose } from '@douyinfe/semi-icons';

import styles from './index.module.less';

export const UIBanner: FC<BannerProps> = props => (
  <Banner
    bordered
    closeIcon={<IconClose />}
    fullMode={false}
    {...props}
    className={classnames(styles.uiBanner, props.className)}
  />
);
