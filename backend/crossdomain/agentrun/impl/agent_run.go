package impl

import (
	"context"

	crossagentrun "github.com/coze-dev/coze-studio/backend/crossdomain/agentrun"
	"github.com/coze-dev/coze-studio/backend/domain/conversation/agentrun/entity"
	agentrun "github.com/coze-dev/coze-studio/backend/domain/conversation/agentrun/service"
)

type AgentRun interface {
	Delete(ctx context.Context, runID []int64) error
}

var defaultSVC crossagentrun.AgentRun

type impl struct {
	DomainSVC agentrun.Run
}

func InitDomainService(c agentrun.Run) crossagentrun.AgentRun {
	defaultSVC = &impl{
		DomainSVC: c,
	}

	return defaultSVC
}

func (c *impl) Delete(ctx context.Context, runID []int64) error {
	return c.DomainSVC.Delete(ctx, runID)
}

func (c *impl) List(ctx context.Context, meta *entity.ListRunRecordMeta) ([]*entity.RunRecordMeta, error) {
	return c.DomainSVC.List(ctx, meta)
}

func (c *impl) Create(ctx context.Context, meta *entity.AgentRunMeta) (*entity.RunRecordMeta, error) {
	return c.DomainSVC.Create(ctx, meta)
}
