package modelmgr

import (
	"github.com/coze-dev/coze-studio/backend/infra/storage"
)

func InitService(tosClient storage.Storage) *ModelmgrApplicationService {
	ModelmgrApplicationSVC = &ModelmgrApplicationService{tosClient}
	return ModelmgrApplicationSVC
}
