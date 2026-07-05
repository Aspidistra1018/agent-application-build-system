import { I18n } from '@coze-arch/i18n';
import {
  ValidateTrigger,
  type FormMetaV2,
  DataEvent,
} from '@flowgram-adapter/free-layout-editor';

import { provideNodeOutputVariablesEffect } from '@/nodes-v2/materials/provide-node-output-variables';
import { nodeMetaValidate } from '@/nodes-v2/materials/node-meta-validate';
import { fireNodeTitleChange } from '@/nodes-v2/materials/fire-node-title-change';

import { createValueExpressionInputValidate } from '../common/validators';
import Render from './form';
import { handleMethodChangeEffect } from './effects/handle-method-change-effect';
import { formatOnInit, formatOnSubmit } from './data-transformer';
import { StringMethod } from './constants';

export const FORM_META: FormMetaV2<FormData> = {
  render: () => <Render />,
  validateTrigger: ValidateTrigger.onChange,
  validate: {
    nodeMeta: nodeMetaValidate,
    // check input
    'inputParameters.*.input': createValueExpressionInputValidate({
      required: true,
    }),
    // Verify splicing content
    concatResult: ({ value, formValues }) => {
      // Only the splicing mode verifies the splicing content.
      if (formValues?.method === StringMethod.Split) {
        return undefined;
      }

      return !value?.length
        ? I18n.t('workflow_testset_required_tip', {
            param_name: I18n.t('Content'),
          })
        : undefined;
    },

    // check separator
    delimiter: ({ value: setterValue, formValues }) => {
      // Only split mode checks delimiters
      if (formValues?.method === StringMethod.Concat) {
        return undefined;
      }

      if (!setterValue?.value || setterValue?.value.length === 0) {
        return I18n.t('workflow_testset_required_tip', {
          param_name: I18n.t('workflow_stringprocess_delimiter_title'),
        });
      }
      return undefined;
    },
  },
  effect: {
    nodeMeta: fireNodeTitleChange,
    outputs: provideNodeOutputVariablesEffect,

    // Listen for character handling method changes
    method: [
      {
        effect: handleMethodChangeEffect,
        event: DataEvent.onValueChange,
      },
    ],
  },
  formatOnInit,
  formatOnSubmit,
};
