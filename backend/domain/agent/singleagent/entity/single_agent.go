package entity

import (
	model "github.com/coze-dev/coze-studio/backend/crossdomain/agent/model"
)

// Use composition instead of aliasing for domain entities to enhance extensibility
type SingleAgent struct {
	*model.SingleAgent
}

type AgentIdentity = model.AgentIdentity

type ExecuteRequest = model.ExecuteRequest

type InterruptInfo = model.InterruptInfo

type DuplicateInfo struct {
	UserID     int64
	SpaceID    int64
	NewAgentID int64
	DraftAgent *SingleAgent
}
