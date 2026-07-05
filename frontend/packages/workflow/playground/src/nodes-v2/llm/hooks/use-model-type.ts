import { useForm } from '@flowgram-adapter/free-layout-editor';

/**
 * Get model type
 */
export function useModelType() {
  const form = useForm();

  const modelType = form.getValueIn('model')?.modelType;
  return modelType;
}
