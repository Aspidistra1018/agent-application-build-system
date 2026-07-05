package impl

import (
	"context"

	crossupload "github.com/coze-dev/coze-studio/backend/crossdomain/upload"
	"github.com/coze-dev/coze-studio/backend/domain/upload/service"
)

var defaultSVC crossupload.Uploader

type impl struct {
	DomainSVC service.UploadService
}

func InitDomainService(c service.UploadService) crossupload.Uploader {
	defaultSVC = &impl{
		DomainSVC: c,
	}

	return defaultSVC
}

func (c *impl) GetFile(ctx context.Context, req *service.GetFileRequest) (resp *service.GetFileResponse, err error) {
	return c.DomainSVC.GetFile(ctx, req)
}
