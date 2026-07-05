package modelbuilder

import (
	"context"

	"github.com/cloudwego/eino-ext/components/model/claude"

	"github.com/coze-dev/coze-studio/backend/api/model/admin/config"
	"github.com/coze-dev/coze-studio/backend/pkg/lang/ptr"
)

type claudeModelBuilder struct {
	cfg *config.Model
}

func newClaudeModelBuilder(cfg *config.Model) Service {
	return &claudeModelBuilder{
		cfg: cfg,
	}
}

func (c *claudeModelBuilder) getDefaultClaudeConfig() *claude.Config {
	return &claude.Config{}
}

func (c *claudeModelBuilder) applyParamsToChatModelConfig(conf *claude.Config, params *LLMParams) {
	if params == nil {
		return
	}

	conf.TopP = params.TopP
	conf.TopK = params.TopK

	if params.Temperature != nil {
		conf.Temperature = ptr.Of(*params.Temperature)
	}

	if params.MaxTokens != 0 {
		conf.MaxTokens = params.MaxTokens
	}

	if params.EnableThinking != nil {
		conf.Thinking = &claude.Thinking{
			Enable: *params.EnableThinking,
		}
	}
}

func (c *claudeModelBuilder) Build(ctx context.Context, params *LLMParams) (ToolCallingChatModel, error) {
	base := c.cfg.Connection.BaseConnInfo

	conf := c.getDefaultClaudeConfig()
	conf.APIKey = base.APIKey
	conf.Model = base.Model
	if base.BaseURL != "" {
		conf.BaseURL = &base.BaseURL
	}

	switch base.ThinkingType {
	case config.ThinkingType_Enable:
		conf.Thinking = &claude.Thinking{
			Enable: true,
		}
	case config.ThinkingType_Disable:
		conf.Thinking = &claude.Thinking{
			Enable: false,
		}
	}

	c.applyParamsToChatModelConfig(conf, params)

	return claude.NewChatModel(ctx, conf)
}
