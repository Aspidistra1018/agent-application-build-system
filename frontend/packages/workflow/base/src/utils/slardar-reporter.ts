import { reporter as infraReporter } from '@coze-arch/logger';
const namespace = 'workflow';

/**
 * The slardar reporting instance used by the process
 */
export const reporter = infraReporter.createReporterWithPreset({
  namespace,
});

/**
 * Exception capture will be reported as a js error
 * @param exception
 * @param importErrorInfo
 */
export function captureException(exception: Error) {
  infraReporter.slardarInstance?.('captureException', exception, {
    isErrorBoundary: 'false',
    namespace,
  });
}
