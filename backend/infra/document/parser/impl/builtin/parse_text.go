package builtin

import (
	"context"
	"fmt"
	"io"

	"github.com/cloudwego/eino/components/document/parser"
	"github.com/cloudwego/eino/schema"

	contract "github.com/coze-dev/coze-studio/backend/infra/document/parser"
)

func ParseText(config *contract.Config) ParseFn {
	return func(ctx context.Context, reader io.Reader, opts ...parser.Option) (docs []*schema.Document, err error) {
		content, err := io.ReadAll(reader)
		if err != nil {
			return nil, err
		}

		switch config.ChunkingStrategy.ChunkType {
		case contract.ChunkTypeCustom, contract.ChunkTypeDefault:
			docs, err = ChunkCustom(ctx, string(content), config, opts...)
		default:
			return nil, fmt.Errorf("[ParseText] chunk type not support, type=%d", config.ChunkingStrategy.ChunkType)
		}
		if err != nil {
			return nil, err
		}

		return docs, nil
	}
}
