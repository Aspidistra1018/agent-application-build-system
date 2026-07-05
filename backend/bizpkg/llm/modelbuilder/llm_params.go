package modelbuilder

import "github.com/coze-dev/coze-studio/backend/api/model/app/bot_common"

type LLMParams struct {
	Temperature      *float32                       `json:"temperature"`
	FrequencyPenalty float32                        `json:"frequencyPenalty"`
	PresencePenalty  float32                        `json:"presencePenalty"`
	MaxTokens        int                            `json:"maxTokens"`
	TopP             *float32                       `json:"topP"`
	TopK             *int32                         `json:"topK"`
	ResponseFormat   bot_common.ModelResponseFormat `json:"responseFormat"`
	EnableThinking   *bool                          `json:"enable_thinking,omitempty" yaml:"enable_thinking,omitempty"`
}

func newLLMParamsWithSettings(appSettings *bot_common.ModelInfo) *LLMParams {
	if appSettings == nil {
		return nil
	}

	l := &LLMParams{}

	if appSettings.Temperature != nil {
		t := float32(*appSettings.Temperature)
		l.Temperature = &t
	}
	if appSettings.FrequencyPenalty != nil {
		f := float32(*appSettings.FrequencyPenalty)
		l.FrequencyPenalty = f
	}
	if appSettings.PresencePenalty != nil {
		p := float32(*appSettings.PresencePenalty)
		l.PresencePenalty = p
	}
	if appSettings.MaxTokens != nil {
		l.MaxTokens = int(*appSettings.MaxTokens)
	}
	if appSettings.TopP != nil {
		t := float32(*appSettings.TopP)
		l.TopP = &t
	}
	if appSettings.TopK != nil {
		k := int32(*appSettings.TopK)
		l.TopK = &k
	}
	if appSettings.ResponseFormat != nil {
		l.ResponseFormat = *appSettings.ResponseFormat
	}

	return l
}
