package permission

type (
	ResourceType int
	Decision     int
	Action       string
)

const (
	ResourceTypeAccount             ResourceType = 1
	ResourceTypeWorkspace                        = 2
	ResourceTypeApp                              = 3
	ResourceTypeAgent                            = 4
	ResourceTypePlugin                           = 5
	ResourceTypeWorkflow                         = 6
	ResourceTypeKnowledge                        = 7
	ResourceTypePersonalAccessToken              = 8
	ResourceTypeConnector                        = 9
	ResourceTypeCard                             = 10
	ResourceTypeCardTemplate                     = 11
	ResourceTypeConversation                     = 12
	ResourceTypeFile                             = 13
	ResourceTypeServicePrincipal                 = 14
	ResourceTypeEnterprise                       = 15
	ResourceTypeMigrateTask                      = 16
	ResourceTypePrompt                           = 17
	ResourceTypeUI                               = 18
	ResourceTypeProject                          = 19
	ResourceTypeEvaluationDataset                = 20
	ResourceTypeEvaluationTask                   = 21
	ResourceTypeEvaluator                        = 22
	ResourceTypeDatabase                         = 23
	ResourceTypeOceanProject                     = 24
	ResourceTypeFinetuneTask                     = 25
	ResourceTypeKnowledgeDocument                = 26
	ResourceTypeKnowledgeSlice                   = 27
)

const (
	// Allow represents permission granted
	Allow Decision = 1
	// Deny represents permission denied
	Deny Decision = 2
)

const (
	ActionRead  Action = "read"
	ActionWrite Action = "write"
)
