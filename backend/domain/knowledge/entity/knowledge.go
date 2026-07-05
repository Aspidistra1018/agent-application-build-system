package entity

import model "github.com/coze-dev/coze-studio/backend/crossdomain/knowledge/model"

type Knowledge struct {
	*model.Knowledge
}

type WhereKnowledgeOption struct {
	KnowledgeIDs []int64
	AppID        *int64
	SpaceID      *int64
	Name         *string // Exact match
	Status       []int32
	UserID       *int64
	Query        *string // fuzzy match
	Page         *int
	PageSize     *int
	Order        *Order
	OrderType    *OrderType
	FormatType   *int64
}

type OrderType int32

const (
	OrderTypeAsc  OrderType = 1
	OrderTypeDesc OrderType = 2
)

type Order int32

const (
	OrderCreatedAt Order = 1
	OrderUpdatedAt Order = 2
)
