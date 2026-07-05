

package wrap

import (
	"context"

	"github.com/cloudwego/eino-ext/components/embedding/ollama"

	contract "github.com/coze-dev/coze-studio/backend/infra/embedding"
)

func NewOllamaEmbedder(ctx context.Context, config *ollama.EmbeddingConfig, dimensions int64, batchSize int) (contract.Embedder, error) {
	emb, err := ollama.NewEmbedder(ctx, config)
	if err != nil {
		return nil, err
	}
	return &denseOnlyWrap{dims: dimensions, batchSize: batchSize, Embedder: emb}, nil
}
