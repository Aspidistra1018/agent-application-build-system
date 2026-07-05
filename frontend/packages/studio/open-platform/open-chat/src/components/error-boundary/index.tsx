import React, { type FC, type PropsWithChildren } from 'react';

import { ErrorBoundary as FlowErrorBoundary } from '@coze-arch/logger';
import { I18n } from '@coze-arch/i18n';
import { Typography } from '@coze-arch/bot-semi';

import { studioOpenClientReporter } from '@/helper';

const { Title, Text } = Typography;

const FallbackComponent: FC = () => (
  <div>
    <Title>{I18n.t('404_title')}</Title>
    <Text>{I18n.t('404_content')}</Text>
  </div>
);

export const ErrorBoundary: FC<PropsWithChildren> = ({ children }) => (
  <FlowErrorBoundary
    errorBoundaryName="ErrorBoundary"
    logger={studioOpenClientReporter.getLogger()}
    FallbackComponent={FallbackComponent}
  >
    {children}
  </FlowErrorBoundary>
);
