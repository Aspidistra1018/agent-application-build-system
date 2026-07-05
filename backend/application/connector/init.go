package connector

import (
	connector "github.com/coze-dev/coze-studio/backend/domain/connector/service"
	"github.com/coze-dev/coze-studio/backend/infra/storage"
)

func InitService(tos storage.Storage) *ConnectorApplicationService {
	connectorDomainSVC := connector.NewService(tos)
	ConnectorApplicationSVC = New(connectorDomainSVC, tos)

	return ConnectorApplicationSVC
}
