package messages2query

import "github.com/coze-dev/coze-studio/backend/bizpkg/llm/modelbuilder"

type Option func(o *Options)

type Options struct {
	ChatModel modelbuilder.BaseChatModel
}

func WithChatModel(cm modelbuilder.BaseChatModel) Option {
	return func(o *Options) {
		o.ChatModel = cm
	}
}
