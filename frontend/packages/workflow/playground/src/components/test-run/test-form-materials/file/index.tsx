import React from 'react';

import { VoiceAdapter } from './voice-adapter';
import { type BaseFileProps, type FileProps } from './types';
import { TypedFileInput } from './typed-file-input';
import { FileBaseAdapter } from './base-adapter';

/** This component is still used in the setter. It will not be deleted for the time being. It will be deleted after the dependency is lifted in the future. */
export const FileAdapter: React.FC<FileProps> = props => {
  if (props.fileType === 'voice') {
    return <VoiceAdapter {...props} />;
  }

  if (props?.enableInputURL) {
    return <TypedFileInput {...(props as BaseFileProps)} />;
  }

  return <FileBaseAdapter {...(props as BaseFileProps)} />;
};
