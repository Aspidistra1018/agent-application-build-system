package model

import (
	"github.com/cloudwego/eino/schema"

	"github.com/coze-dev/coze-studio/backend/api/model/workflow"
	crossmessage "github.com/coze-dev/coze-studio/backend/crossdomain/message"
)

type Locator uint8

const (
	FromDraft Locator = iota
	FromSpecificVersion
	FromLatestVersion
)

type ExecuteConfig struct {
	ID                                int64
	From                              Locator
	Version                           string
	CommitID                          string
	Operator                          int64
	Mode                              ExecuteMode
	AppID                             *int64
	AgentID                           *int64
	ConnectorID                       int64
	ConnectorUID                      string
	TaskType                          TaskType
	SyncPattern                       SyncPattern
	InputFailFast                     bool // whether to fail fast if input conversion has warnings
	BizType                           BizType
	Cancellable                       bool
	WorkflowMode                      WorkflowMode
	RoundID                           *int64 // if workflow is chat flow, conversation round id is required
	InitRoundID                       *int64 // if workflow is chat flow, init conversation round id is required
	ConversationID                    *int64 // if workflow is chat flow, conversation id is required
	UserMessage                       *schema.Message
	ConversationHistory               []*crossmessage.WfMessage
	ConversationHistorySchemaMessages []*schema.Message
	SectionID                         *int64
	MaxHistoryRounds                  *int32
	InputFileFields                   map[string]*FileInfo
}

type ExecuteMode string

const (
	ExecuteModeDebug     ExecuteMode = "debug"
	ExecuteModeRelease   ExecuteMode = "release"
	ExecuteModeNodeDebug ExecuteMode = "node_debug"
)

type WorkflowMode = workflow.WorkflowMode

type TaskType string

const (
	TaskTypeForeground TaskType = "foreground"
	TaskTypeBackground TaskType = "background"
)

type SyncPattern string

const (
	SyncPatternSync   SyncPattern = "sync"
	SyncPatternAsync  SyncPattern = "async"
	SyncPatternStream SyncPattern = "stream"
)

type BizType string

const (
	BizTypeAgent    BizType = "agent"
	BizTypeWorkflow BizType = "workflow"
)

type FileInfo struct {
	FileURL       string `json:"file_url"`
	FileName      string `json:"file_name"`
	FileExtension string `json:"file_extension"`
}
