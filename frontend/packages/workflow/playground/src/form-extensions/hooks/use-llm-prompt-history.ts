import { type NodeResult } from '@coze-workflow/base/api';

function getPromptExecuteValue(
  prompt: string,
  variables: Record<string, string>,
) {
  const regex = /{{(.*?)}}/g;

  const replacedPrompt =
    prompt?.replace(
      regex,
      (match, variable) =>
        // Check whether there is a corresponding variable value in value, and replace it if so, otherwise keep it as it is.
        variables[variable.trim()] || match,
    ) ?? '';

  return replacedPrompt;
}

export const useLLMPromptHistory = (
  prompt: string,
  testRunResult: NodeResult | undefined,
) => {
  const llmInputStr = testRunResult?.input;
  const inputParams = llmInputStr ? JSON.parse(llmInputStr) : {};
  const human = getPromptExecuteValue(prompt, inputParams);
  const ai = testRunResult?.raw_output ?? '';

  return JSON.stringify({
    Human: human,
    Ai: ai,
  });
};
