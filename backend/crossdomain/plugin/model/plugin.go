package model

import (
	"github.com/coze-dev/coze-studio/backend/api/model/app/bot_common"
	api "github.com/coze-dev/coze-studio/backend/api/model/plugin_develop/common"
)

type BindToolInfo struct {
	ToolID   int64
	PluginID int64
	Source   *bot_common.PluginFrom
}
type VersionPlugin struct {
	PluginID int64
	Version  string
}

type MGetPluginLatestVersionResponse struct {
	Versions map[int64]string // pluginID vs version
}

type PluginInfo struct {
	ID           int64
	PluginType   api.PluginType
	SpaceID      int64
	DeveloperID  int64
	APPID        *int64
	RefProductID *int64 // for product plugin
	IconURI      *string
	IconURL      *string
	ServerURL    *string
	Version      *string
	VersionDesc  *string

	CreatedAt int64
	UpdatedAt int64

	Source          *bot_common.PluginFrom
	SaasPluginExtra *SaasPluginExtraInfo
	Extra           map[string]any

	Manifest   *PluginManifest
	OpenapiDoc *Openapi3T
}

type SaasPluginExtraInfo struct {
	IsOfficial  bool
	JumpSaasURL *string
}
type ToolExample struct {
	RequestExample  string
	ResponseExample string
}

type PublishPluginRequest struct {
	PluginID    int64
	Version     string
	VersionDesc string
}

type PublishAPPPluginsRequest struct {
	APPID   int64
	Version string
}

type PublishAPPPluginsResponse struct {
	FailedPlugins   []*PluginInfo
	AllDraftPlugins []*PluginInfo
}

type CheckCanPublishPluginsRequest struct {
	PluginIDs []int64
	Version   string
}

type CheckCanPublishPluginsResponse struct {
	InvalidPlugins []*PluginInfo
}

type ListPluginProductsRequest struct{}

type ListPluginProductsResponse struct {
	Plugins []*PluginInfo
	Total   int64
}
