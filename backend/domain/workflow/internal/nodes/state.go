package nodes

import "github.com/coze-dev/coze-studio/backend/domain/workflow/entity/vo"

type IntermediateResultStore interface {
	GetIntermediateResult(nodeKey vo.NodeKey) map[string]any
	SetIntermediateResult(nodeKey vo.NodeKey, r map[string]any)
}
