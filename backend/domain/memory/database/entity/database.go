package entity

import (
	"github.com/xuri/excelize/v2"

	"github.com/coze-dev/coze-studio/backend/api/model/data/knowledge"
	model "github.com/coze-dev/coze-studio/backend/crossdomain/database/model"
)

type Database = model.Database

// DatabaseFilter Database filter criteria
type DatabaseFilter struct {
	CreatorID *int64
	SpaceID   *int64
	TableName *string
	AppID     *int64
}

// Pagination pagination
type Pagination struct {
	Total int64

	Limit  int
	Offset int
}

type TableSheet struct {
	SheetID       int64
	HeaderLineIdx int64
	StartLineIdx  int64
}

type TableReaderMeta struct {
	TosMaxLine    int64
	SheetId       int64
	HeaderLineIdx int64
	StartLineIdx  int64
	ReaderMethod  model.TableReadDataMethod
	ReadLineCnt   int64
	Schema        []*knowledge.DocTableColumn
}

type TableReaderSheetData struct {
	Columns    []*knowledge.DocTableColumn
	SampleData [][]string
}

type ExcelExtraInfo struct {
	Sheets        []*knowledge.DocTableSheet
	ExtensionName string // extension
	FileSize      int64  // file size
	SourceFileID  int64
	TosURI        string
}

type LocalTableMeta struct {
	ExcelFile      *excelize.File // XLSX format file
	RawLines       [][]string     // All content of csv | xls
	SheetsNameList []string
	SheetsRowCount []int
	ExtensionName  string // extension
	FileSize       int64  // file size
}

type ColumnInfo struct {
	ColumnType         knowledge.ColumnType
	ContainsEmptyValue bool
}

type SelectFieldList struct {
	FieldID    []string
	IsDistinct bool
}
