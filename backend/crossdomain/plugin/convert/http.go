package convert

import (
	"net/http"

	"github.com/coze-dev/coze-studio/backend/api/model/plugin_develop/common"
)

var httpMethods = map[common.APIMethod]string{
	common.APIMethod_GET:    http.MethodGet,
	common.APIMethod_POST:   http.MethodPost,
	common.APIMethod_PUT:    http.MethodPut,
	common.APIMethod_DELETE: http.MethodDelete,
	common.APIMethod_PATCH:  http.MethodPatch,
}

var thriftAPIMethods = func() map[string]common.APIMethod {
	methods := make(map[string]common.APIMethod, len(httpMethods))
	for k, v := range httpMethods {
		methods[v] = k
	}
	return methods
}()

func ToThriftAPIMethod(method string) (common.APIMethod, bool) {
	_method, ok := thriftAPIMethods[method]
	return _method, ok
}

func ToHTTPMethod(method common.APIMethod) (string, bool) {
	_method, ok := httpMethods[method]
	return _method, ok
}
