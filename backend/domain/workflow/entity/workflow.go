package entity

import (
	"github.com/coze-dev/coze-studio/backend/api/model/workflow"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/entity/vo"
)

type ContentType = workflow.WorkFlowType
type Tag = workflow.Tag
type Mode = workflow.WorkflowMode

type Workflow struct {
	ID       int64
	CommitID string

	*vo.Meta
	*vo.CanvasInfo
	*vo.DraftMeta
	*vo.VersionMeta
}

func (w *Workflow) GetBasic() *WorkflowBasic {
	var version string
	if w.VersionMeta != nil {
		version = w.VersionMeta.Version
	}
	return &WorkflowBasic{
		ID:       w.ID,
		Version:  version,
		SpaceID:  w.SpaceID,
		AppID:    w.AppID,
		CommitID: w.CommitID,
	}
}

func (w *Workflow) GetLatestVersion() string {
	if w.LatestPublishedVersion == nil {
		return ""
	}

	return *w.LatestPublishedVersion
}

func (w *Workflow) GetVersion() string {
	if w.VersionMeta == nil {
		return ""
	}
	return w.VersionMeta.Version
}

type IDVersionPair struct {
	ID      int64
	Version string
}

type WorkflowBasic struct {
	ID       int64
	Version  string
	SpaceID  int64
	AppID    *int64
	CommitID string
}

type CopyWorkflowFromAppToLibraryResult struct {
	WorkflowIDVersionMap map[int64]IDVersionPair
	ValidateIssues       []*vo.ValidateIssue
	CopiedWorkflows      []*Workflow
}
