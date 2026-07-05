package repository

import (
	"context"

	"gorm.io/gorm"

	"github.com/coze-dev/coze-studio/backend/domain/upload/entity"
	"github.com/coze-dev/coze-studio/backend/domain/upload/internal/dal/dao"
)

func NewFilesRepo(db *gorm.DB) FilesRepo {
	return dao.NewFilesDAO(db)
}

//go:generate mockgen -destination ../internal/mock/dal/dao/knowledge_document.go --package dao -source knowledge_document.go
type FilesRepo interface {
	Create(ctx context.Context, file *entity.File) error
	BatchCreate(ctx context.Context, files []*entity.File) error
	Delete(ctx context.Context, id int64) error
	GetByID(ctx context.Context, id int64) (*entity.File, error)
	MGetByIDs(ctx context.Context, ids []int64) ([]*entity.File, error)
}
