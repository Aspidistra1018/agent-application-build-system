package impl

import (
	"context"

	knowledge "github.com/coze-dev/coze-studio/backend/crossdomain/knowledge/model"
	model "github.com/coze-dev/coze-studio/backend/crossdomain/knowledge/model"
	"github.com/coze-dev/coze-studio/backend/domain/knowledge/entity"
	"github.com/coze-dev/coze-studio/backend/domain/knowledge/processor"
	"github.com/coze-dev/coze-studio/backend/domain/knowledge/repository"
	"github.com/coze-dev/coze-studio/backend/infra/document/parser"
	"github.com/coze-dev/coze-studio/backend/infra/eventbus"
	"github.com/coze-dev/coze-studio/backend/infra/idgen"
	"github.com/coze-dev/coze-studio/backend/infra/rdb"
	"github.com/coze-dev/coze-studio/backend/infra/storage"
)

type DocProcessorConfig struct {
	UserID         int64
	SpaceID        int64
	DocumentSource entity.DocumentSource
	Documents      []*entity.Document

	KnowledgeRepo repository.KnowledgeRepo
	DocumentRepo  repository.KnowledgeDocumentRepo
	SliceRepo     repository.KnowledgeDocumentSliceRepo
	Idgen         idgen.IDGenerator
	Storage       storage.Storage
	Rdb           rdb.RDB
	Producer      eventbus.Producer
	ParseManager  parser.Manager
}

func NewDocProcessor(ctx context.Context, config *DocProcessorConfig) (p processor.DocProcessor) {
	base := &baseDocProcessor{
		ctx:            ctx,
		UserID:         config.UserID,
		SpaceID:        config.SpaceID,
		Documents:      config.Documents,
		documentSource: &config.DocumentSource,
		knowledgeRepo:  config.KnowledgeRepo,
		documentRepo:   config.DocumentRepo,
		sliceRepo:      config.SliceRepo,
		storage:        config.Storage,
		idgen:          config.Idgen,
		rdb:            config.Rdb,
		producer:       config.Producer,
		parseManager:   config.ParseManager,
	}

	switch config.DocumentSource {
	case entity.DocumentSourceCustom:
		p = &customDocProcessor{
			baseDocProcessor: *base,
		}
		if config.Documents[0].Type == model.DocumentTypeTable {
			p = &customTableProcessor{
				baseDocProcessor: *base,
			}
		}
		return p
	case entity.DocumentSourceLocal:
		if config.Documents[0].Type == knowledge.DocumentTypeTable {
			return &localTableProcessor{
				baseDocProcessor: *base,
			}
		}
		return base
	default:
		return base
	}
}
