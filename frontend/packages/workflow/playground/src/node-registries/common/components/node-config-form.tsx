import { type PropsWithChildren } from 'react';

import { PublicScopeProvider } from '@coze-workflow/variable';
import { useIsSettingOnError } from '@coze-workflow/nodes';

import { useGlobalState } from '@/hooks';
import { Form } from '@/form';

import { SettingOnError } from '../fields';
import { Header } from './header';

type NodeConfigFormProps = PropsWithChildren<{
  extraOperation?: React.ReactNode;
  batchModePath?: string;
  nodeDisabled?: boolean;
  readonlyAllowDeleteOperation?: boolean;
}>;

/**
 * NodeConfigForm component
 * Used to display node configuration forms
 * @Param children - child component for rendering form content
 */
export function NodeConfigForm({
  children,
  extraOperation,
  batchModePath,
  nodeDisabled,
  readonlyAllowDeleteOperation,
}: NodeConfigFormProps) {
  const { readonly } = useGlobalState();
  const isSettingOnError = useIsSettingOnError();

  return (
    <>
      <Header
        extraOperation={extraOperation}
        nodeDisabled={nodeDisabled}
        readonlyAllowDeleteOperation={readonlyAllowDeleteOperation}
      />
      <PublicScopeProvider>
        <Form readonly={readonly}>
          {children}
          {isSettingOnError ? (
            <SettingOnError batchModePath={batchModePath} />
          ) : null}
        </Form>
      </PublicScopeProvider>
    </>
  );
}
