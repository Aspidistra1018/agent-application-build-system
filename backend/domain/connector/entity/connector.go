package entity

import (
	"github.com/coze-dev/coze-studio/backend/api/model/app/developer_api"
	"github.com/coze-dev/coze-studio/backend/crossdomain/connector/model"
	"github.com/coze-dev/coze-studio/backend/pkg/lang/conv"
)

// Use composition instead of aliasing for domain entities to enhance extensibility
type Connector struct {
	*model.Connector
}

func (c *Connector) ToVO() *developer_api.ConnectorInfo {
	return &developer_api.ConnectorInfo{
		ID:              conv.Int64ToStr(c.ID),
		Name:            c.Name,
		Icon:            c.URL,
		ConnectorStatus: c.ConnectorStatus,
	}
}
