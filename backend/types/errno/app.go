package errno

import "github.com/coze-dev/coze-studio/backend/pkg/errorx/code"

// App: 101 000 000 ~ 101 999 999
const (
	ErrAppInvalidParamCode = 101000000
	ErrAppPermissionCode   = 101000001
	ErrAppRecordNotFound   = 101000002
	ErrAppNoModelInUseCode = 101000003
)

const APPMsgKey = "msg"

func init() {
	code.Register(
		ErrAppNoModelInUseCode,
		"there is no llm model in use, please config a model first",
		code.WithAffectStability(false),
	)

	code.Register(
		ErrAppPermissionCode,
		"unauthorized access : {msg}",
		code.WithAffectStability(false),
	)

	code.Register(
		ErrAppInvalidParamCode,
		"invalid parameter : {msg}",
		code.WithAffectStability(false),
	)

	code.Register(
		ErrAppRecordNotFound,
		"record not found",
		code.WithAffectStability(false),
	)
}
