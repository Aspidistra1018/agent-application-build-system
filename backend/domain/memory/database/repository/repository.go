package repository

import (
	"context"

	"gorm.io/gorm"

	"github.com/coze-dev/coze-studio/backend/api/model/data/database/table"
	"github.com/coze-dev/coze-studio/backend/crossdomain/database/model"
	"github.com/coze-dev/coze-studio/backend/domain/memory/database/entity"
	"github.com/coze-dev/coze-studio/backend/domain/memory/database/internal/dal"
	"github.com/coze-dev/coze-studio/backend/domain/memory/database/internal/dal/query"
	"github.com/coze-dev/coze-studio/backend/infra/idgen"
)

func NewAgentToDatabaseDAO(db *gorm.DB, idGen idgen.IDGenerator) AgentToDatabaseDAO {
	return dal.NewAgentToDatabaseDAO(db, idGen)
}

type AgentToDatabaseDAO interface {
	BatchCreate(ctx context.Context, relations []*model.AgentToDatabase) ([]int64, error)
	BatchDelete(ctx context.Context, basicRelations []*model.AgentToDatabaseBasic) error
	ListByAgentID(ctx context.Context, agentID int64, tableType table.TableType) ([]*model.AgentToDatabase, error)
}

func NewDraftDatabaseDAO(db *gorm.DB, idGen idgen.IDGenerator) DraftDAO {
	return dal.NewDraftDatabaseDAO(db, idGen)
}

type DraftDAO interface {
	Get(ctx context.Context, id int64) (*entity.Database, error)
	List(ctx context.Context, filter *entity.DatabaseFilter, page *entity.Pagination, orderBy []*model.OrderBy) ([]*entity.Database, int64, error)
	MGet(ctx context.Context, ids []int64) ([]*entity.Database, error)

	CreateWithTX(ctx context.Context, tx *query.QueryTx, database *entity.Database, draftID, onlineID int64, physicalTableName string) (*entity.Database, error)
	UpdateWithTX(ctx context.Context, tx *query.QueryTx, database *entity.Database) (*entity.Database, error)
	DeleteWithTX(ctx context.Context, tx *query.QueryTx, id int64) error
	BatchDeleteWithTX(ctx context.Context, tx *query.QueryTx, ids []int64) error
}

func NewOnlineDatabaseDAO(db *gorm.DB, idGen idgen.IDGenerator) OnlineDAO {
	return dal.NewOnlineDatabaseDAO(db, idGen)
}

type OnlineDAO interface {
	Get(ctx context.Context, id int64) (*entity.Database, error)
	MGet(ctx context.Context, ids []int64) ([]*entity.Database, error)
	List(ctx context.Context, filter *entity.DatabaseFilter, page *entity.Pagination, orderBy []*model.OrderBy) ([]*entity.Database, int64, error)

	UpdateWithTX(ctx context.Context, tx *query.QueryTx, database *entity.Database) (*entity.Database, error)
	CreateWithTX(ctx context.Context, tx *query.QueryTx, database *entity.Database, draftID, onlineID int64, physicalTableName string) (*entity.Database, error)
	DeleteWithTX(ctx context.Context, tx *query.QueryTx, id int64) error
	BatchDeleteWithTX(ctx context.Context, tx *query.QueryTx, ids []int64) error
}
