package vo

import "github.com/coze-dev/coze-studio/backend/api/model/workflow"

type WorkflowToolConfig struct {
	InputParametersConfig  []*workflow.APIParameter
	OutputParametersConfig []*workflow.APIParameter
}
