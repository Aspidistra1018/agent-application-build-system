package variables

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/api/model/data/variable/kvmemory"
	"github.com/coze-dev/coze-studio/backend/api/model/data/variable/project_memory"
	variables "github.com/coze-dev/coze-studio/backend/crossdomain/variables/model"
	"github.com/coze-dev/coze-studio/backend/domain/memory/variables/entity"
)

// TODO (@fanlv): Parameter references need to be modified.
type Variables interface {
	GetVariableInstance(ctx context.Context, e *variables.UserVariableMeta, keywords []string) ([]*kvmemory.KVItem, error)
	SetVariableInstance(ctx context.Context, e *variables.UserVariableMeta, items []*kvmemory.KVItem) ([]string, error)
	DecryptSysUUIDKey(ctx context.Context, encryptSysUUIDKey string) *variables.UserVariableMeta
	GetVariableChannelInstance(ctx context.Context, e *variables.UserVariableMeta, keywords []string, varChannel *project_memory.VariableChannel) ([]*kvmemory.KVItem, error)
	GetProjectVariablesMeta(ctx context.Context, projectID, version string) (*entity.VariablesMeta, error)
	GetAgentVariableMeta(ctx context.Context, agentID int64, version string) (*entity.VariablesMeta, error)
}

var defaultSVC Variables

func DefaultSVC() Variables {
	return defaultSVC
}

func SetDefaultSVC(svc Variables) {
	defaultSVC = svc
}
