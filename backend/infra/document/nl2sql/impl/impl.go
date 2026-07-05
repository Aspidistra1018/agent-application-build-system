package impl

import (
	"context"
	"path/filepath"

	"github.com/coze-dev/coze-studio/backend/bizpkg/fileutil"
	"github.com/coze-dev/coze-studio/backend/bizpkg/llm/modelbuilder"
	"github.com/coze-dev/coze-studio/backend/infra/document/nl2sql"
	"github.com/coze-dev/coze-studio/backend/infra/document/nl2sql/impl/builtin"
)

type NL2SQL = nl2sql.NL2SQL

func New(ctx context.Context) (nl2sql.NL2SQL, error) {
	n2sChatModel, _, err := modelbuilder.GetBuiltinChatModel(ctx, "NL2SQL_")
	if err != nil {
		return nil, err
	}

	filePath := filepath.Join(fileutil.GetWorkingDirectory(), "resources/conf/prompt/nl2sql_template_jinja2.json")
	n2sTemplate, err := fileutil.ReadJinja2PromptTemplate(filePath)
	if err != nil {
		return nil, err
	}

	n2s, err := builtin.NewNL2SQL(ctx, n2sChatModel, n2sTemplate)
	if err != nil {
		return nil, err
	}

	return n2s, nil
}
