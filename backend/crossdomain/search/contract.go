package search

import (
	"context"

	model "github.com/coze-dev/coze-studio/backend/crossdomain/search/model"
)

type Search interface {
	SearchResources(ctx context.Context, req *model.SearchResourcesRequest) (resp *model.SearchResourcesResponse, err error)
}

var defaultSVC Search

func DefaultSVC() Search {
	return defaultSVC
}

func SetDefaultSVC(svc Search) {
	defaultSVC = svc
}
