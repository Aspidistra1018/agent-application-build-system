package agentflow

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/api/model/app/bot_common"
	crossworkflow "github.com/coze-dev/coze-studio/backend/crossdomain/workflow"
	workflowModel "github.com/coze-dev/coze-studio/backend/crossdomain/workflow/model"
	"github.com/coze-dev/coze-studio/backend/domain/workflow"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/entity/vo"
)

type workflowConfig struct {
	wfInfos []*bot_common.WorkflowInfo
}

func newWorkflowTools(ctx context.Context, conf *workflowConfig) ([]workflow.ToolFromWorkflow, map[string]struct{}, error) {
	var policies []*vo.GetPolicy

	for _, info := range conf.wfInfos {
		id := info.GetWorkflowId()
		policies = append(policies, &vo.GetPolicy{
			ID:    id,
			QType: workflowModel.FromLatestVersion,
		})
	}

	toolsReturnDirectly := make(map[string]struct{})

	workflowTools, err := crossworkflow.DefaultSVC().WorkflowAsModelTool(ctx, policies)

	if len(workflowTools) > 0 {
		for _, workflowTool := range workflowTools {
			if workflowTool.TerminatePlan() == vo.UseAnswerContent {
				toolInfo, err := workflowTool.Info(ctx)
				if err != nil {
					return nil, nil, err
				}
				if toolInfo == nil || toolInfo.Name == "" {
					continue
				}
				toolsReturnDirectly[toolInfo.Name] = struct{}{}
			}
		}
	}

	return workflowTools, toolsReturnDirectly, err
}
