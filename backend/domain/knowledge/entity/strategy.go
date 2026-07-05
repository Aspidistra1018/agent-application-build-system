package entity

import (
	model "github.com/coze-dev/coze-studio/backend/crossdomain/knowledge/model"
	"github.com/coze-dev/coze-studio/backend/infra/document/parser"
)

type RetrievalStrategy = model.RetrievalStrategy

// ParsingStrategy for document parse before indexing
type ParsingStrategy struct {
	ParsingType ParsingType `json:"parsing_type"` // parse type
	// Doc
	ExtractImage bool  `json:"extract_image"` // Extract image elements
	ExtractTable bool  `json:"extract_table"` // Extract table elements
	ImageOCR     bool  `json:"image_ocr"`     // Image ocr
	FilterPages  []int `json:"filter_pages"`  // filter pages

	// Sheet
	SheetID       int64 `json:"sheet_id"`        // xlsx sheet id
	HeaderLine    int   `json:"header_line"`     // header row
	DataStartLine int   `json:"data_start_line"` // Data start row
	RowsCount     int   `json:"rows_count"`      // number of rows read

	// Image
	CaptionType *parser.ImageAnnotationType `json:"caption_type"`
}
type ParsingType int64

const (
	ParsingType_FastParsing     ParsingType = 0
	ParsingType_AccurateParsing ParsingType = 1
)

// ChunkingStrategy for document chunk before indexing
type ChunkingStrategy struct {
	ChunkType parser.ChunkType `json:"chunk_type"`
	// custom chunk config
	ChunkSize       int64  `json:"chunk_size"` // maximum segmentation length
	Separator       string `json:"separator"`  // segmentation identifier
	Overlap         int64  `json:"overlap"`    // segmented overlap
	TrimSpace       bool   `json:"trim_space"`
	TrimURLAndEmail bool   `json:"trim_url_and_email"`

	// segmentation by hierarchy
	MaxDepth  int64 `json:"max_depth"`  // Maximum level when segmented by level
	SaveTitle bool  `json:"save_title"` // Preserve Hierarchical Titles
}
