package impl

import (
	"context"
	"path/filepath"

	"github.com/coze-dev/coze-studio/backend/bizpkg/fileutil"
	"github.com/coze-dev/coze-studio/backend/bizpkg/llm/modelbuilder"
	"github.com/coze-dev/coze-studio/backend/infra/document/messages2query"
	"github.com/coze-dev/coze-studio/backend/infra/document/messages2query/impl/builtin"
)

type MessagesToQuery = messages2query.MessagesToQuery

func New(ctx context.Context) (MessagesToQuery, error) {
	rewriterChatModel, _, err := modelbuilder.GetBuiltinChatModel(ctx, "M2Q_")
	if err != nil {
		return nil, err
	}

	filePath := filepath.Join(fileutil.GetWorkingDirectory(), "resources/conf/prompt/messages_to_query_template_jinja2.json")
	rewriterTemplate, err := fileutil.ReadJinja2PromptTemplate(filePath)
	if err != nil {
		return nil, err
	}

	rewriter, err := builtin.NewMessagesToQuery(ctx, rewriterChatModel, rewriterTemplate)
	if err != nil {
		return nil, err
	}

	return rewriter, nil
}
