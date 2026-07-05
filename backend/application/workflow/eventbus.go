package workflow

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/api/model/resource/common"
	"github.com/coze-dev/coze-studio/backend/domain/search/entity"
	search "github.com/coze-dev/coze-studio/backend/domain/search/entity"
	"github.com/coze-dev/coze-studio/backend/domain/search/service"
)

var eventBus service.ResourceEventBus

func setEventBus(bus service.ResourceEventBus) {
	eventBus = bus
}

func PublishWorkflowResource(ctx context.Context, workflowID int64, mode *int32, op search.OpType, r *search.ResourceDocument) error {
	if r == nil {
		r = &search.ResourceDocument{}
	}

	r.ResType = common.ResType_Workflow
	r.ResID = workflowID
	r.ResSubType = mode

	event := &entity.ResourceDomainEvent{
		OpType:   entity.OpType(op),
		Resource: r,
	}

	if op == search.Created {
		event.Resource.CreateTimeMS = r.CreateTimeMS
		event.Resource.UpdateTimeMS = r.UpdateTimeMS
	} else if op == search.Updated {
		event.Resource.UpdateTimeMS = r.UpdateTimeMS
	}

	err := eventBus.PublishResources(ctx, event)
	if err != nil {
		return err
	}

	return nil
}
