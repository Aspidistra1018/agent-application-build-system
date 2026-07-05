package repository

import (
	"context"

	"gorm.io/gorm"

	"github.com/coze-dev/coze-studio/backend/domain/conversation/conversation/entity"
	"github.com/coze-dev/coze-studio/backend/domain/conversation/conversation/internal/dal"
	"github.com/coze-dev/coze-studio/backend/infra/idgen"
)

func NewConversationRepo(db *gorm.DB, idGen idgen.IDGenerator) ConversationRepo {
	return dal.NewConversationDAO(db, idGen)
}

type ConversationRepo interface {
	Create(ctx context.Context, msg *entity.Conversation) (*entity.Conversation, error)
	GetByID(ctx context.Context, id int64) (*entity.Conversation, error)
	UpdateSection(ctx context.Context, id int64) (int64, error)
	Get(ctx context.Context, userID int64, agentID int64, scene int32, connectorID int64) (*entity.Conversation, error)
	Update(ctx context.Context, req *entity.UpdateMeta) (*entity.Conversation, error)
	Delete(ctx context.Context, id int64) (int64, error)
	List(ctx context.Context, req *entity.ListMeta) ([]*entity.Conversation, bool, error)
}
