package permission

import (
	"context"
)

type ResourceIdentifier struct {
	Type   ResourceType
	ID     []int64
	Action Action
}

type ActionAndResource struct {
	Action             Action
	ResourceIdentifier ResourceIdentifier
}

type CheckAuthzData struct {
	ResourceIdentifier []*ResourceIdentifier
	OperatorID         int64
	IsDraft            *bool
}
type CheckAuthzResult struct {
	Decision Decision
}

type Permission interface {
	CheckAuthz(ctx context.Context, req *CheckAuthzData) (*CheckAuthzResult, error)
}
