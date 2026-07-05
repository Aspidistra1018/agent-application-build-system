package conversation

import (
	"context"

	model "github.com/coze-dev/coze-studio/backend/crossdomain/conversation/model"
	"github.com/coze-dev/coze-studio/backend/domain/conversation/conversation/entity"
)

//go:generate  mockgen -destination conversationmock/conversation_mock.go --package conversationmock -source conversation.go
type Conversation interface {
	GetCurrentConversation(ctx context.Context, req *model.GetCurrent) (*model.Conversation, error)
	CreateConversation(ctx context.Context, req *entity.CreateMeta) (*entity.Conversation, error)
	ClearConversationHistory(ctx context.Context, req *ClearConversationHistoryReq) (*entity.NewConversationCtxResponse, error)
	GetByID(ctx context.Context, id int64) (*entity.Conversation, error)
}

var defaultSVC Conversation

func DefaultSVC() Conversation {
	return defaultSVC
}

func SetDefaultSVC(c Conversation) {
	defaultSVC = c
}

type ClearConversationHistoryReq struct {
	ConversationID int64
}
