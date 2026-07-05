package entity

import (
	"github.com/coze-dev/coze-studio/backend/api/model/app/intelligence/common"
	model "github.com/coze-dev/coze-studio/backend/crossdomain/search/model"
)

const (
	// resource index fields
	FieldOfResType       = "res_type"
	FieldOfPublishStatus = "publish_status"
	FieldOfResSubType    = "res_sub_type"
	FieldOfBizStatus     = "biz_status"
	FieldOfScores        = "scores"
)

type SearchProjectsRequest struct {
	SpaceID   int64
	ProjectID int64
	OwnerID   int64
	Name      string
	Status    []common.IntelligenceStatus
	Types     []common.IntelligenceType

	IsPublished    bool
	IsFav          bool
	IsRecentlyOpen bool
	OrderFiledName string
	OrderAsc       bool

	Cursor string
	Limit  int32
}

type SearchProjectsResponse struct {
	HasMore    bool
	NextCursor string

	Data []*ProjectDocument
}

type SearchResourcesRequest = model.SearchResourcesRequest

type SearchResourcesResponse = model.SearchResourcesResponse
