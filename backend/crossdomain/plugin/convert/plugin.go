package convert

import (
	"github.com/coze-dev/coze-studio/backend/api/model/plugin_develop/common"
	"github.com/coze-dev/coze-studio/backend/crossdomain/plugin/consts"
)

var pluginTypes = map[common.PluginType]consts.PluginType{
	common.PluginType_PLUGIN: consts.PluginTypeOfCloud,
}

func ToPluginType(typ common.PluginType) (consts.PluginType, bool) {
	_type, ok := pluginTypes[typ]
	return _type, ok
}

var thriftPluginTypes = func() map[consts.PluginType]common.PluginType {
	types := make(map[consts.PluginType]common.PluginType, len(pluginTypes))
	for k, v := range pluginTypes {
		types[v] = k
	}
	return types
}()

func ToThriftPluginType(typ consts.PluginType) (common.PluginType, bool) {
	_type, ok := thriftPluginTypes[typ]
	return _type, ok
}
