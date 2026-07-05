package llm

import (
	"context"

	"github.com/cloudwego/eino/components/tool"
	"github.com/cloudwego/eino/schema"

	crossplugin "github.com/coze-dev/coze-studio/backend/crossdomain/plugin"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/internal/execute"
)

type pluginInvokableTool struct {
	pluginInvokableTool crossplugin.InvokableTool
}

func newInvokableTool(pl crossplugin.InvokableTool) tool.InvokableTool {
	return &pluginInvokableTool{
		pluginInvokableTool: pl,
	}
}

func (p pluginInvokableTool) Info(ctx context.Context) (*schema.ToolInfo, error) {
	return p.pluginInvokableTool.Info(ctx)
}

func (p pluginInvokableTool) InvokableRun(ctx context.Context, argumentsInJSON string, opts ...tool.Option) (string, error) {
	execCfg := execute.GetExecuteConfig(opts...)
	return p.pluginInvokableTool.PluginInvoke(ctx, argumentsInJSON, execCfg)
}
