package middleware

import (
	"context"

	"github.com/cloudwego/hertz/pkg/app"

	"github.com/coze-dev/coze-studio/backend/pkg/ctxcache"
	"github.com/coze-dev/coze-studio/backend/types/consts"
)

func SetHostMW() app.HandlerFunc {
	return func(c context.Context, ctx *app.RequestContext) {
		ctxcache.Store(c, consts.HostKeyInCtx, string(ctx.Host()))
		ctxcache.Store(c, consts.RequestSchemeKeyInCtx, string(ctx.GetRequest().Scheme()))
		ctx.Next(c)
	}
}
