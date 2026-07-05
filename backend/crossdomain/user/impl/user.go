package impl

import (
	"context"

	crossuser "github.com/coze-dev/coze-studio/backend/crossdomain/user"
	"github.com/coze-dev/coze-studio/backend/domain/user/entity"
	"github.com/coze-dev/coze-studio/backend/domain/user/service"
)

var defaultSVC crossuser.User

type impl struct {
	DomainSVC service.User
}

func InitDomainService(u service.User) crossuser.User {
	defaultSVC = &impl{
		DomainSVC: u,
	}
	return defaultSVC
}

func (u *impl) GetUserSpaceList(ctx context.Context, userID int64) (spaces []*entity.Space, err error) {
	return u.DomainSVC.GetUserSpaceList(ctx, userID)
}

func (u *impl) GetUserSpaceBySpaceID(ctx context.Context, spaceID []int64) (space []*entity.Space, err error) {
	return u.DomainSVC.GetUserSpaceBySpaceID(ctx, spaceID)
}
