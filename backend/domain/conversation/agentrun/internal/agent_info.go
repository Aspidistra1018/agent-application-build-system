package internal

import (
	"context"

	crossagent "github.com/coze-dev/coze-studio/backend/crossdomain/agent"
	singleagent "github.com/coze-dev/coze-studio/backend/crossdomain/agent/model"
	"github.com/coze-dev/coze-studio/backend/domain/conversation/agentrun/entity"
	"github.com/coze-dev/coze-studio/backend/pkg/errorx"
	"github.com/coze-dev/coze-studio/backend/pkg/lang/ptr"
	"github.com/coze-dev/coze-studio/backend/types/errno"
)

func getAgentHistoryRounds(agentInfo *singleagent.SingleAgent) int32 {
	var conversationTurns int32 = entity.ConversationTurnsDefault
	if agentInfo != nil && agentInfo.ModelInfo != nil && agentInfo.ModelInfo.ShortMemoryPolicy != nil && ptr.From(agentInfo.ModelInfo.ShortMemoryPolicy.HistoryRound) > 0 {
		conversationTurns = ptr.From(agentInfo.ModelInfo.ShortMemoryPolicy.HistoryRound)
	}
	return conversationTurns
}

func getAgentInfo(ctx context.Context, agentID int64, isDraft bool, connID int64) (*singleagent.SingleAgent, error) {
	agentInfo, err := crossagent.DefaultSVC().ObtainAgentByIdentity(ctx, &singleagent.AgentIdentity{
		AgentID:     agentID,
		IsDraft:     isDraft,
		ConnectorID: connID,
	})
	if err != nil {
		return nil, err
	}
	if agentInfo == nil {
		return nil, errorx.New(errno.ErrAgentNotExists)
	}

	return agentInfo, nil
}
