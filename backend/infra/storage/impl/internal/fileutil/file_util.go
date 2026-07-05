package fileutil

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/infra/storage"
	"github.com/coze-dev/coze-studio/backend/pkg/taskgroup"
)

func AssembleFileUrl(ctx context.Context, urlExpire *int64, files []*storage.FileInfo, s storage.Storage) ([]*storage.FileInfo, error) {
	if files == nil || s == nil {
		return files, nil
	}

	taskGroup := taskgroup.NewTaskGroup(ctx, 5)
	for idx := range files {
		f := files[idx]
		expire := int64(7 * 60 * 60 * 24)
		if urlExpire != nil && *urlExpire > 0 {
			expire = *urlExpire
		}

		taskGroup.Go(func() error {
			url, err := s.GetObjectUrl(ctx, f.Key, storage.WithExpire(expire))
			if err != nil {
				return err
			}

			f.URL = url

			return nil
		})
	}

	if err := taskGroup.Wait(); err != nil {
		return nil, err
	}

	return files, nil
}
