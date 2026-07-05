package shortcutcmd

import (
	"gorm.io/gorm"

	"github.com/coze-dev/coze-studio/backend/domain/shortcutcmd/repository"
	"github.com/coze-dev/coze-studio/backend/domain/shortcutcmd/service"
	"github.com/coze-dev/coze-studio/backend/infra/idgen"
)

var ShortcutCmdSVC *ShortcutCmdApplicationService

func InitService(db *gorm.DB, idGenSVC idgen.IDGenerator) *ShortcutCmdApplicationService {

	components := &service.Components{
		ShortCutCmdRepo: repository.NewShortCutCmdRepo(db, idGenSVC),
	}
	shortcutCmdDomainSVC := service.NewShortcutCommandService(components)

	ShortcutCmdSVC = &ShortcutCmdApplicationService{
		ShortCutDomainSVC: shortcutCmdDomainSVC,
	}
	return ShortcutCmdSVC
}
