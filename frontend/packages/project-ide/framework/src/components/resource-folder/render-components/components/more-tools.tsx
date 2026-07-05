import React from 'react';

import { IconCozMore } from '@coze-arch/coze-design/icons';
import { Button, Tooltip } from '@coze-arch/coze-design';

import { type RenderMoreSuffixType, type ResourceType } from '../../type';
import { MORE_TOOLS_CLASS_NAME } from '../../constant';

const MoreTools = ({
  resource,
  contextMenuCallback,
  resourceTreeWrapperRef,
  renderMoreSuffix,
}: {
  resource: ResourceType;
  contextMenuCallback: (e: any, resources?: ResourceType[]) => () => void;
  resourceTreeWrapperRef: React.MutableRefObject<HTMLDivElement | null>;
  renderMoreSuffix?: RenderMoreSuffixType;
}) => {
  const handleClick = e => {
    /**
     * Here, the currentTarget of the event is set to the wrapper element of the tree component to ensure that the matchItems method of the contextMenu can be traversed normally.
     */
    e.currentTarget = resourceTreeWrapperRef.current;
    contextMenuCallback(e, [resource]);
  };

  const btnElm = (
    <Button
      data-testid={`agent-ide.resource-item.${resource.type}.${resource.name}.more-tools`}
      {...(typeof renderMoreSuffix === 'object' && renderMoreSuffix?.extraProps
        ? renderMoreSuffix?.extraProps
        : {})}
      className={`base-item-more-hover-display-class ${MORE_TOOLS_CLASS_NAME} base-item-more-btn ${
        typeof renderMoreSuffix === 'object' && renderMoreSuffix.className
          ? renderMoreSuffix.className
          : ''
      }`}
      style={
        typeof renderMoreSuffix === 'object' && renderMoreSuffix.style
          ? renderMoreSuffix.style
          : {}
      }
      icon={<IconCozMore />}
      theme="borderless"
      size="small"
      onMouseUp={handleClick}
    />
  );

  if (typeof renderMoreSuffix === 'object' && renderMoreSuffix.render) {
    return renderMoreSuffix.render({
      onActive: handleClick,
      baseBtn: btnElm,
      resource,
    });
  }

  if (typeof renderMoreSuffix === 'object' && renderMoreSuffix.tooltip) {
    if (typeof renderMoreSuffix.tooltip === 'string') {
      return <Tooltip content={renderMoreSuffix.tooltip}>{btnElm}</Tooltip>;
    }
    return <Tooltip {...renderMoreSuffix.tooltip}>{btnElm}</Tooltip>;
  }

  return btnElm;
};

export { MoreTools };
