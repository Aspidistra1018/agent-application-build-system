package impl

import (
	"context"

	crosssearch "github.com/coze-dev/coze-studio/backend/crossdomain/search"
	model "github.com/coze-dev/coze-studio/backend/crossdomain/search/model"
	"github.com/coze-dev/coze-studio/backend/domain/search/service"
)

var defaultSVC crosssearch.Search

type impl struct {
	DomainSVC crosssearch.Search
}

func (i impl) SearchResources(ctx context.Context, req *model.SearchResourcesRequest) (resp *model.SearchResourcesResponse, err error) {
	return i.DomainSVC.SearchResources(ctx, req)
}

func InitDomainService(c service.Search) crosssearch.Search {
	defaultSVC = &impl{
		DomainSVC: c,
	}

	return defaultSVC
}
