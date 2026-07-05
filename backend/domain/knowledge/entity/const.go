package entity

type DocumentStatus int64

const (
	DocumentStatusInit      DocumentStatus = -1 // initialization
	DocumentStatusUploading DocumentStatus = 0  // Uploading
	DocumentStatusEnable    DocumentStatus = 1  // take effect
	DocumentStatusDisable   DocumentStatus = 2  // failure
	DocumentStatusDeleted   DocumentStatus = 3  // deleted
	DocumentStatusChunking  DocumentStatus = 4  // Slicing
	// DocumentStatusRefreshing DocumentStatus = 5//Refreshing
	DocumentStatusFailed DocumentStatus = 9 // fail
)

func (s DocumentStatus) String() string {
	switch s {
	case DocumentStatusInit:
		return "初始�?
	case DocumentStatusUploading:
		return "上传�?
	case DocumentStatusEnable:
		return "生效"
	case DocumentStatusDisable:
		return "失效"
	case DocumentStatusDeleted:
		return "已删�?
	case DocumentStatusChunking:
		return "切片�?
	// case DocumentStatusRefreshing:
	//	Returns "Refreshing"
	case DocumentStatusFailed:
		return "失败"
	default:
		return "未知"
	}
}

type DocumentSource int64

const (
	DocumentSourceLocal  DocumentSource = 0 // local file upload
	DocumentSourceCustom DocumentSource = 2 // custom text
)
