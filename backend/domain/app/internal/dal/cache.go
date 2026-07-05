package dal

import (
	"context"
	"errors"
	"time"

	"github.com/coze-dev/coze-studio/backend/infra/cache"
	"github.com/coze-dev/coze-studio/backend/pkg/lang/ptr"
)

type AppCache struct {
	cacheCli cache.Cmdable
}

func NewAppCache(cacheCli cache.Cmdable) *AppCache {
	return &AppCache{
		cacheCli: cacheCli,
	}
}

func (a *AppCache) Get(ctx context.Context, key string) (value string, exist bool, err error) {
	cmd := a.cacheCli.Get(ctx, key)
	if cmd.Err() != nil {
		if errors.Is(cmd.Err(), cache.Nil) {
			return "", false, nil
		}
		return "", false, cmd.Err()
	}

	return cmd.Val(), true, nil
}

func (a *AppCache) Set(ctx context.Context, key string, value string, expiration *time.Duration) (err error) {
	_expiration := ptr.FromOrDefault(expiration, 0)

	cmd := a.cacheCli.Set(ctx, key, value, _expiration)

	return cmd.Err()
}
