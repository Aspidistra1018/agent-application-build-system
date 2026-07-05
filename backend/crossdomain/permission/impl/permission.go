package crosspermission

import (
	"context"

	crosspermission "github.com/coze-dev/coze-studio/backend/crossdomain/permission"
	"github.com/coze-dev/coze-studio/backend/crossdomain/permission/model"
	"github.com/coze-dev/coze-studio/backend/domain/permission"
)

type impl struct {
	DomainSVC permission.Permission
}

func InitDomainService(domainSVC permission.Permission) crosspermission.Permission {
	return &impl{
		DomainSVC: domainSVC,
	}
}

func (i *impl) CheckAuthz(ctx context.Context, req *model.CheckAuthzData) (*model.CheckAuthzResult, error) {
	return i.DomainSVC.CheckAuthz(ctx, req)
}
