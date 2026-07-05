package entity

type CopyDataTask struct {
	TaskUniqKey   string // Unique sign of a replication task
	OriginDataID  int64
	TargetDataID  int64
	OriginSpaceID int64
	TargetSpaceID int64
	OriginUserID  int64
	TargetUserID  int64
	OriginAppID   int64
	TargetAppID   int64
	Status        DataCopyTaskStatus
	DataType      DataType
	StartTime     int64 // Task start time ms
	FinishTime    int64 // Task end time ms
	ExtInfo       string
	ErrorMsg      string // Copy failed error message
}
type DataCopyTaskStatus int

const (
	DataCopyTaskStatusCreate     DataCopyTaskStatus = 1
	DataCopyTaskStatusInProgress DataCopyTaskStatus = 2
	DataCopyTaskStatusSuccess    DataCopyTaskStatus = 3
	DataCopyTaskStatusFail       DataCopyTaskStatus = 4
)

type DataType int

const (
	DataTypeKnowledge DataType = 1
	DataTypeDatabase  DataType = 2
	DataTypeVariable  DataType = 3
)
