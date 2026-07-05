package repository

import (
	"context"

	"gorm.io/gorm"

	"github.com/coze-dev/coze-studio/backend/domain/prompt/entity"
	"github.com/coze-dev/coze-studio/backend/domain/prompt/internal/dal"
	"github.com/coze-dev/coze-studio/backend/infra/idgen"
)

func NewPromptRepo(db *gorm.DB, generator idgen.IDGenerator) PromptRepository {
	return dal.NewPromptDAO(db, generator)
}

type PromptRepository interface {
	CreatePromptResource(ctx context.Context, do *entity.PromptResource) (int64, error)
	GetPromptResource(ctx context.Context, promptID int64) (*entity.PromptResource, error)
	UpdatePromptResource(ctx context.Context, promptID int64, name, description, promptText *string) error
	DeletePromptResource(ctx context.Context, ID int64) error
}
