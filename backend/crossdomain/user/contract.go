package crossuser

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/domain/user/entity"
)

type EntitySpace = entity.Space

//go:generate mockgen -destination ../../internal/mock/crossdomain/crossuser/crossuser.go --package mockCrossUser -source contract.go
type User interface {
	GetUserSpaceList(ctx context.Context, userID int64) (spaces []*EntitySpace, err error)
	GetUserSpaceBySpaceID(ctx context.Context, spaceID []int64) (space []*EntitySpace, err error)
}

var defaultSVC User

func DefaultSVC() User {
	return defaultSVC
}

func SetDefaultSVC(u User) {
	defaultSVC = u
}
