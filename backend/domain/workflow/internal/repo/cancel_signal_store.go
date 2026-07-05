package repo

import (
	"context"
	"fmt"
	"time"

	"github.com/coze-dev/coze-studio/backend/domain/workflow/entity/vo"
	"github.com/coze-dev/coze-studio/backend/infra/cache"
	"github.com/coze-dev/coze-studio/backend/types/errno"
)

type cancelSignalStoreImpl struct {
	redis cache.Cmdable
}

const workflowExecutionCancelStatusKey = "workflow:cancel:status:%d"

func (c *cancelSignalStoreImpl) SetWorkflowCancelFlag(ctx context.Context, wfExeID int64) (err error) {
	statusKey := fmt.Sprintf(workflowExecutionCancelStatusKey, wfExeID)
	// Define a reasonable expiration for the status key, e.g., 24 hours
	expiration := 24 * time.Hour

	// set a kv to redis to indicate cancellation status
	err = c.redis.Set(ctx, statusKey, "cancelled", expiration).Err()
	if err != nil {
		return vo.WrapError(errno.ErrRedisError,
			fmt.Errorf("failed to set workflow cancel status for wfExeID %d after publishing signal: %w", wfExeID, err))
	}

	return nil
}

func (c *cancelSignalStoreImpl) GetWorkflowCancelFlag(ctx context.Context, wfExeID int64) (bool, error) {
	// Construct Redis key for workflow cancellation status
	key := fmt.Sprintf(workflowExecutionCancelStatusKey, wfExeID)

	// Check if the key exists in Redis
	count, err := c.redis.Exists(ctx, key).Result()
	if err != nil {
		return false, vo.WrapError(errno.ErrRedisError, fmt.Errorf("failed to check cancellation status in Redis: %w", err))
	}

	// If key exists (count == 1), return true; otherwise return false
	return count == 1, nil
}
