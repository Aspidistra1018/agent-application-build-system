package impl

import (
	"context"

	crossconnector "github.com/coze-dev/coze-studio/backend/crossdomain/connector"
	model "github.com/coze-dev/coze-studio/backend/crossdomain/connector/model"
	connector "github.com/coze-dev/coze-studio/backend/domain/connector/service"
)

var defaultSVC crossconnector.Connector

func InitDomainService(c connector.Connector) crossconnector.Connector {
	defaultSVC = &impl{
		DomainSVC: c,
	}

	return defaultSVC
}

func DefaultSVC() crossconnector.Connector {
	return defaultSVC
}

type impl struct {
	DomainSVC connector.Connector
}

func (c *impl) GetByIDs(ctx context.Context, ids []int64) (map[int64]*model.Connector, error) {
	res, err := c.DomainSVC.GetByIDs(ctx, ids)
	if err != nil {
		return nil, err
	}

	ret := make(map[int64]*model.Connector, len(res))
	for _, v := range res {
		ret[v.ID] = v.Connector
	}

	return ret, nil
}

func (c *impl) List(ctx context.Context) ([]*model.Connector, error) {
	res, err := c.DomainSVC.List(ctx)
	if err != nil {
		return nil, err
	}

	ret := make([]*model.Connector, 0, len(res))
	for _, v := range res {
		ret = append(ret, v.Connector)
	}

	return ret, nil
}

func (c *impl) GetByID(ctx context.Context, id int64) (*model.Connector, error) {
	info, err := c.DomainSVC.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	return info.Connector, nil
}
