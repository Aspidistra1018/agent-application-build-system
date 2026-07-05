package oceanbase

import (
	"context"
	"os"
	"strconv"

	"github.com/coze-dev/coze-studio/backend/infra/document/searchstore"
	"github.com/coze-dev/coze-studio/backend/infra/embedding"
	"github.com/coze-dev/coze-studio/backend/pkg/logs"
)

func CreateOceanBaseVectorStore(
	config Config,
	embedding embedding.Embedder,
) (searchstore.Manager, error) {
	factory := NewFactory(&config)

	manager, err := factory.CreateManager(context.Background(), embedding)
	if err != nil {
		return nil, err
	}

	logs.Infof("Successfully created OceanBase vector store with type: %s", searchstore.TypeVectorStore)
	return manager, nil
}

func CreateOceanBaseVectorStoreWithEnv(
	embedding embedding.Embedder,
) (searchstore.Manager, error) {
	config := Config{
		Host:     getEnv("OCEANBASE_HOST", "localhost"),
		Port:     getEnvAsInt("OCEANBASE_PORT", 2881),
		User:     getEnv("OCEANBASE_USER", "root"),
		Password: getEnv("OCEANBASE_PASSWORD", ""),
		Database: getEnv("OCEANBASE_DATABASE", "test"),
	}

	return CreateOceanBaseVectorStore(config, embedding)
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	return defaultValue
}

func getEnvAsBool(key string, defaultValue bool) bool {
	if value := os.Getenv(key); value != "" {
		if boolValue, err := strconv.ParseBool(value); err == nil {
			return boolValue
		}
	}
	return defaultValue
}
