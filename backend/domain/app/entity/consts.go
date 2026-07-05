package entity

import "github.com/coze-dev/coze-studio/backend/crossdomain/app/model"

type PublishStatus = model.PublishStatus

const (
	PublishStatusOfPacking             PublishStatus = 0
	PublishStatusOfPackFailed          PublishStatus = 1
	PublishStatusOfAuditing            PublishStatus = 2
	PublishStatusOfAuditNotPass        PublishStatus = 3
	PublishStatusOfConnectorPublishing PublishStatus = 4
	PublishStatusOfPublishDone         PublishStatus = 5
)

type ConnectorPublishStatus = model.ConnectorPublishStatus

const (
	ConnectorPublishStatusOfDefault  ConnectorPublishStatus = 0
	ConnectorPublishStatusOfAuditing ConnectorPublishStatus = 1
	ConnectorPublishStatusOfSuccess  ConnectorPublishStatus = 2
	ConnectorPublishStatusOfFailed   ConnectorPublishStatus = 3
	ConnectorPublishStatusOfDisable  ConnectorPublishStatus = 4
)

type ResourceType = model.ResourceType

const (
	ResourceTypeOfPlugin    ResourceType = "plugin"
	ResourceTypeOfWorkflow  ResourceType = "workflow"
	ResourceTypeOfKnowledge ResourceType = "knowledge"
	ResourceTypeOfDatabase  ResourceType = "database"
)

type ResourceCopyStatus = model.ResourceCopyStatus

const (
	ResourceCopyStatusOfSuccess    ResourceCopyStatus = 1
	ResourceCopyStatusOfProcessing ResourceCopyStatus = 2
	ResourceCopyStatusOfFailed     ResourceCopyStatus = 3
)
