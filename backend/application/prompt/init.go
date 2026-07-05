package prompt

import (
	"gorm.io/gorm"

	"github.com/coze-dev/coze-studio/backend/application/search"
	"github.com/coze-dev/coze-studio/backend/domain/prompt/repository"
	prompt "github.com/coze-dev/coze-studio/backend/domain/prompt/service"
	"github.com/coze-dev/coze-studio/backend/infra/idgen"
)

func InitService(db *gorm.DB, idGenSVC idgen.IDGenerator, re search.ResourceEventBus) *PromptApplicationService {
	repo := repository.NewPromptRepo(db, idGenSVC)
	PromptSVC.DomainSVC = prompt.NewService(repo)
	PromptSVC.eventbus = re

	return PromptSVC
}
