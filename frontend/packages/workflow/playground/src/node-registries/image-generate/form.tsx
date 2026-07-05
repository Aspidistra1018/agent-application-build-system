import { useUpdateEffect, usePrevious } from 'ahooks';

import { withNodeConfigForm } from '@/node-registries/common/hocs';
import {
  OutputsField,
  InputsParametersField,
} from '@/node-registries/common/fields';
import { useFieldValidate, useForm } from '@/form';

import { type FormData } from './types';
import { ModelSettingField, ReferencesField, PromptField } from './components';

export const FormRender = withNodeConfigForm(() => {
  const validateModel = useFieldValidate('inputs.modelSetting.model');

  useReferenceModelChangeEffect(validateModel);

  return (
    <>
      <ModelSettingField name="inputs.modelSetting" />
      <ReferencesField name="inputs.references" />
      <InputsParametersField name="inputs.inputParameters" />
      <PromptField name="inputs.prompt" />
      <OutputsField name="outputs" readonly={true} />
    </>
  );
});

// Listening to referenced model changes triggers model validation for model settings
// With useWatch, you can't currently listen to the reference model. Instead, listen to the entire form value first
function useReferenceModelChangeEffect(callback: () => void) {
  const form = useForm<FormData>();
  const { values } = form;
  const previousReferences = usePrevious(values?.inputs?.references);

  useUpdateEffect(() => {
    const currentPreprocessors = values?.inputs?.references?.map(
      reference => reference.preprocessor,
    );
    const previousPreprocessors = previousReferences?.map(
      reference => reference.preprocessor,
    );

    const isSamePreprocessors =
      currentPreprocessors?.length === previousPreprocessors?.length &&
      currentPreprocessors?.every(
        (preprocessor, index) =>
          preprocessor === previousPreprocessors?.[index],
      );

    if (!isSamePreprocessors) {
      callback();
    }
  }, [values]);
}
