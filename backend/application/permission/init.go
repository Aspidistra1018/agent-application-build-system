package permission

import (
	"github.com/coze-dev/coze-studio/backend/domain/permission"
)

type ServiceComponents struct {
}

type PermissionApplicationService struct {
	DomainSVC permission.Permission
}

func InitService(components *ServiceComponents) *PermissionApplicationService {
	domainSVC := permission.NewService()

	return &PermissionApplicationService{
		DomainSVC: domainSVC,
	}
}
