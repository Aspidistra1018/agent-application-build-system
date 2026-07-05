import { FormItemSchemaType } from '../../constants';

function isNumberType(t: string) {
  return t === FormItemSchemaType.NUMBER || t === FormItemSchemaType.FLOAT;
}

/** Determine that the type is consistent, ** specialization: ** 'number' and'float 'are regarded as the same type */
export const isTestsetFormSameFieldType = (t1?: string, t2?: string) => {
  if (typeof t1 === 'undefined' || typeof t2 === 'undefined') {
    return false;
  }

  return isNumberType(t1) ? isNumberType(t2) : t1 === t2;
};
