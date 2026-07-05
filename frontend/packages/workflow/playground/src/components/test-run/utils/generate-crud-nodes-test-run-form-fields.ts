import { type DatabaseCondition } from '@coze-workflow/base';
import { MemoryApi } from '@coze-arch/bot-api';

import { generateArrayInputParameters } from './generate-test-form-fields';

/**
 * Generate database new data node practice run table entry
 */
export async function generateDatabaseCreateTestRunFormFields(
  formData,
  context,
) {
  const databaseID = getDatabaseID(formData);

  if (!databaseID) {
    return [];
  }

  const database = await queryDatabase(databaseID);

  const fieldInfoParams = convertFieldInfoToParams(
    formData.inputs.insertParam.fieldInfo,
    database,
  );

  const formFields = generateArrayInputParameters(fieldInfoParams, context);

  return formFields;
}

/**
 * Generate database update data node practice run table entry
 */
export async function generateDatabaseUpdateTestRunFormFields(
  formData,
  context,
) {
  const databaseID = getDatabaseID(formData);

  if (!databaseID) {
    return [];
  }

  const database = await queryDatabase(databaseID);

  const fieldInfo = formData?.inputs?.updateParam?.fieldInfo ?? [];
  const fieldInfoParams = convertFieldInfoToParams(fieldInfo, database);

  const conditionList =
    formData?.inputs?.updateParam?.condition?.conditionList ?? [];
  const conditionListParams = convertConditionListToParams(conditionList);

  const params = [...fieldInfoParams, ...conditionListParams];

  const formFields = generateArrayInputParameters(params, context);

  return formFields;
}

/**
 * Generate database Delete data node practice run table entry
 */
export function generateDatabaseDeleteTestRunFormFields(formData, context) {
  const conditionList =
    formData?.inputs?.deleteParam?.condition?.conditionList ?? [];
  const conditionListParams = convertConditionListToParams(conditionList);

  const formFields = generateArrayInputParameters(conditionListParams, context);

  return formFields;
}

/**
 * Generate database query data node practice run table entry
 */
export function generateDatabaseQueryTestRunFormFields(formData, context) {
  const conditionList =
    formData?.inputs?.selectParam?.condition?.conditionList ?? [];
  const conditionListParams = convertConditionListToParams(conditionList);

  const formFields = generateArrayInputParameters(conditionListParams, context);

  return formFields;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getDatabaseID(formData: any) {
  return formData?.inputs?.databaseInfoList[0]?.databaseInfoID;
}

function queryDatabase(databaseID: string) {
  return MemoryApi.GetDatabaseByID({
    id: databaseID,
    need_sys_fields: true,
  });
}

function convertFieldInfoToParams(fieldInfo, database) {
  return fieldInfo.map(item => {
    const databaseField = database?.database_info?.field_list?.find(
      field => field.alterId === item.fieldID,
    );
    return {
      name: `__setting_field_${item?.fieldID}`,
      label: databaseField?.name,
      input: item?.fieldValue,
    };
  });
}

function convertConditionListToParams(conditionList: DatabaseCondition[]) {
  return conditionList.map((item, index) => {
    const { left, right } = item;
    const name = left;
    const rightValue = right;

    return {
      name: `__condition_right_${index}`,
      label: `${name}`,
      input: rightValue,
    };
  });
}
