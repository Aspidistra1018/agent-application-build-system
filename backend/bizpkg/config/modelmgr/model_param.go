package modelmgr

import (
	config "github.com/coze-dev/coze-studio/backend/api/model/admin/config"
	"github.com/coze-dev/coze-studio/backend/pkg/lang/conv"
	"github.com/coze-dev/coze-studio/backend/pkg/lang/ptr"
)

type Model struct {
	*config.Model
}

const (
	temperature      = "temperature"
	maxTokens        = "max_tokens"
	topP             = "top_p"
	topK             = "top_k"
	responseFormat   = "response_format"
	frequencyPenalty = "frequency_penalty"
	presencePenalty  = "presence_penalty"
)

func (m *Model) GetDefaultTemperature() *float64 {
	for _, param := range m.Parameters {
		if param.Name == temperature && param.DefaultVal != nil {
			t, err := conv.StrToFloat64(param.DefaultVal.DefaultVal)
			if err != nil {
				return nil
			}

			return ptr.Of(t)
		}
	}

	return nil
}

func (m *Model) GetDefaultMaxTokens() *int32 {
	for _, param := range m.Parameters {
		if param.Name == maxTokens && param.DefaultVal != nil {
			t, err := conv.StrToInt64(param.DefaultVal.DefaultVal)
			if err != nil {
				return nil
			}

			return ptr.Of(int32(t))
		}
	}

	return nil
}

func (m *Model) GetDefaultTopP() *float64 {
	for _, param := range m.Parameters {
		if param.Name == topP && param.DefaultVal != nil {
			t, err := conv.StrToFloat64(param.DefaultVal.DefaultVal)
			if err != nil {
				return nil
			}

			return ptr.Of(t)
		}
	}

	return nil
}

// func (m *Model) GetDefaultResponseFormat() *config.ResponseFormat {
// 	for _, param := range m.Parameters {
// 		if param.Name == responseFormat && param.DefaultVal != nil {
// 			t, err := conv.StrToResponseFormat(param.DefaultVal.DefaultVal)
// 			if err != nil {
// 				return nil
// 			}

// 			return ptr.Of(t)
// 		}
// 	}

// 	return nil
// }

func (m *Model) GetDefaultFrequencyPenalty() *float64 {
	for _, param := range m.Parameters {
		if param.Name == frequencyPenalty && param.DefaultVal != nil {
			t, err := conv.StrToFloat64(param.DefaultVal.DefaultVal)
			if err != nil {
				return nil
			}

			return ptr.Of(t)
		}
	}

	return nil
}

func (m *Model) GetDefaultPresencePenalty() *float64 {
	for _, param := range m.Parameters {
		if param.Name == presencePenalty && param.DefaultVal != nil {
			t, err := conv.StrToFloat64(param.DefaultVal.DefaultVal)
			if err != nil {
				return nil
			}

			return ptr.Of(t)
		}
	}

	return nil
}

func (m *Model) GetDefaultTopK() *int32 {
	for _, param := range m.Parameters {
		if param.Name == topK && param.DefaultVal != nil {
			t, err := conv.StrToInt64(param.DefaultVal.DefaultVal)
			if err != nil {
				return nil
			}

			return ptr.Of(int32(t))
		}
	}

	return nil
}
