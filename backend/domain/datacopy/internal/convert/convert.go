package convert

import (
	"github.com/coze-dev/coze-studio/backend/domain/datacopy/entity"
	"github.com/coze-dev/coze-studio/backend/domain/datacopy/internal/dal/model"
)

func ConvertToDataCopyTaskModel(task *entity.CopyDataTask) *model.DataCopyTask {
	return &model.DataCopyTask{
		MasterTaskID:  task.TaskUniqKey,
		OriginDataID:  task.OriginDataID,
		TargetDataID:  task.TargetDataID,
		OriginSpaceID: task.OriginSpaceID,
		TargetSpaceID: task.TargetSpaceID,
		OriginUserID:  task.OriginUserID,
		TargetUserID:  task.TargetUserID,
		OriginAppID:   task.OriginAppID,
		TargetAppID:   task.TargetAppID,
		DataType:      int32(task.DataType),
		Status:        int32(task.Status),
		StartTime:     task.StartTime,
		FinishTime:    task.FinishTime,
		ExtInfo:       task.ExtInfo,
		ErrorMsg:      task.ErrorMsg,
		// ID: auto_increment
	}
}
