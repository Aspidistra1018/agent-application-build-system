package knowledge

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/crossdomain/knowledge/model"
)

//go:generate  mockgen -destination knowledgemock/knowledge_mock.go --package knowledgemock -source model.go
type Knowledge interface {
	ListKnowledge(ctx context.Context, request *model.ListKnowledgeRequest) (response *model.ListKnowledgeResponse, err error)
	GetKnowledgeByID(ctx context.Context, request *model.GetKnowledgeByIDRequest) (response *model.GetKnowledgeByIDResponse, err error)
	Retrieve(ctx context.Context, req *model.RetrieveRequest) (*model.RetrieveResponse, error)
	DeleteKnowledge(ctx context.Context, request *model.DeleteKnowledgeRequest) error
	MGetKnowledgeByID(ctx context.Context, request *model.MGetKnowledgeByIDRequest) (response *model.MGetKnowledgeByIDResponse, err error)
	Store(ctx context.Context, document *model.CreateDocumentRequest) (*model.CreateDocumentResponse, error)
	Delete(ctx context.Context, r *model.DeleteDocumentRequest) (*model.DeleteDocumentResponse, error)
	ListKnowledgeDetail(ctx context.Context, req *model.ListKnowledgeDetailRequest) (*model.ListKnowledgeDetailResponse, error)
	MGetSlice(ctx context.Context, request *model.MGetSliceRequest) (response *model.MGetSliceResponse, err error)
	MGetDocument(ctx context.Context, request *model.MGetDocumentRequest) (response *model.MGetDocumentResponse, err error)
}

var defaultSVC Knowledge

func DefaultSVC() Knowledge {
	return defaultSVC
}

func SetDefaultSVC(c Knowledge) {
	defaultSVC = c
}
