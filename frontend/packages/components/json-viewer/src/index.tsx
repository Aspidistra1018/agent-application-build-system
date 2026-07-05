import React from 'react';

import { isNil, isString } from 'lodash-es';
import cls from 'classnames';

import { generateFields } from './utils/generate-field';
import type { JsonValueType } from './types';
import { JsonViewerProvider } from './context';
import { TextField } from './components/text-field';
import { JsonField } from './components';

import styles from './index.module.less';

export type { JsonValueType };

export interface JsonViewerProps {
  /** Supports object or plain text rendering */
  data: JsonValueType;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  /** Expand all fields by default */
  defaultExpandAllFields?: boolean;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({
  data,
  className,
  defaultExpandAllFields,
}) => {
  const render = () => {
    // Bottom display null
    if (isNil(data)) {
      return (
        <JsonField
          field={{
            path: [],
            lines: [],
            value: 'Null',
            isObj: false,
            children: [],
          }}
          key={'Null'}
        />
      );
    }

    // Text class result display
    const isStr = isString(data);
    if (isStr) {
      return <TextField text={data} />;
    }

    // Other JSON data display
    const fields = generateFields(data);
    return (
      <JsonViewerProvider
        fields={fields}
        defaultExpandAllFields={defaultExpandAllFields}
      >
        {fields.map(i => (
          <JsonField field={i} key={i.path.join('.')} />
        ))}
      </JsonViewerProvider>
    );
  };

  return (
    <div
      data-testid="json-viewer-wrapper"
      className={cls(styles['json-viewer-wrapper'], className)}
      draggable
      onDragStart={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      {render()}
    </div>
  );
};

export { LogObjSpecialKey, LogValueStyleType } from './constants';
