package nl2sql

import (
	"context"

	"github.com/cloudwego/eino/schema"

	"github.com/coze-dev/coze-studio/backend/infra/document"
)

//go:generate  mockgen -destination ../../../internal/mock/infra/nl2sql_mock/nl2sql_mock.go -package mock -source nl2sql.go Factory
type NL2SQL interface {
	NL2SQL(ctx context.Context, messages []*schema.Message, tables []*document.TableSchema, opts ...Option) (sql string, err error)
}
