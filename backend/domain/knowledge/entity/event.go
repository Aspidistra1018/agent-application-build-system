package entity

type Event struct {
	Type EventType

	Documents      []*Document
	Document       *Document
	Slice          *Slice
	SliceIDs       []int64
	KnowledgeID    int64
	DocumentReview *Review
}

type EventType string

// Document event
// Split + write vector library operation transactionality is guaranteed by the implementation itself
const (
	EventTypeIndexDocuments EventType = "index_documents"

	// EventTypeIndexDocument document information has been written to orm, the logic needs to parse + split + search data warehousing
	// Event requires: Event.Document
	EventTypeIndexDocument EventType = "index_document"

	// EventTypeIndexSlice slice information has been written to orm, and only search data is written in the logic
	// Event requires: Event.Slice
	EventTypeIndexSlice EventType = "index_slice"

	// EventTypeDeleteKnowledgeData remove knowledge
	// Event requires: Event.KnowledgeID, Event.SliceIDs
	EventTypeDeleteKnowledgeData EventType = "delete_knowledge_data"

	EventTypeDocumentReview EventType = "document_review"
)
