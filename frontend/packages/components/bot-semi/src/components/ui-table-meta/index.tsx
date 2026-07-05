import React from 'react';

import { ReactElement } from 'react-markdown/lib/react-markdown';
import cs from 'classnames';
import { Avatar } from '@douyinfe/semi-ui';

import s from './index.module.less';

export interface UITableMetaProps {
  className?: string;
  avatarClassName?: string;
  icon_url?: string; //icon icon
  icon?: ReactElement; //Support for incoming icon tags
  name?: string; //name
  description?: string; //describe
  suffix?: ReactElement; //Extra Element
}

//Table header details component
export const UITableMeta: React.FC<UITableMetaProps> = ({
  className,
  avatarClassName,
  icon_url = '',
  icon,
  name = '',
  description = '',
  suffix,
}) => (
  <div
    className={cs(s['ui-table-meta'], className)}
    data-testid="ui.table-meta"
  >
    {icon_url ? (
      <Avatar
        src={icon_url}
        shape="square"
        className={cs(s['meta-avatar'], avatarClassName)}
      />
    ) : null}
    {!!icon && icon}
    <div
      className={cs(
        s['meta-right'],
        icon_url || icon ? s['meta-right-width'] : null,
      )}
    >
      <div className={s['meta-name']} data-testid="ui.table-meta.name">
        {name}
      </div>
      {!!description && (
        <div
          className={s['meta-description']}
          data-testid="ui.table-meta.description"
        >
          {description}
        </div>
      )}
      {!!suffix && <div className={s['meta-suffix']}>{suffix}</div>}
    </div>
  </div>
);

export default UITableMeta;
