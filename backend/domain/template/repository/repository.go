package repository

import (
	"context"

	"gorm.io/gorm"

	"github.com/coze-dev/coze-studio/backend/domain/template/internal/dal"
	"github.com/coze-dev/coze-studio/backend/infra/idgen"

	"github.com/coze-dev/coze-studio/backend/domain/template/entity"

	"github.com/coze-dev/coze-studio/backend/domain/template/internal/dal/model"
)

func NewTemplateDAO(db *gorm.DB, idGen idgen.IDGenerator) TemplateRepository {
	return dal.NewTemplateDAO(db, idGen)
}

// TemplateRepository defines the interface for template operations
type TemplateRepository interface {
	// Create creates a new template
	Create(ctx context.Context, template *model.Template) (int64, error)

	// List lists templates with filters
	List(ctx context.Context, filter *entity.TemplateFilter, page *entity.Pagination, orderByField string) ([]*model.Template, int64, error)
}
