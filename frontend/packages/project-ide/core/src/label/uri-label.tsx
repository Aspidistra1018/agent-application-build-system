import React, { useEffect } from 'react';

import { URI } from '../common';
import {
  type LabelChangeEvent,
  LabelService,
  useIDEService,
  useRefresh,
} from '../';

export interface URILabelProps {
  uri: string | URI;
}

/**
 * React component for rendering Label
 * @param props
 * @constructor
 */
export const URILabel: React.FC<URILabelProps> = props => {
  const uri = typeof props.uri === 'string' ? new URI(props.uri) : props.uri;
  const labelService = useIDEService<LabelService>(LabelService);
  const refresh = useRefresh();
  useEffect(() => {
    const dispose = labelService.onChange((event: LabelChangeEvent) => {
      if (event.affects(uri)) {
        refresh();
      }
    });
    return () => dispose.dispose();
  }, []);
  return <>{labelService.renderer(uri)}</>;
};
