package crossupload

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/domain/upload/service"
)

var defaultSVC Uploader

//go:generate  mockgen -destination uploadmock/upload_mock.go --package uploadmock -source upload.go
type Uploader interface {
	GetFile(ctx context.Context, req *service.GetFileRequest) (resp *service.GetFileResponse, err error)
}

func SetDefaultSVC(s Uploader) {
	defaultSVC = s
}

func DefaultSVC() Uploader {
	return defaultSVC
}
