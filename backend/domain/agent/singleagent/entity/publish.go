package entity

import (
	"github.com/coze-dev/coze-studio/backend/api/model/app/developer_api"
	"github.com/coze-dev/coze-studio/backend/types/consts"
)

var PublishConnectorIDWhiteList = map[int64]bool{
	consts.WebSDKConnectorID: true,
	consts.APIConnectorID:    true,
}

type PublishConnectorData struct {
	PublishConnectorList []*developer_api.PublishConnectorInfo
	// SubmitBotMarketOption *developer_api.SubmitBotMarketOption
	// LastSubmitConfig      *developer_api.SubmitBotMarketConfig
	// ConnectorBrandInfoMap map[int64]*developer_api.ConnectorBrandInfo
	// PublishTips           *developer_api.PublishTips
}

type PublishInfo struct {
	AgentID                 int64
	LastPublishTimeMS       int64
	ConnectorID2PublishTime map[int64]int64
}
