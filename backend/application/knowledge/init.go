package knowledge

import (
	"context"
	"fmt"
	"os"

	"github.com/coze-dev/coze-studio/backend/application/search"
	knowledgeImpl "github.com/coze-dev/coze-studio/backend/domain/knowledge/service"
	"github.com/coze-dev/coze-studio/backend/infra/eventbus"
	"github.com/coze-dev/coze-studio/backend/types/consts"
)

type ServiceComponents = knowledgeImpl.KnowledgeSVCConfig

func InitService(ctx context.Context, c *ServiceComponents, bus search.ResourceEventBus) (*KnowledgeApplicationService, error) {
	knowledgeDomainSVC, knowledgeEventHandler := knowledgeImpl.NewKnowledgeSVC(c)

	nameServer := os.Getenv(consts.MQServer)
	if err := eventbus.GetDefaultSVC().RegisterConsumer(nameServer, consts.RMQTopicKnowledge, consts.RMQConsumeGroupKnowledge, knowledgeEventHandler); err != nil {
		return nil, fmt.Errorf("register knowledge consumer failed, err=%w", err)
	}

	KnowledgeSVC.DomainSVC = knowledgeDomainSVC
	KnowledgeSVC.eventBus = bus
	KnowledgeSVC.storage = c.Storage
	return KnowledgeSVC, nil
}
