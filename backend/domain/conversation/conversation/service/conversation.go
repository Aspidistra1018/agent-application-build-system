package conversation

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/domain/conversation/conversation/entity"
)

//go:generate mockgen -destination ../../../../internal/mock/domain/conversation/conversation/conversation_mock.go --package conversation -source conversation.go
type Conversation interface {
	Create(ctx context.Context, req *entity.CreateMeta) (*entity.Conversation, error)
	GetByID(ctx context.Context, id int64) (*entity.Conversation, error)
	NewConversationCtx(ctx context.Context, req *entity.NewConversationCtxRequest) (*entity.NewConversationCtxResponse, error)
	GetCurrentConversation(ctx context.Context, req *entity.GetCurrent) (*entity.Conversation, error)
	Delete(ctx context.Context, id int64) error
	List(ctx context.Context, req *entity.ListMeta) ([]*entity.Conversation, bool, error)
	Update(ctx context.Context, req *entity.UpdateMeta) (*entity.Conversation, error)
}
