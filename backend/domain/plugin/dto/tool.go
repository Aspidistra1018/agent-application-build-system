package dto

import (
	"github.com/getkin/kin-openapi/openapi3"

	"github.com/coze-dev/coze-studio/backend/api/model/plugin_develop/common"
	"github.com/coze-dev/coze-studio/backend/crossdomain/plugin/model"
)

type CreateDraftToolsWithCodeRequest struct {
	PluginID   int64
	OpenapiDoc *model.Openapi3T

	ConflictAndUpdate bool
}

type CreateDraftToolsWithCodeResponse struct {
	DuplicatedTools []UniqueToolAPI
}

type UpdateDraftToolRequest struct {
	PluginID     int64
	ToolID       int64
	Name         *string
	Desc         *string
	SubURL       *string
	Method       *string
	Parameters   openapi3.Parameters
	RequestBody  *openapi3.RequestBodyRef
	Responses    openapi3.Responses
	Disabled     *bool
	SaveExample  *bool
	DebugExample *common.DebugExample
	APIExtend    *common.APIExtend
}

type ConvertToOpenapi3DocRequest struct {
	RawInput        string
	PluginServerURL *string
}

type ConvertToOpenapi3DocResponse struct {
	OpenapiDoc *model.Openapi3T
	Manifest   *model.PluginManifest
	Format     common.PluginDataFormat
	ErrMsg     string
}

type UpdateBotDefaultParamsRequest struct {
	PluginID     int64
	AgentID      int64
	ToolName     string
	Parameters   openapi3.Parameters
	RequestBody  *openapi3.RequestBodyRef
	Responses    openapi3.Responses
	PluginFormat *common.PluginDataFormat
}
type UniqueToolAPI struct {
	SubURL string
	Method string
}
