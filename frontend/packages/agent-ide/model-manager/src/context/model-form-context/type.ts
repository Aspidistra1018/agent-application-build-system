import { type Dispatch, type SetStateAction } from 'react';

export interface ModelFormContextProps {
  isGenerationDiversityOpen: boolean;
  customizeValueMap: Record<string, Record<string, unknown>>;
  setGenerationDiversityOpen: Dispatch<SetStateAction<boolean>>;
  setCustomizeValues: (
    modelId: string,
    customizeValues: this['customizeValueMap'][string],
  ) => void;
  /**
   * Whether to display the expand and close buttons of the diversity setting area
   *
   *  Requires that the detailed configuration area be placed in a separate panel, so it is high enough to display all options, no need to fold
   *
   * @default false
   */
  hideDiversityCollapseButton?: boolean;
}
