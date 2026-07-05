package connector

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/domain/connector/entity"
	connector "github.com/coze-dev/coze-studio/backend/domain/connector/service"
	"github.com/coze-dev/coze-studio/backend/infra/storage"
)

type ConnectorApplicationService struct {
	DomainSVC connector.Connector
}

var ConnectorApplicationSVC *ConnectorApplicationService

func New(domainSVC connector.Connector, tosClient storage.Storage) *ConnectorApplicationService {
	return &ConnectorApplicationService{
		DomainSVC: domainSVC,
	}
}

func (c *ConnectorApplicationService) List(ctx context.Context) ([]*entity.Connector, error) {
	return c.DomainSVC.List(ctx)
}
