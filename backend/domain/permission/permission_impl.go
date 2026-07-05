package permission

import (
	"context"
)

type permissionImpl struct{}

func NewService() Permission {
	return &permissionImpl{}
}

func DefaultSVC() Permission {
	return NewService()
}

func (p *permissionImpl) CheckAuthz(ctx context.Context, req *CheckAuthzData) (*CheckAuthzResult, error) {

	authzChecker := NewAuthzChecker()

	for _, resourceIdentifier := range req.ResourceIdentifier {
		allowed, err := authzChecker.CheckResourcePermission(ctx, &ResourcePermissionRequest{
			ResourceType: resourceIdentifier.Type,
			ResourceIDs:  resourceIdentifier.ID,
			Action:       resourceIdentifier.Action,
			OperatorID:   req.OperatorID,
			IsDraft:      req.IsDraft,
		})
		if err != nil {
			return nil, err
		}

		if !allowed {
			return &CheckAuthzResult{Decision: Deny}, nil
		}
	}

	return &CheckAuthzResult{Decision: Allow}, nil
}
