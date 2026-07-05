package entity

import (
	model "github.com/coze-dev/coze-studio/backend/crossdomain/knowledge/model"
)

type Slice = model.Slice

type WhereSliceOpt struct {
	KnowledgeID int64
	DocumentID  int64
	DocumentIDs []int64
	Keyword     *string
	PageSize    int64
	Offset      int64
	NotEmpty    *bool
}

type WherePhotoSliceOpt struct {
	KnowledgeID int64
	DocumentIDs []int64
	Limit       *int
	Offset      *int
	HasCaption  *bool
}
