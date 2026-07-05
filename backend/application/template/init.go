package template

import (
	"context"

	"gorm.io/gorm"

	"github.com/coze-dev/coze-studio/backend/domain/template/repository"
	"github.com/coze-dev/coze-studio/backend/infra/idgen"
	"github.com/coze-dev/coze-studio/backend/infra/storage"
)

type ServiceComponents struct {
	DB      *gorm.DB
	IDGen   idgen.IDGenerator
	Storage storage.Storage
}

func InitService(ctx context.Context, components *ServiceComponents) *ApplicationService {

	tRepo := repository.NewTemplateDAO(components.DB, components.IDGen)

	ApplicationSVC.templateRepo = tRepo
	ApplicationSVC.storage = components.Storage

	return ApplicationSVC
}
