package impl

import (
	"context"
	"fmt"
	"net/http"

	"github.com/coze-dev/coze-studio/backend/api/model/admin/config"
	"github.com/coze-dev/coze-studio/backend/bizpkg/llm/modelbuilder"
	"github.com/coze-dev/coze-studio/backend/infra/document/ocr"
	"github.com/coze-dev/coze-studio/backend/infra/document/parser"
	"github.com/coze-dev/coze-studio/backend/infra/document/parser/impl/builtin"
	"github.com/coze-dev/coze-studio/backend/infra/document/parser/impl/ppstructure"
	"github.com/coze-dev/coze-studio/backend/infra/storage"
)

type Manager = parser.Manager

func New(ctx context.Context, conf *config.KnowledgeConfig, storage storage.Storage, ocr ocr.OCR) (Manager, error) {
	imageAnnotationModel, _, err := modelbuilder.GetBuiltinChatModel(ctx, "IA_")
	if err != nil {
		return nil, fmt.Errorf("get builtin chat model failed, err=%w", err)
	}

	var parserManager parser.Manager
	switch conf.ParserConfig.Type {
	case config.ParserType_Paddleocr:
		client := &http.Client{}
		apiConfig := &ppstructure.APIConfig{
			Client: client,
			URL:    conf.ParserConfig.PaddleocrStructureAPIURL,
		}
		parserManager = ppstructure.NewManager(apiConfig, ocr, storage, imageAnnotationModel)
	default:
		parserManager = builtin.NewManager(storage, ocr, imageAnnotationModel)
	}

	return parserManager, nil
}
