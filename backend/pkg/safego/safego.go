package safego

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/pkg/goutil"
)

func Go(ctx context.Context, fn func()) {
	go func() {
		defer goutil.Recovery(ctx)

		fn()
	}()
}
