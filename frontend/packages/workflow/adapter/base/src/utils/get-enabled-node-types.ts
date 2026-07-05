import { StandardNodeType } from '@coze-workflow/base';

// All nodes are available by default and can be customized.
export const getEnabledNodeTypes = (_params: {
  loopSelected: boolean;
  isProject: boolean;
  isSupportImageflowNodes: boolean;
  isSceneFlow: boolean;
  isBindDouyin: boolean;
}) => {
  const { loopSelected } = _params;
  const nodesMap = {
    [StandardNodeType.LLM]: true,
    [StandardNodeType.Api]: false,
    [StandardNodeType.Code]: false,
    [StandardNodeType.Dataset]: true,
    [StandardNodeType.If]: true,
    [StandardNodeType.SubWorkflow]: true,
    [StandardNodeType.Database]: true,
    [StandardNodeType.Output]: true,
    [StandardNodeType.Text]: false,
    [StandardNodeType.Question]: false,
    [StandardNodeType.Break]: loopSelected,
    [StandardNodeType.SetVariable]: loopSelected,
    [StandardNodeType.Continue]: loopSelected,
    [StandardNodeType.Loop]: true,
    [StandardNodeType.Intent]: true,
    [StandardNodeType.DatasetWrite]: false,
    [StandardNodeType.Batch]: true,
    [StandardNodeType.Input]: true,
    [StandardNodeType.Comment]: true,
    [StandardNodeType.VariableMerge]: false,
    [StandardNodeType.QueryMessageList]: false,
    [StandardNodeType.ClearContext]: false,
    [StandardNodeType.CreateConversation]: false,
    [StandardNodeType.VariableAssign]: false,
    [StandardNodeType.Http]: false,
    [StandardNodeType.DatabaseUpdate]: true,
    [StandardNodeType.DatabaseQuery]: true,
    [StandardNodeType.DatabaseDelete]: true,
    [StandardNodeType.DatabaseCreate]: true,
    // [StandardNodeType.JsonParser]: true,
    [StandardNodeType.JsonStringify]: false,
    [StandardNodeType.UpdateConversation]: false,
    [StandardNodeType.DeleteConversation]: false,
    [StandardNodeType.QueryConversationList]: false,
    [StandardNodeType.QueryConversationHistory]: false,
    [StandardNodeType.CreateMessage]: false,
    [StandardNodeType.UpdateMessage]: false,
    [StandardNodeType.DeleteMessage]: false,
  };
  const enabledNodeTypes: StandardNodeType[] = Object.keys(nodesMap)
    .filter(key => nodesMap[key])
    .map(key => key as StandardNodeType);

  return enabledNodeTypes;
};
