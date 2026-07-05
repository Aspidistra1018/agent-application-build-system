package processor

import "github.com/coze-dev/coze-studio/backend/domain/knowledge/entity"

type DocProcessor interface {
	BeforeCreate() error         // Get data source
	BuildDBModel() error         // Build Doc Record
	InsertDBModel() error        // Insert a Doc record into the database
	Indexing() error             // Initiate indexing task
	GetResp() []*entity.Document // Return the processed document information
	//GetColumnName()
}
