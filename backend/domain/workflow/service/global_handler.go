package service

import (
	"github.com/cloudwego/eino/callbacks"

	"github.com/coze-dev/coze-studio/backend/domain/workflow/internal/execute"
)

func GetTokenCallbackHandler() callbacks.Handler {
	return execute.GetTokenCallbackHandler()
}
