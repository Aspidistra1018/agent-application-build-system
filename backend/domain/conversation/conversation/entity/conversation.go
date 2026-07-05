package entity

import (
	"github.com/coze-dev/coze-studio/backend/api/model/conversation/common"
	"github.com/coze-dev/coze-studio/backend/crossdomain/conversation/model"
)

type Conversation = model.Conversation

type CreateMeta struct {
	Name        string       `json:"name"`
	AgentID     int64        `json:"agent_id"`
	UserID      *string      `json:"user_id"`
	CreatorID   int64        `json:"creator_id"`
	ConnectorID int64        `json:"connector_id"`
	Scene       common.Scene `json:"scene"`
	Ext         string       `json:"ext"`
}

type NewConversationCtxRequest struct {
	ID int64 `json:"id"`
}

type NewConversationCtxResponse struct {
	ID        int64 `json:"id"`
	SectionID int64 `json:"section_id"`
}

type GetCurrent = model.GetCurrent

type ListMeta struct {
	CreatorID   int64        `json:"creator_id"`
	UserID      *string      `json:"user_id"`
	ConnectorID int64        `json:"connector_id"`
	Scene       common.Scene `json:"scene"`
	AgentID     int64        `json:"agent_id"`
	Limit       int          `json:"limit"`
	Page        int          `json:"page"`
	OrderBy     *string      `json:"order_by"`
}

type UpdateMeta struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}
