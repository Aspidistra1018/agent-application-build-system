package execute

import (
	"github.com/cloudwego/eino/components/tool"
	"github.com/cloudwego/eino/compose"
	"github.com/cloudwego/eino/schema"

	workflowModel "github.com/coze-dev/coze-studio/backend/crossdomain/workflow/model"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/entity"
)

type workflowToolOption struct {
	resumeReq            *entity.ResumeRequest
	streamContainer      *StreamContainer
	exeCfg               workflowModel.ExecuteConfig
	toolCallID2ExecuteID map[string]int64
}

func WithResume(req *entity.ResumeRequest, all map[string]int64) tool.Option {
	return tool.WrapImplSpecificOptFn(func(opts *workflowToolOption) {
		opts.resumeReq = req
		opts.toolCallID2ExecuteID = all
	})
}

func WithParentStreamContainer(sc *StreamContainer) tool.Option {
	return tool.WrapImplSpecificOptFn(func(opts *workflowToolOption) {
		opts.streamContainer = sc
	})
}

func WithExecuteConfig(cfg workflowModel.ExecuteConfig) tool.Option {
	return tool.WrapImplSpecificOptFn(func(opts *workflowToolOption) {
		opts.exeCfg = cfg
	})
}

func GetResumeRequest(opts ...tool.Option) (*entity.ResumeRequest, map[string]int64) {
	opt := tool.GetImplSpecificOptions(&workflowToolOption{}, opts...)
	return opt.resumeReq, opt.toolCallID2ExecuteID
}

func GetParentStreamContainer(opts ...tool.Option) *StreamContainer {
	opt := tool.GetImplSpecificOptions(&workflowToolOption{}, opts...)
	return opt.streamContainer
}

func GetExecuteConfig(opts ...tool.Option) workflowModel.ExecuteConfig {
	opt := tool.GetImplSpecificOptions(&workflowToolOption{}, opts...)
	return opt.exeCfg
}

// WithMessagePipe returns an Option which is meant to be passed to the tool workflow,
// as well as a StreamReader to read the messages from the tool workflow.
// This Option will apply to ALL workflow tools to be executed by eino's ToolsNode.
// The workflow tools will emit messages to this stream.
// The caller can receive from the returned StreamReader to get the messages from the tool workflow.
func WithMessagePipe() (compose.Option, *schema.StreamReader[*entity.Message], func()) {
	sr, sw := schema.Pipe[*entity.Message](10)
	container := &StreamContainer{
		sw:         sw,
		subStreams: make(chan *schema.StreamReader[*entity.Message]),
	}

	go container.PipeAll()

	opt := compose.WithToolsNodeOption(compose.WithToolOption(WithParentStreamContainer(container)))
	return opt, sr, func() {
		container.Done()
	}
}
