package repository

import (
	"context"

	"gorm.io/gorm"

	message "github.com/coze-dev/coze-studio/backend/crossdomain/message/model"
	"github.com/coze-dev/coze-studio/backend/domain/conversation/message/entity"
	"github.com/coze-dev/coze-studio/backend/domain/conversation/message/internal/dal"
	"github.com/coze-dev/coze-studio/backend/infra/idgen"
)

func NewMessageRepo(db *gorm.DB, idGen idgen.IDGenerator) MessageRepo {
	return dal.NewMessageDAO(db, idGen)
}

type MessageRepo interface {
	PreCreate(ctx context.Context, msg *entity.Message) (*entity.Message, error)
	Create(ctx context.Context, msg *entity.Message) (*entity.Message, error)
	BatchCreate(ctx context.Context, msg []*entity.Message) ([]*entity.Message, error)
	List(ctx context.Context, listMeta *entity.ListMeta) ([]*entity.Message, bool, error)
	GetByRunIDs(ctx context.Context, runIDs []int64, orderBy string) ([]*entity.Message, error)
	Edit(ctx context.Context, msgID int64, message *message.Message) (int64, error)
	GetByID(ctx context.Context, msgID int64) (*entity.Message, error)
	Delete(ctx context.Context, delMeta *entity.DeleteMeta) error
}
