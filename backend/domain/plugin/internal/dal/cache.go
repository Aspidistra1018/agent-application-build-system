package dal

import (
	"context"
	"errors"
	"time"

	"github.com/coze-dev/coze-studio/backend/infra/cache"
	"github.com/coze-dev/coze-studio/backend/pkg/lang/ptr"
)

type OAuthCache struct {
	cacheCli cache.Cmdable
}

func NewOAuthCache(cacheCli cache.Cmdable) *OAuthCache {
	return &OAuthCache{
		cacheCli: cacheCli,
	}
}

func (o *OAuthCache) Get(ctx context.Context, key string) (value string, exist bool, err error) {
	cmd := o.cacheCli.Get(ctx, key)
	if cmd.Err() != nil {
		if errors.Is(cmd.Err(), cache.Nil) {
			return "", false, nil
		}
		return "", false, cmd.Err()
	}

	return cmd.Val(), true, nil
}

func (o *OAuthCache) Set(ctx context.Context, key string, value string, expiration *time.Duration) (err error) {
	_expiration := ptr.FromOrDefault(expiration, 0)

	cmd := o.cacheCli.Set(ctx, key, value, _expiration)

	return cmd.Err()
}
