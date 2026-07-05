package model

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/pkg/lang/ptr"
	"github.com/coze-dev/coze-studio/backend/pkg/logs"
	"github.com/coze-dev/coze-studio/backend/pkg/sonic"
)

func (p PluginInfo) GetToolExample(ctx context.Context, toolName string) *ToolExample {
	if p.OpenapiDoc == nil ||
		p.OpenapiDoc.Components == nil ||
		len(p.OpenapiDoc.Components.Examples) == 0 {
		return nil
	}
	example, ok := p.OpenapiDoc.Components.Examples[toolName]
	if !ok {
		return nil
	}
	if example.Value == nil || example.Value.Value == nil {
		return nil
	}

	val, ok := example.Value.Value.(map[string]any)
	if !ok {
		return nil
	}

	reqExample, ok := val["ReqExample"]
	if !ok {
		return nil
	}
	reqExampleStr, err := sonic.MarshalString(reqExample)
	if err != nil {
		logs.CtxErrorf(ctx, "marshal request example failed, err=%v", err)
		return nil
	}

	respExample, ok := val["RespExample"]
	if !ok {
		return nil
	}
	respExampleStr, err := sonic.MarshalString(respExample)
	if err != nil {
		logs.CtxErrorf(ctx, "marshal response example failed, err=%v", err)
		return nil
	}

	return &ToolExample{
		RequestExample:  reqExampleStr,
		ResponseExample: respExampleStr,
	}
}

func (p PluginInfo) GetName() string {
	if p.Manifest == nil {
		return ""
	}
	return p.Manifest.NameForHuman
}

func (p PluginInfo) GetVersion() string {
	return ptr.FromOrDefault(p.Version, "")
}

func (p PluginInfo) GetAPPID() int64 {
	return ptr.FromOrDefault(p.APPID, 0)
}

func (p PluginInfo) GetDesc() string {
	if p.Manifest == nil {
		return ""
	}
	return p.Manifest.DescriptionForHuman
}

func (p PluginInfo) GetAuthInfo() *AuthV2 {
	if p.Manifest == nil {
		return nil
	}
	return p.Manifest.Auth
}

func (p PluginInfo) IsOfficial() bool {
	return p.RefProductID != nil
}

func (p PluginInfo) GetIconURI() string {
	if p.IconURI == nil {
		return ""
	}
	return *p.IconURI
}

func (p PluginInfo) Published() bool {
	return p.Version != nil
}
