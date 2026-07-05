package repository

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/domain/plugin/dto"
)

//go:generate mockgen -source=./oauth_repository.go -package=mock_plugin_oauth -destination=./mock/mock_oauth_repository.go
type OAuthRepository interface {
	GetAuthorizationCode(ctx context.Context, meta *dto.AuthorizationCodeMeta) (info *dto.AuthorizationCodeInfo, exist bool, err error)
	UpsertAuthorizationCode(ctx context.Context, info *dto.AuthorizationCodeInfo) (err error)
	UpdateAuthorizationCodeLastActiveAt(ctx context.Context, meta *dto.AuthorizationCodeMeta, lastActiveAtMs int64) (err error)
	BatchDeleteAuthorizationCodeByIDs(ctx context.Context, ids []int64) (err error)
	DeleteAuthorizationCode(ctx context.Context, meta *dto.AuthorizationCodeMeta) (err error)
	GetAuthorizationCodeRefreshTokens(ctx context.Context, nextRefreshAt int64, limit int) (infos []*dto.AuthorizationCodeInfo, err error)
	DeleteExpiredAuthorizationCodeTokens(ctx context.Context, expireAt int64, limit int) (err error)
	DeleteInactiveAuthorizationCodeTokens(ctx context.Context, lastActiveAt int64, limit int) (err error)
}
