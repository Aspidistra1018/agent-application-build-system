package plugin

import (
	"github.com/coze-dev/coze-studio/backend/api/model/workflow"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/entity/vo"
)

type ToolsInfoRequest struct {
	PluginEntity vo.PluginEntity
	ToolIDs      []int64
	IsDraft      bool
}

type ToolsInfoResponse struct {
	PluginID      int64
	SpaceID       int64
	Version       string
	PluginName    string
	Description   string
	IconURL       string
	PluginType    int64
	ToolInfoList  map[int64]ToolInfoW
	LatestVersion *string
	IsOfficial    bool
	AppID         int64
}

type ToolInfoW struct {
	ToolName     string
	ToolID       int64
	Description  string
	DebugExample *DebugExample

	Inputs  []*workflow.APIParameter
	Outputs []*workflow.APIParameter
}

type DebugExample struct {
	ReqExample  string
	RespExample string
}

type ToolsInvokableRequest struct {
	PluginEntity       vo.PluginEntity
	ToolsInvokableInfo map[int64]*ToolsInvokableInfo
	IsDraft            bool
}

type WorkflowAPIParameters = []*workflow.APIParameter

type ToolsInvokableInfo struct {
	ToolID                      int64
	RequestAPIParametersConfig  WorkflowAPIParameters
	ResponseAPIParametersConfig WorkflowAPIParameters
}
