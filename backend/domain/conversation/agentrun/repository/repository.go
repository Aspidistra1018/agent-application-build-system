package repository

import (
	"context"

	"gorm.io/gorm"

	"github.com/coze-dev/coze-studio/backend/domain/conversation/agentrun/entity"
	"github.com/coze-dev/coze-studio/backend/domain/conversation/agentrun/internal/dal"
	"github.com/coze-dev/coze-studio/backend/infra/idgen"
)

func NewRunRecordRepo(db *gorm.DB, idGen idgen.IDGenerator) RunRecordRepo {

	return dal.NewRunRecordDAO(db, idGen)
}

type RunRecordRepo interface {
	Create(ctx context.Context, runMeta *entity.AgentRunMeta) (*entity.RunRecordMeta, error)
	GetByID(ctx context.Context, id int64) (*entity.RunRecordMeta, error)
	Cancel(ctx context.Context, req *entity.CancelRunMeta) (*entity.RunRecordMeta, error)
	Delete(ctx context.Context, id []int64) error
	UpdateByID(ctx context.Context, id int64, update *entity.UpdateMeta) error
	List(ctx context.Context, meta *entity.ListRunRecordMeta) ([]*entity.RunRecordMeta, error)
}
