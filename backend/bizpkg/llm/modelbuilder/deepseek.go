package modelbuilder

import (
	"context"

	"github.com/cloudwego/eino-ext/components/model/deepseek"

	"github.com/coze-dev/coze-studio/backend/api/model/admin/config"
	"github.com/coze-dev/coze-studio/backend/api/model/app/bot_common"
)

type deepseekModelBuilder struct {
	cfg *config.Model
}

func newDeepseekModelBuilder(cfg *config.Model) Service {
	return &deepseekModelBuilder{
		cfg: cfg,
	}
}

func (d *deepseekModelBuilder) getDefaultDeepseekConfig() *deepseek.ChatModelConfig {
	return &deepseek.ChatModelConfig{}
}

func (d *deepseekModelBuilder) applyParamsToChatModelConfig(conf *deepseek.ChatModelConfig, params *LLMParams) {
	if params == nil {
		return
	}

	if params.Temperature != nil {
		conf.Temperature = *params.Temperature
	}

	if params.MaxTokens != 0 {
		conf.MaxTokens = params.MaxTokens
	}

	if params.TopP != nil {
		conf.TopP = *params.TopP
	}

	if params.FrequencyPenalty != 0 {
		conf.FrequencyPenalty = params.FrequencyPenalty
	}

	if params.PresencePenalty != 0 {
		conf.PresencePenalty = params.PresencePenalty
	}

	if params.ResponseFormat == bot_common.ModelResponseFormat_JSON {
		conf.ResponseFormatType = deepseek.ResponseFormatTypeJSONObject
	} else {
		conf.ResponseFormatType = deepseek.ResponseFormatTypeText
	}
}

func (d *deepseekModelBuilder) Build(ctx context.Context, params *LLMParams) (ToolCallingChatModel, error) {
	base := d.cfg.Connection.BaseConnInfo

	conf := d.getDefaultDeepseekConfig()
	conf.APIKey = base.APIKey
	conf.Model = base.Model
	if base.BaseURL != "" {
		conf.BaseURL = base.BaseURL
	}

	d.applyParamsToChatModelConfig(conf, params)

	return deepseek.NewChatModel(ctx, conf)
}
