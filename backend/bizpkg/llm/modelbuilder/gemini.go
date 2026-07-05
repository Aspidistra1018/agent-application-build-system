package modelbuilder

import (
	"context"

	"github.com/cloudwego/eino-ext/components/model/gemini"
	"google.golang.org/genai"

	"github.com/coze-dev/coze-studio/backend/api/model/admin/config"
	"github.com/coze-dev/coze-studio/backend/pkg/lang/ptr"
)

type geminiModelBuilder struct {
	cfg *config.Model
}

func newGeminiModelBuilder(cfg *config.Model) Service {
	return &geminiModelBuilder{
		cfg: cfg,
	}
}

func (g *geminiModelBuilder) getDefaultGeminiConfig() *gemini.Config {
	return &gemini.Config{}
}

func (g *geminiModelBuilder) getDefaultGenaiConfig() *genai.ClientConfig {
	return &genai.ClientConfig{
		HTTPOptions: genai.HTTPOptions{
			BaseURL: "https://generativelanguage.googleapis.com/",
		},
	}
}

func (g *geminiModelBuilder) applyParamsToGeminiConfig(conf *gemini.Config, params *LLMParams) {
	if params == nil {
		return
	}

	conf.TopK = params.TopK
	conf.TopP = params.TopP

	if params.Temperature != nil {
		conf.Temperature = ptr.Of(*params.Temperature)
	}

	if params.MaxTokens != 0 {
		conf.MaxTokens = ptr.Of(params.MaxTokens)
	}

	if params.EnableThinking != nil {
		conf.ThinkingConfig = &genai.ThinkingConfig{
			IncludeThoughts: *params.EnableThinking,
		}
	}
}

func (g *geminiModelBuilder) Build(ctx context.Context, params *LLMParams) (ToolCallingChatModel, error) {
	base := g.cfg.Connection.BaseConnInfo

	clientCfg := g.getDefaultGenaiConfig()
	if base.BaseURL != "" {
		clientCfg.HTTPOptions.BaseURL = base.BaseURL
	}

	clientCfg.APIKey = base.APIKey
	if g.cfg.Connection.Gemini != nil {
		clientCfg.Backend = genai.Backend(g.cfg.Connection.Gemini.Backend)
		clientCfg.Project = g.cfg.Connection.Gemini.Project
		clientCfg.Location = g.cfg.Connection.Gemini.Location
	}

	client, err := genai.NewClient(ctx, clientCfg)
	if err != nil {
		return nil, err
	}

	conf := g.getDefaultGeminiConfig()
	conf.Client = client
	conf.Model = base.Model

	switch base.ThinkingType {
	case config.ThinkingType_Enable:
		conf.ThinkingConfig = &genai.ThinkingConfig{
			IncludeThoughts: true,
		}
	case config.ThinkingType_Disable:
		conf.ThinkingConfig = &genai.ThinkingConfig{
			IncludeThoughts: false,
		}
	}

	g.applyParamsToGeminiConfig(conf, params)

	return gemini.NewChatModel(ctx, conf)
}
