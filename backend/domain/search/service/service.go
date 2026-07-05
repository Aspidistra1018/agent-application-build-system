package service

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/domain/search/entity"
)

type ProjectEventBus interface {
	PublishProject(ctx context.Context, event *entity.ProjectDomainEvent) error
}

type ResourceEventBus interface {
	PublishResources(ctx context.Context, event *entity.ResourceDomainEvent) error
}

type Search interface {
	SearchProjects(ctx context.Context, req *entity.SearchProjectsRequest) (resp *entity.SearchProjectsResponse, err error)
	SearchResources(ctx context.Context, req *entity.SearchResourcesRequest) (resp *entity.SearchResourcesResponse, err error)
}
