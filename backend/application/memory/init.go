package memory

import (
	"gorm.io/gorm"

	database "github.com/coze-dev/coze-studio/backend/domain/memory/database/service"
	"github.com/coze-dev/coze-studio/backend/domain/memory/variables/repository"
	variables "github.com/coze-dev/coze-studio/backend/domain/memory/variables/service"
	search "github.com/coze-dev/coze-studio/backend/domain/search/service"
	"github.com/coze-dev/coze-studio/backend/infra/cache"
	"github.com/coze-dev/coze-studio/backend/infra/idgen"
	"github.com/coze-dev/coze-studio/backend/infra/rdb"
	rdbService "github.com/coze-dev/coze-studio/backend/infra/rdb/impl/rdb"
	"github.com/coze-dev/coze-studio/backend/infra/storage"
)

type MemoryApplicationServices struct {
	VariablesDomainSVC variables.Variables
	DatabaseDomainSVC  database.Database
	RDBDomainSVC       rdb.RDB
}

type ServiceComponents struct {
	IDGen                  idgen.IDGenerator
	DB                     *gorm.DB
	EventBus               search.ResourceEventBus
	TosClient              storage.Storage
	ResourceDomainNotifier search.ResourceEventBus
	CacheCli               cache.Cmdable
}

func InitService(c *ServiceComponents) *MemoryApplicationServices {
	repo := repository.NewVariableRepo(c.DB, c.IDGen)
	variablesDomainSVC := variables.NewService(repo)
	rdbSVC := rdbService.NewService(c.DB, c.IDGen)
	databaseDomainSVC := database.NewService(rdbSVC, c.DB, c.IDGen, c.TosClient, c.CacheCli)

	VariableApplicationSVC.DomainSVC = variablesDomainSVC
	DatabaseApplicationSVC.DomainSVC = databaseDomainSVC
	DatabaseApplicationSVC.eventbus = c.ResourceDomainNotifier

	return &MemoryApplicationServices{
		VariablesDomainSVC: variablesDomainSVC,
		DatabaseDomainSVC:  databaseDomainSVC,
		RDBDomainSVC:       rdbSVC,
	}
}
