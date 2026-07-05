import { type ReactNode } from 'react';

import type {
  ViewVariableTreeNode,
  ViewVariableType,
} from '@coze-workflow/base';

import { type EditorAPI } from './components/editor/preset';

export interface Input {
  name?: string;
  type?: ViewVariableType;
  children?: ViewVariableTreeNode[];
}

export interface Output {
  name?: string;
  type?: ViewVariableType;
  children?: Output[];
}

// Javascript is historical data, currently only python | typescript is available.
export type LanguageType = 'python' | 'typescript' | 'javascript';

export interface PreviewerProps {
  content: string;
  language: LanguageType;
  height?: number;
}

export interface EditorProps {
  defaultContent?: string;
  uuid: string;
  defaultLanguage: LanguageType;
  spaceId?: string;
  height?: string;
  width?: string;
  title?: string;
  readonly?: boolean;
  input?: Input[];
  output?: Output[];
  region?: string;
  locale?: string;
  onClose?: () => void;
  onChange?: (code: string, language: LanguageType) => void;
  languageTemplates?: Array<{
    language: 'typescript' | 'python';
    displayName: string;
    template: string;
  }>;
  onTestRun?: () => void;
  testRunIcon?: ReactNode;
  /**
   * @Deprecated onTestRunStateChange has expired and is not used online
   */
  onTestRunStateChange?: (status: string) => void;
}

export interface EditorOtherProps {
  didMount?: (api: EditorAPI) => void;
  language?: LanguageType;
}

export enum ModuleDetectionKind {
  /**
   * Files with imports, exports and/or import.meta are considered modules
   */
  Legacy = 1,
  /**
   * Legacy, but also files with jsx under react-jsx or react-jsxdev and esm mode files under moduleResolution: node16+
   */
  Auto = 2,
  /**
   * Consider all non-declaration files modules, regardless of present syntax
   */
  Force = 3,
}
