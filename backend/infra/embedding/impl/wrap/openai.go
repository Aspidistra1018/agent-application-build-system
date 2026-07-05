package wrap

import (
	"context"

	"github.com/cloudwego/eino-ext/components/embedding/openai"

	contract "github.com/coze-dev/coze-studio/backend/infra/embedding"
)

func NewOpenAIEmbedder(ctx context.Context, config *openai.EmbeddingConfig, dimensions int64, batchSize int) (contract.Embedder, error) {
	emb, err := openai.NewEmbedder(ctx, config)
	if err != nil {
		return nil, err
	}
	return &denseOnlyWrap{dims: dimensions, batchSize: batchSize, Embedder: emb}, nil
}
