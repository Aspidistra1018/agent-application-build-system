package entity

import (
	"time"

	"github.com/coze-dev/coze-studio/backend/domain/workflow/entity/vo"
)

type WorkflowReference struct {
	ID int64
	WorkflowReferenceKey
	CreatedAt time.Time
	Enabled   bool
}

type WorkflowReferenceKey struct {
	ReferredID  int64
	ReferringID int64
	vo.ReferType
	vo.ReferringBizType
}
