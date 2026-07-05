package errno

import "github.com/coze-dev/coze-studio/backend/pkg/errorx/code"

// Search: 111 000 000 ~ 111 999 999
const (
	ErrSearchInvalidParamCode = 111000000
	ErrSearchPermissionCode   = 111000001
)

func init() {
	code.Register(
		ErrSearchPermissionCode,
		"unauthorized access : {msg}",
		code.WithAffectStability(false),
	)

	code.Register(
		ErrSearchInvalidParamCode,
		"invalid parameter : {msg}",
		code.WithAffectStability(false),
	)
}
