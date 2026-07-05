package oceanbase

import (
	"context"
	"fmt"

	"github.com/coze-dev/coze-studio/backend/infra/document/searchstore"
	"github.com/coze-dev/coze-studio/backend/infra/embedding"
	"github.com/coze-dev/coze-studio/backend/infra/oceanbase"
	"github.com/coze-dev/coze-studio/backend/pkg/logs"
)

type Factory struct {
	config *Config
}

func NewFactory(config *Config) *Factory {
	return &Factory{
		config: config,
	}
}

func (f *Factory) CreateManager(ctx context.Context, embedder embedding.Embedder) (searchstore.Manager, error) {
	if err := f.config.Validate(); err != nil {
		return nil, fmt.Errorf("invalid configuration: %w", err)
	}

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		f.config.User, f.config.Password, f.config.Host, f.config.Port, f.config.Database)

	client, err := oceanbase.NewOceanBaseClient(dsn)
	if err != nil {
		return nil, fmt.Errorf("failed to create OceanBase client: %w", err)
	}

	managerConfig := &ManagerConfig{
		Client:         client,
		Embedding:      embedder,
		BatchSize:      f.config.BatchSize,
		EnableCache:    f.config.EnableCache,
		CacheTTL:       f.config.CacheTTL,
		MaxConnections: f.config.MaxOpenConns,
		ConnTimeout:    f.config.ConnTimeout,
	}

	manager, err := NewManager(managerConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to create OceanBase manager: %w", err)
	}

	logs.CtxInfof(ctx, "Created OceanBase vector store manager with config: %s:%d/%s (dimension: %d, cache: %v, batchSize: %d)",
		f.config.Host, f.config.Port, f.config.Database, f.config.VectorDimension,
		f.config.EnableCache, f.config.BatchSize)

	return manager, nil
}

func (f *Factory) GetType() searchstore.SearchStoreType {
	return searchstore.TypeVectorStore
}

func (f *Factory) GetConfig() *Config {
	return f.config
}
