import { createPortal } from 'react-dom';
import { type CSSProperties } from 'react';

import { useNodeRenderData } from '../../hooks';

/**
 * Custom port components, support expand/retract;
 * When a node is stowed, the port dom is proxied to the node-render layer to avoid being affected by display: none.
 */
export const CustomPort = ({
  portId,
  portType,
  className,
  style,
  collapsedClassName,
  collapsedStyle,
  testId,
}: {
  portId: string;
  portType: 'input' | 'output';
  className?: string;
  style?: CSSProperties;
  collapsedClassName?: string;
  collapsedStyle?: CSSProperties;
  testId?: string;
}) => {
  const { expanded, node: nodeElement } = useNodeRenderData();

  if (expanded) {
    return (
      <div
        className={className}
        data-port-id={portId}
        data-port-type={portType}
        data-testid={testId}
        style={style}
      />
    );
  }

  return createPortal(
    <div
      data-port-id={portId}
      data-port-type={portType}
      data-testid={testId}
      className={`${collapsedClassName} absolute top-[50%] ${
        portType === 'output' ? 'right-0' : 'left-0'
      }`}
      style={collapsedStyle}
    />,
    nodeElement,
  );
};
