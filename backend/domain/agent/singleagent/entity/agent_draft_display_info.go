package entity

import "github.com/coze-dev/coze-studio/backend/api/model/app/developer_api"

type AgentDraftDisplayInfo struct {
	AgentID     int64
	DisplayInfo *developer_api.DraftBotDisplayInfoData
	SpaceID     *string
}
