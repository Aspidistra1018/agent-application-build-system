import { isNil } from 'lodash-es';
import { type ApiNodeIdentifier } from '@coze-workflow/nodes';
import { BlockInput } from '@coze-workflow/base';

export function getApiNodeIdentifier(
  apiParam: BlockInput[],
): ApiNodeIdentifier {
  // Define the fields to be extracted and how they are converted
  const fieldsToExtract = [
    { name: 'apiName', key: 'apiName' },
    { name: 'pluginID', key: 'pluginID' },
    { name: 'apiID', key: 'api_id', optional: true },
    { name: 'pluginVersion', key: 'plugin_version', optional: true },
  ];

  // Using reduce to build the resulting object
  return fieldsToExtract.reduce((result, field) => {
    const blockInput = apiParam.find(
      (item: BlockInput) => item.name === field.name,
    );

    if (blockInput) {
      const value = BlockInput.toLiteral<string>(blockInput);
      if (!isNil(value)) {
        result[field.key] = value;
      }
    }
    return result;
  }, {} as unknown as ApiNodeIdentifier);
}
