package impl

import (
	"context"

	crossconversation "github.com/coze-dev/coze-studio/backend/crossdomain/conversation"
	model "github.com/coze-dev/coze-studio/backend/crossdomain/conversation/model"
	"github.com/coze-dev/coze-studio/backend/domain/conversation/conversation/entity"
	conversation "github.com/coze-dev/coze-studio/backend/domain/conversation/conversation/service"
)

var defaultSVC crossconversation.Conversation

type impl struct {
	DomainSVC conversation.Conversation
}

func InitDomainService(c conversation.Conversation) crossconversation.Conversation {
	defaultSVC = &impl{
		DomainSVC: c,
	}
	return defaultSVC
}

func (s *impl) CreateConversation(ctx context.Context, req *entity.CreateMeta) (*entity.Conversation, error) {
	return s.DomainSVC.Create(ctx, req)
}

func (s *impl) ClearConversationHistory(ctx context.Context, req *crossconversation.ClearConversationHistoryReq) (*entity.NewConversationCtxResponse, error) {
	return s.DomainSVC.NewConversationCtx(ctx, &entity.NewConversationCtxRequest{
		ID: req.ConversationID,
	})
}

func (s *impl) GetCurrentConversation(ctx context.Context, req *model.GetCurrent) (*model.Conversation, error) {
	return s.DomainSVC.GetCurrentConversation(ctx, req)
}

func (s *impl) GetByID(ctx context.Context, id int64) (*entity.Conversation, error) {
	return s.DomainSVC.GetByID(ctx, id)
}
