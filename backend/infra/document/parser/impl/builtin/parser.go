package builtin

import (
	"context"
	"io"

	"github.com/cloudwego/eino/components/document/parser"
	"github.com/cloudwego/eino/schema"
)

type Parser struct {
	ParseFn
}

func (p Parser) Parse(ctx context.Context, reader io.Reader, opts ...parser.Option) ([]*schema.Document, error) {
	return p.ParseFn(ctx, reader, opts...)
}

type ParseFn func(ctx context.Context, reader io.Reader, opts ...parser.Option) (docs []*schema.Document, err error)
