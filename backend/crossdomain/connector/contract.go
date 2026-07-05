package connector

import (
	"context"

	model "github.com/coze-dev/coze-studio/backend/crossdomain/connector/model"
)

type Connector interface {
	List(ctx context.Context) ([]*model.Connector, error)
	GetByIDs(ctx context.Context, ids []int64) (map[int64]*model.Connector, error)
	GetByID(ctx context.Context, id int64) (*model.Connector, error)
}

var defaultSVC Connector

func DefaultSVC() Connector {
	return defaultSVC
}

func SetDefaultSVC(c Connector) {
	defaultSVC = c
}
