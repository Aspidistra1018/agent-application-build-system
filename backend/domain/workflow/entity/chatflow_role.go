package entity

import "time"

type ChatFlowRole struct {
	ID                  int64
	WorkflowID          int64
	ConnectorID         int64
	Name                string
	Description         string
	Version             string
	AvatarUri           string
	BackgroundImageInfo string
	OnboardingInfo      string
	SuggestReplyInfo    string
	AudioConfig         string
	UserInputConfig     string
	CreatorID           int64
	CreatedAt           time.Time
	UpdatedAt           time.Time
}
