package progressbar

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/infra/cache"
)

// ProgressBar is the interface for the progress bar.
type ProgressBar interface {
	AddN(n int) error
	ReportError(err error) error
	GetProgress(ctx context.Context) (percent int, remainSec int, errMsg string)
}

var New func(ctx context.Context, pkID int64, total int64, CacheCli cache.Cmdable, needInit bool) ProgressBar

const (
	ProcessDone = 100
	ProcessInit = 0
)
