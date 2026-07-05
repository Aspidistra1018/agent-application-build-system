package repository

import (
	"context"

	"gorm.io/gorm"

	"github.com/coze-dev/coze-studio/backend/domain/shortcutcmd/entity"
	"github.com/coze-dev/coze-studio/backend/domain/shortcutcmd/internal/dal"
	"github.com/coze-dev/coze-studio/backend/infra/idgen"
)

func NewShortCutCmdRepo(db *gorm.DB, idGen idgen.IDGenerator) ShortCutCmdRepo {
	return dal.NewShortCutCmdDAO(db, idGen)
}

type ShortCutCmdRepo interface {
	List(ctx context.Context, lm *entity.ListMeta) ([]*entity.ShortcutCmd, error)
	Create(ctx context.Context, shortcut *entity.ShortcutCmd) (*entity.ShortcutCmd, error)
	Update(ctx context.Context, shortcut *entity.ShortcutCmd) (*entity.ShortcutCmd, error)
	GetByCmdID(ctx context.Context, cmdID int64, isOnline int32) (*entity.ShortcutCmd, error)
	PublishCMDs(ctx context.Context, objID int64, cmdIDs []int64) error
}
