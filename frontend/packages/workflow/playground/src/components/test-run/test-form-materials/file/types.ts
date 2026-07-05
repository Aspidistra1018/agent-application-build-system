import type { ComponentAdapterCommonProps } from '../../types';

export enum FileInputType {
  UPLOAD = 'upload',
  INPUT = 'input',
}

export type FileProps = ComponentAdapterCommonProps<string> & {
  accept: string;
  multiple: boolean;
  disabled?: boolean;
  fileType: 'object' | 'image' | 'voice';
  // Support file address input
  enableInputURL?: boolean;
  // File input type change event
  fileInputType?: string;
  // File input type change event
  onInputTypeChange?: (v: string) => void;
  // File type selection class name
  inputTypeSelectClassName?: string;
  // URL Enter class name
  inputURLClassName?: string;
  containerClassName?: string;
};

export type BaseFileProps = Omit<FileProps, 'fileType'> & {
  fileType: 'object' | 'image';
  className?: string;
} & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
