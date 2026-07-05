package conversation

import (
	"encoding/json"

	"github.com/hertz-contrib/sse"

	"github.com/coze-dev/coze-studio/backend/api/model/conversation/run"
)

func buildDoneEvent(event string) *sse.Event {
	return &sse.Event{
		Event: event,
	}
}

func buildErrorEvent(errCode int64, errMsg string) *sse.Event {
	errData := run.ErrorData{
		Code: errCode,
		Msg:  errMsg,
	}
	ed, _ := json.Marshal(errData)

	return &sse.Event{
		Event: run.RunEventError,
		Data:  ed,
	}
}

func buildMessageChunkEvent(event string, chunkMsg []byte) *sse.Event {
	return &sse.Event{
		Event: event,
		Data:  chunkMsg,
	}
}
