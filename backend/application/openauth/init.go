package openauth

import (
	"gorm.io/gorm"

	openapiauth2 "github.com/coze-dev/coze-studio/backend/domain/openauth/openapiauth"
	"github.com/coze-dev/coze-studio/backend/infra/idgen"
)

var (
	openapiAuthDomainSVC openapiauth2.APIAuth
)

func InitService(db *gorm.DB, idGenSVC idgen.IDGenerator) *OpenAuthApplicationService {
	openapiAuthDomainSVC = openapiauth2.NewService(&openapiauth2.Components{
		IDGen: idGenSVC,
		DB:    db,
	})

	OpenAuthApplication.OpenAPIDomainSVC = openapiAuthDomainSVC

	return OpenAuthApplication
}
