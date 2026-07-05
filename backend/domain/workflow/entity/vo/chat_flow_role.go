package vo

type ChatFlowRoleCreate struct {
	WorkflowID          int64
	CreatorID           int64
	Name                string
	Description         string
	AvatarUri           string
	BackgroundImageInfo string
	OnboardingInfo      string
	SuggestReplyInfo    string
	AudioConfig         string
	UserInputConfig     string
}

type ChatFlowRoleUpdate struct {
	WorkflowID          int64
	Name                *string
	Description         *string
	AvatarUri           *string
	BackgroundImageInfo *string
	OnboardingInfo      *string
	SuggestReplyInfo    *string
	AudioConfig         *string
	UserInputConfig     *string
}

type PublishRolePolicy struct {
	WorkflowID int64
	CreatorID  int64
	Version    string
}
