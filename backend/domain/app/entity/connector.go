package entity

import (
	"github.com/coze-dev/coze-studio/backend/crossdomain/app/model"
	"github.com/coze-dev/coze-studio/backend/types/consts"
)

var ConnectorIDWhiteList = []int64{
	consts.WebSDKConnectorID,
	consts.APIConnectorID,
}

type ConnectorPublishRecord = model.ConnectorPublishRecord
type PublishConfig = model.PublishConfig
type SelectedWorkflow = model.SelectedWorkflow
