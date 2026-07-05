package wrap

import (
	"context"

	"github.com/cloudwego/eino-ext/components/embedding/gemini"

	contract "github.com/coze-dev/coze-studio/backend/infra/embedding"
)

func NewGeminiEmbedder(ctx context.Context, config *gemini.EmbeddingConfig, dimensions int64, batchSize int) (contract.Embedder, error) {
	emb, err := gemini.NewEmbedder(ctx, config)
	if err != nil {
		return nil, err
	}
	return &denseOnlyWrap{dims: dimensions, batchSize: batchSize, Embedder: emb}, nil
}
