package impl

import (
	"github.com/coze-dev/coze-studio/backend/api/model/admin/config"
	"github.com/coze-dev/coze-studio/backend/infra/document/rerank"
	"github.com/coze-dev/coze-studio/backend/infra/document/rerank/impl/rrf"
	"github.com/coze-dev/coze-studio/backend/infra/document/rerank/impl/vikingdb"
)

type Reranker = rerank.Reranker

func New(conf *config.KnowledgeConfig) Reranker {
	switch conf.RerankConfig.Type {
	case config.RerankType_VikingDB:
		return vikingdb.NewReranker(conf.RerankConfig.VikingdbConfig)
	case config.RerankType_RRF:
		return rrf.NewRRFReranker(0)
	default:
		return rrf.NewRRFReranker(0)
	}
}
