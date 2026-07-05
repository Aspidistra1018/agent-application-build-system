package app

import (
	"github.com/coze-dev/coze-studio/backend/api/model/resource/common"
)

type copyMetaInfo struct {
	scene common.ResourceCopyScene

	userID     int64
	appSpaceID int64
	copyTaskID string

	fromAppID int64
	toAppID   *int64
}
