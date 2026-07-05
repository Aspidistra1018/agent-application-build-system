package modelbuilder

import (
	"context"

	"github.com/cloudwego/eino-ext/components/model/openai"
	"github.com/cloudwego/eino-ext/components/model/qwen"

	"github.com/coze-dev/coze-studio/backend/api/model/admin/config"
	"github.com/coze-dev/coze-studio/backend/api/model/app/bot_common"
	"github.com/coze-dev/coze-studio/backend/pkg/lang/ptr"
)

type qwenModelBuilder struct {
	cfg *config.Model
}

func newQwenModelBuilder(cfg *config.Model) Service {
	return &qwenModelBuilder{
		cfg: cfg,
	}
}

func (q *qwenModelBuilder) getDefaultQwenConfig() *qwen.ChatModelConfig {
	return &qwen.ChatModelConfig{
		Temperature: ptr.Of(float32(0.7)),
		ResponseFormat: &openai.ChatCompletionResponseFormat{
			Type:       "text",
			JSONSchema: nil,
		},
	}
}

func (q *qwenModelBuilder) applyParamsToQwenConfig(conf *qwen.ChatModelConfig, params *LLMParams) {
	if params == nil {
		return
	}

	conf.TopP = params.TopP

	if params.Temperature != nil {
		conf.Temperature = ptr.Of(*params.Temperature)
	}

	if params.MaxTokens != 0 {
		conf.MaxTokens = ptr.Of(params.MaxTokens)
	}

	if params.FrequencyPenalty != 0 {
		conf.FrequencyPenalty = ptr.Of(params.FrequencyPenalty)
	}

	if params.PresencePenalty != 0 {
		conf.PresencePenalty = ptr.Of(params.PresencePenalty)
	}

	if params.EnableThinking != nil {
		conf.EnableThinking = params.EnableThinking
	}

	if params.ResponseFormat == bot_common.ModelResponseFormat_JSON {
		conf.ResponseFormat = &openai.ChatCompletionResponseFormat{
			Type: openai.ChatCompletionResponseFormatTypeJSONObject,
		}
	} else {
		conf.ResponseFormat = &openai.ChatCompletionResponseFormat{
			Type: openai.ChatCompletionResponseFormatTypeText,
		}
	}
}

func (q *qwenModelBuilder) Build(ctx context.Context, params *LLMParams) (ToolCallingChatModel, error) {
	base := q.cfg.Connection.BaseConnInfo

	conf := q.getDefaultQwenConfig()
	conf.APIKey = base.APIKey
	conf.BaseURL = base.BaseURL
	conf.Model = base.Model

	switch base.ThinkingType {
	case config.ThinkingType_Enable:
		conf.EnableThinking = ptr.Of(true)
	case config.ThinkingType_Disable:
		conf.EnableThinking = ptr.Of(false)
	}

	q.applyParamsToQwenConfig(conf, params)

	return qwen.NewChatModel(ctx, conf)
}
