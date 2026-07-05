package service

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/domain/shortcutcmd/entity"
)

//go:generate mockgen -destination ../../../internal/mock/domain/shortcutcmd/shortcut_cmd_mock.go --package shortcutcmd -source shortcut_cmd.go
type ShortcutCmd interface {
	ListCMD(ctx context.Context, lm *entity.ListMeta) ([]*entity.ShortcutCmd, error)
	CreateCMD(ctx context.Context, shortcut *entity.ShortcutCmd) (*entity.ShortcutCmd, error)
	UpdateCMD(ctx context.Context, shortcut *entity.ShortcutCmd) (*entity.ShortcutCmd, error)
	GetByCmdID(ctx context.Context, cmdID int64, isOnline int32) (*entity.ShortcutCmd, error)
	PublishCMDs(ctx context.Context, objID int64, cmdIDs []int64) error
}
