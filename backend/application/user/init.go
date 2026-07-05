package user

import (
	"context"

	"gorm.io/gorm"

	"github.com/coze-dev/coze-studio/backend/domain/user/repository"
	"github.com/coze-dev/coze-studio/backend/domain/user/service"
	"github.com/coze-dev/coze-studio/backend/infra/idgen"
	"github.com/coze-dev/coze-studio/backend/infra/storage"
)

func InitService(ctx context.Context, db *gorm.DB, oss storage.Storage, idgen idgen.IDGenerator) *UserApplicationService {
	UserApplicationSVC.DomainSVC = service.NewUserDomain(ctx, &service.Components{
		IconOSS:   oss,
		IDGen:     idgen,
		UserRepo:  repository.NewUserRepo(db),
		SpaceRepo: repository.NewSpaceRepo(db),
	})
	UserApplicationSVC.oss = oss

	return UserApplicationSVC
}
