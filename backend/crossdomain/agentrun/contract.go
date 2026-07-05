package crossagentrun

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/domain/conversation/agentrun/entity"
)

//go:generate  mockgen -destination agentrunmock/agent_run_mock.go --package agentrunmock -source agent_run.go
type AgentRun interface {
	Delete(ctx context.Context, runID []int64) error
	List(ctx context.Context, ListMeta *entity.ListRunRecordMeta) ([]*entity.RunRecordMeta, error)
	Create(ctx context.Context, runRecord *entity.AgentRunMeta) (*entity.RunRecordMeta, error)
}

var defaultSVC AgentRun

func DefaultSVC() AgentRun {
	return defaultSVC
}

func SetDefaultSVC(svc AgentRun) {
	defaultSVC = svc
}
