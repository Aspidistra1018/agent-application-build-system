package crossapp

import (
	"context"

	crossapp "github.com/coze-dev/coze-studio/backend/crossdomain/app"
	"github.com/coze-dev/coze-studio/backend/domain/app/entity"
	"github.com/coze-dev/coze-studio/backend/domain/app/service"
)

type appServiceImpl struct {
	DomainSVC service.AppService
}

func InitDomainService(domainSVC service.AppService) crossapp.AppService {
	return &appServiceImpl{
		DomainSVC: domainSVC,
	}
}

func (a *appServiceImpl) GetDraftAPP(ctx context.Context, appID int64) (app *entity.APP, err error) {
	return a.DomainSVC.GetDraftAPP(ctx, appID)
}
