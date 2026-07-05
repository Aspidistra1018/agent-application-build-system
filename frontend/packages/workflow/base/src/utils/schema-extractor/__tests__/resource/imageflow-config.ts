/* eslint-disable @coze-arch/no-deep-relative-import */
import { type SchemaExtractorConfig } from '../../type';
import { SchemaExtractorParserName } from '../../constant';
import { StandardNodeType } from '../../../../types';

export const imageflowExtractorConfig: SchemaExtractorConfig = {
  // API Node 4
  [StandardNodeType.Api]: [
    {
      // Corresponding input name
      name: 'inputs',
      path: 'inputs.inputParameters',
      parser: SchemaExtractorParserName.INPUT_PARAMETERS,
    },
  ],
};
