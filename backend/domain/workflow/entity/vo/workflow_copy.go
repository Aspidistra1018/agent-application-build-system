package vo

import "github.com/coze-dev/coze-studio/backend/api/model/app/bot_common"

type PluginEntity struct {
	PluginID      int64
	PluginVersion *string // nil or "0" means draft, "" means latest/online version, otherwise is specific version
	PluginFrom    *bot_common.PluginFrom
}

type ExternalResourceRelated struct {
	PluginMap     map[int64]*PluginEntity
	PluginToolMap map[int64]int64

	KnowledgeMap map[int64]int64
	DatabaseMap  map[int64]int64
}

type CopyWorkflowPolicy struct {
	TargetSpaceID            *int64
	TargetAppID              *int64
	ModifiedCanvasSchema     *string
	ShouldModifyWorkflowName bool
}

type DependenceResource struct {
	PluginIDs    []int64
	KnowledgeIDs []int64
	DatabaseIDs  []int64
}
