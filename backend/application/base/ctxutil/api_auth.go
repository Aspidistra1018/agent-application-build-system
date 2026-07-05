package ctxutil

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/domain/openauth/openapiauth/entity"
	"github.com/coze-dev/coze-studio/backend/pkg/ctxcache"
	"github.com/coze-dev/coze-studio/backend/types/consts"
)

func GetApiAuthFromCtx(ctx context.Context) *entity.ApiKey {
	data, ok := ctxcache.Get[*entity.ApiKey](ctx, consts.OpenapiAuthKeyInCtx)

	if !ok {
		return nil
	}
	return data
}

func MustGetUIDFromApiAuthCtx(ctx context.Context) int64 {
	apiKeyInfo := GetApiAuthFromCtx(ctx)
	if apiKeyInfo == nil {
		panic("mustGetUIDFromApiAuthCtx: apiKeyInfo is nil")
	}
	return apiKeyInfo.UserID
}
