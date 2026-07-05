import Ajv from 'ajv';
import { I18n } from '@coze-arch/i18n';

import { type IFormSchemaValidate } from '../form-engine';

const isEmptyValue = (v: unknown) => v === undefined || v === null || v === '';

interface GenerateFieldValidatorOptions {
  name: string;
  title?: string;
  required?: boolean;
  validateJsonSchema?: any;
}

/**
 * AJV instance cache
 * No need to import or create multiple times, optimizing memory overhead
 */
let ajvCache: undefined | Ajv;

export const generateFieldValidator = (
  options: GenerateFieldValidatorOptions,
) => {
  const { required, title, name, validateJsonSchema } = options;

  const validator: IFormSchemaValidate = ({ value }) => {
    if (required && isEmptyValue(value)) {
      return I18n.t('workflow_testset_required_tip', {
        param_name: title || name,
      });
    }
    // If there is a structured description, the value also needs to be deserialized
    if (validateJsonSchema && value !== undefined) {
      if (!ajvCache) {
        ajvCache = new Ajv();
      }
      try {
        const valueObject = JSON.parse(value);
        const validate = ajvCache.compile(validateJsonSchema);
        const valid = validate(valueObject);
        return valid ? undefined : I18n.t('workflow_debug_wrong_json');
      } catch {
        /**
         * There are many possibilities for error reporting, and the expected result is that the verification fails.
         * 1. Value deserialization failed
         * 2. The deserialized value is not legal
         */
        return I18n.t('workflow_debug_wrong_json');
      }
    }
  };

  return {
    ['x-validator']: validator,
  };
};
