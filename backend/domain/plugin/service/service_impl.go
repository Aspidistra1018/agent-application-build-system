package service

import (
	"context"

	"gorm.io/gorm"

	"github.com/coze-dev/coze-studio/backend/domain/plugin/repository"
	"github.com/coze-dev/coze-studio/backend/infra/idgen"
	"github.com/coze-dev/coze-studio/backend/infra/storage"
	"github.com/coze-dev/coze-studio/backend/pkg/safego"
)

type Components struct {
	IDGen      idgen.IDGenerator
	DB         *gorm.DB
	OSS        storage.Storage
	PluginRepo repository.PluginRepository
	ToolRepo   repository.ToolRepository
	OAuthRepo  repository.OAuthRepository
}

func NewService(components *Components) PluginService {
	impl := &pluginServiceImpl{
		db:         components.DB,
		oss:        components.OSS,
		pluginRepo: components.PluginRepo,
		toolRepo:   components.ToolRepo,
		oauthRepo:  components.OAuthRepo,
	}

	initOnce.Do(func() {
		ctx := context.Background()
		safego.Go(ctx, func() {
			impl.processOAuthAccessToken(ctx)
		})
	})

	return impl
}

type pluginServiceImpl struct {
	db         *gorm.DB
	oss        storage.Storage
	pluginRepo repository.PluginRepository
	toolRepo   repository.ToolRepository
	oauthRepo  repository.OAuthRepository
}
