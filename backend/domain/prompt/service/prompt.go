package prompt

import (
	"context"

	"github.com/coze-dev/coze-studio/backend/domain/prompt/entity"
)

type Prompt interface {
	CreatePromptResource(ctx context.Context, p *entity.PromptResource) (int64, error)
	GetPromptResource(ctx context.Context, promptID int64) (*entity.PromptResource, error)
	UpdatePromptResource(ctx context.Context, promptID int64, name, description, promptText *string) error
	DeletePromptResource(ctx context.Context, promptID int64) error

	ListOfficialPromptResource(ctx context.Context, keyword string) ([]*entity.PromptResource, error)
}
