package nodes

import (
	"github.com/coze-dev/coze-studio/backend/domain/workflow/entity/vo"
)

type InterruptEventStore interface {
	GetAndClearResumeData(nodeKey vo.NodeKey) (string, bool)
}
