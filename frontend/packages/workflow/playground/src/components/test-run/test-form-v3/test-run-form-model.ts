/* eslint-disable @typescript-eslint/no-explicit-any */
import { cloneDeep } from 'lodash-es';
import { type FormModel, type IFormSchema } from '@coze-workflow/test-run-next';

import { formatValues } from './mode-form-kit';
interface SubmitResult {
  /**
   * Is it an empty form?
   */
  empty?: boolean;
  /**
   * Whether the verification is passed
   */
  validate?: boolean;
  /**
   * form value
   */
  values?: any;
}

/**
 * Form capability transparency model
 */
export class TestRunFormModel {
  innerForm: FormModel | null = null;

  /**
   * Original schema
   */
  originSchema: IFormSchema | null = null;
  /**
   * View-converted schema
   */
  modeSchema: IFormSchema | null = null;

  /**
   * mount form instance
   */
  mounted(next: FormModel) {
    this.innerForm = next;
  }

  getUIMode() {
    return this.modeSchema?.['x-form-mode'] || 'form';
  }

  /**
   * Submit the form, including form validation
   */
  async submit(): Promise<SubmitResult> {
    if (!this.modeSchema || !this.innerForm) {
      return { empty: true, validate: true };
    }
    const validateResult = await this.innerForm.validate();

    if (validateResult.length) {
      return {
        validate: false,
      };
    }
    const values = formatValues({
      mode: this.modeSchema['x-form-mode'] || 'form',
      originFormSchema: this.originSchema || {},
      formValues: cloneDeep(this.innerForm.values),
    });
    return {
      validate: true,
      values,
    };
  }
}
