package agentflow

import (
	"context"

	"github.com/cloudwego/eino/components/prompt"
	"github.com/cloudwego/eino/compose"
	"github.com/cloudwego/eino/schema"

	"github.com/coze-dev/coze-studio/backend/api/model/app/bot_common"
	"github.com/coze-dev/coze-studio/backend/bizpkg/llm/modelbuilder"
	"github.com/coze-dev/coze-studio/backend/pkg/lang/ptr"
)

const (
	keyOfSuggestPromptVariables = "suggest_prompt_variables"
	keyOfSuggestGraph           = "suggest_graph"
	keyOfSuggestPreInputParse   = "suggest_pre_input_parse"
	keyOfSuggestPersonParse     = "suggest_persona"
	keyOfSuggestChatModel       = "suggest_chat_model"
	keyOfSuggestParser          = "suggest_parser"
	keyOfSuggestTemplate        = "suggest_template"
)

func newSuggestGraph(_ context.Context, conf *Config, chatModel modelbuilder.ToolCallingChatModel) (*compose.Graph[[]*schema.Message, *schema.Message], bool) {

	isNeedGenerateSuggest := false
	agentSuggestionSetting := conf.Agent.SuggestReply

	sp := &suggestPersonaRender{}
	if agentSuggestionSetting != nil && ptr.From(agentSuggestionSetting.SuggestReplyMode) != bot_common.SuggestReplyMode_Disable {
		isNeedGenerateSuggest = true
		if ptr.From(agentSuggestionSetting.SuggestReplyMode) == bot_common.SuggestReplyMode_Custom {
			sp.persona = ptr.From(agentSuggestionSetting.CustomizedSuggestPrompt)
		}
	}

	if !isNeedGenerateSuggest {
		return nil, isNeedGenerateSuggest
	}
	suggestPrompt := prompt.FromMessages(schema.Jinja2,
		schema.SystemMessage(SUGGESTION_PROMPT_JINJA2),
		schema.UserMessage("Based on the contextual information, provide three recommended questions"),
	)

	suggestGraph := compose.NewGraph[[]*schema.Message, *schema.Message]()
	suggestPromptVars := &suggestPromptVariables{}
	_ = suggestGraph.AddLambdaNode(keyOfSuggestPromptVariables,
		compose.InvokableLambda[[]*schema.Message, map[string]any](suggestPromptVars.AssembleSuggestPromptVariables))

	_ = suggestGraph.AddLambdaNode(keyOfSuggestPersonParse,
		compose.InvokableLambda[[]*schema.Message, string](sp.RenderPersona),
		compose.WithOutputKey(keyOfSuggestPersonParse),
	)

	_ = suggestGraph.AddChatTemplateNode(keyOfSuggestTemplate, suggestPrompt)
	_ = suggestGraph.AddChatModelNode(keyOfSuggestChatModel, chatModel, compose.WithNodeName(keyOfSuggestChatModel))
	_ = suggestGraph.AddLambdaNode(keyOfSuggestParser, compose.InvokableLambda[*schema.Message, *schema.Message](suggestParser), compose.WithNodeName(keyOfSuggestParser))

	_ = suggestGraph.AddEdge(compose.START, keyOfSuggestPromptVariables)
	_ = suggestGraph.AddEdge(compose.START, keyOfSuggestPersonParse)
	_ = suggestGraph.AddEdge(keyOfSuggestPersonParse, keyOfSuggestTemplate)
	_ = suggestGraph.AddEdge(keyOfSuggestPromptVariables, keyOfSuggestTemplate)
	_ = suggestGraph.AddEdge(keyOfSuggestTemplate, keyOfSuggestChatModel)
	_ = suggestGraph.AddEdge(keyOfSuggestChatModel, keyOfSuggestParser)
	_ = suggestGraph.AddEdge(keyOfSuggestParser, compose.END)

	return suggestGraph, isNeedGenerateSuggest
}
