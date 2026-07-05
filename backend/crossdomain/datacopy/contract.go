package datacopy

import (
	"context"

	"gorm.io/gorm"

	"github.com/coze-dev/coze-studio/backend/domain/datacopy"
)

type DataCopy interface {
	CheckAndGenCopyTask(ctx context.Context, req *datacopy.CheckAndGenCopyTaskReq) (*datacopy.CheckAndGenCopyTaskResp, error)
	UpdateCopyTask(ctx context.Context, req *datacopy.UpdateCopyTaskReq) error
	UpdateCopyTaskWithTX(ctx context.Context, req *datacopy.UpdateCopyTaskReq, tx *gorm.DB) error
}

var defaultSVC DataCopy

func DefaultSVC() DataCopy {
	return defaultSVC
}

func SetDefaultSVC(c DataCopy) {
	defaultSVC = c
}
