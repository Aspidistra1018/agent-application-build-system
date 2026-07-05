package plugin

import (
	"context"
	"fmt"
	"strconv"

	"github.com/cloudwego/eino/compose"

	"github.com/coze-dev/coze-studio/backend/api/model/app/bot_common"
	workflowModel "github.com/coze-dev/coze-studio/backend/crossdomain/workflow/model"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/entity"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/entity/vo"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/internal/canvas/convert"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/internal/execute"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/internal/nodes"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/internal/schema"
	"github.com/coze-dev/coze-studio/backend/pkg/errorx"
	"github.com/coze-dev/coze-studio/backend/pkg/lang/ptr"
	"github.com/coze-dev/coze-studio/backend/pkg/lang/slices"
	"github.com/coze-dev/coze-studio/backend/types/errno"
)

type Config struct {
	PluginID      int64
	ToolID        int64
	PluginVersion string
	PluginFrom    *bot_common.PluginFrom
}

func (c *Config) Adapt(ctx context.Context, n *vo.Node, opts ...nodes.AdaptOption) (*schema.NodeSchema, error) {
	ns := &schema.NodeSchema{
		Key:     vo.NodeKey(n.ID),
		Type:    entity.NodeTypePlugin,
		Name:    n.Data.Meta.Title,
		Configs: c,
	}
	inputs := n.Data.Inputs

	apiParams := slices.ToMap(inputs.APIParams, func(e *vo.Param) (string, *vo.Param) {
		return e.Name, e
	})

	ps, ok := apiParams["pluginID"]
	if !ok {
		return nil, fmt.Errorf("plugin id param is not found")
	}

	pID, err := strconv.ParseInt(ps.Input.Value.Content.(string), 10, 64)

	c.PluginID = pID
	c.PluginFrom = inputs.PluginFrom

	ps, ok = apiParams["apiID"]
	if !ok {
		return nil, fmt.Errorf("plugin id param is not found")
	}

	tID, err := strconv.ParseInt(ps.Input.Value.Content.(string), 10, 64)
	if err != nil {
		return nil, err
	}

	c.ToolID = tID

	ps, ok = apiParams["pluginVersion"]
	if !ok {
		return nil, fmt.Errorf("plugin version param is not found")
	}
	version := ps.Input.Value.Content.(string)

	c.PluginVersion = version

	if err := convert.SetInputsForNodeSchema(n, ns); err != nil {
		return nil, err
	}

	if err := convert.SetOutputTypesForNodeSchema(n, ns); err != nil {
		return nil, err
	}

	return ns, nil
}

func (c *Config) Build(_ context.Context, _ *schema.NodeSchema, _ ...schema.BuildOption) (any, error) {
	return &Plugin{
		pluginID:      c.PluginID,
		toolID:        c.ToolID,
		pluginVersion: c.PluginVersion,
		pluginFrom:    c.PluginFrom,
	}, nil
}

type Plugin struct {
	pluginID      int64
	toolID        int64
	pluginVersion string
	pluginFrom    *bot_common.PluginFrom
}

func (p *Plugin) Invoke(ctx context.Context, parameters map[string]any) (ret map[string]any, err error) {
	var exeCfg workflowModel.ExecuteConfig
	if ctxExeCfg := execute.GetExeCtx(ctx); ctxExeCfg != nil {
		exeCfg = ctxExeCfg.ExeCfg
	}
	result, err := ExecutePlugin(ctx, parameters, &vo.PluginEntity{
		PluginID:      p.pluginID,
		PluginVersion: ptr.Of(p.pluginVersion),
		PluginFrom:    p.pluginFrom,
	}, p.toolID, exeCfg)
	if err != nil {
		if extra, ok := compose.IsInterruptRerunError(err); ok {
			// TODO: temporarily replace interrupt with real error, because frontend cannot handle interrupt for now
			interruptData := extra.(*entity.InterruptEvent).InterruptData
			return nil, vo.NewError(errno.ErrAuthorizationRequired, errorx.KV("extra", interruptData))
		}
		return nil, err
	}

	return result, nil

}
