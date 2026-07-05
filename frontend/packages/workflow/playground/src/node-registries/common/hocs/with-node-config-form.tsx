/* eslint-disable @typescript-eslint/naming-convention */
import { NodeConfigForm } from '../components';

/**
 * Higher order component to add wrapper for node configuration form to component
 * This HOC provides a wrapper for the configuration form for the workflow node
 *
 * @Param Component - Component that needs to be wrapped by the configuration form
 * Returns a new component wrapped in NodeConfigForm
 */
export function withNodeConfigForm<
  ComponentProps extends React.JSX.IntrinsicAttributes = {},
>(Component: React.ComponentType<ComponentProps>) {
  return function WithNodeConfigForm(props: ComponentProps) {
    return (
      <NodeConfigForm>
        <Component {...props} />
      </NodeConfigForm>
    );
  };
}
