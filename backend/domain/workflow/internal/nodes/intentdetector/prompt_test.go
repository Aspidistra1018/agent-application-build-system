package intentdetector

import (
	"testing"

	"github.com/cloudwego/eino/schema"
	"github.com/stretchr/testify/assert"
)

func TestHandleHistoryMessages(t *testing.T) {
	tests := []struct {
		name             string
		historyMessages  []*schema.Message
		expectedMessages []*schema.Message
	}{
		{
			name:             "Empty history",
			historyMessages:  []*schema.Message{},
			expectedMessages: []*schema.Message{},
		},
		{
			name:             "Message with only content",
			historyMessages:  []*schema.Message{{Content: "hello"}},
			expectedMessages: []*schema.Message{{Content: "hello", MultiContent: nil}},
		},
		{
			name: "Message with only single text multi-content",
			historyMessages: []*schema.Message{
				{
					MultiContent: []schema.ChatMessagePart{
						{Type: schema.ChatMessagePartTypeText, Text: "world"},
					},
				},
			},
			expectedMessages: []*schema.Message{{Content: "world", MultiContent: nil}},
		},
		{
			name: "Message with content and multi-content",
			historyMessages: []*schema.Message{
				{
					Content: "hello",
					MultiContent: []schema.ChatMessagePart{
						{Type: schema.ChatMessagePartTypeText, Text: "world"},
					},
				},
			},
			expectedMessages: []*schema.Message{{Content: "hello\nworld", MultiContent: nil}},
		},
		{
			name: "Message with multiple multi-content parts",
			historyMessages: []*schema.Message{
				{
					MultiContent: []schema.ChatMessagePart{
						{Type: schema.ChatMessagePartTypeText, Text: "part1"},
						{Type: schema.ChatMessagePartTypeText, Text: "part2"},
					},
				},
			},
			expectedMessages: []*schema.Message{{Content: "part1\npart2", MultiContent: nil}},
		},
		{
			name: "Message with various multi-content part types",
			historyMessages: []*schema.Message{
				{
					MultiContent: []schema.ChatMessagePart{
						{Type: schema.ChatMessagePartTypeText, Text: "text"},
						{Type: schema.ChatMessagePartTypeImageURL, ImageURL: &schema.ChatMessageImageURL{URL: "image.png"}},
						{Type: schema.ChatMessagePartTypeAudioURL, AudioURL: &schema.ChatMessageAudioURL{URL: "audio.mp3"}},
						{Type: schema.ChatMessagePartTypeVideoURL, VideoURL: &schema.ChatMessageVideoURL{URL: "video.mp4"}},
						{Type: schema.ChatMessagePartTypeFileURL, FileURL: &schema.ChatMessageFileURL{URL: "file.txt"}},
					},
				},
			},
			expectedMessages: []*schema.Message{{Content: "text\nimage.png\naudio.mp3\nvideo.mp4\nfile.txt", MultiContent: nil}},
		},
		{
			name: "Multiple messages",
			historyMessages: []*schema.Message{
				{Content: "msg1"},
				{MultiContent: []schema.ChatMessagePart{{Type: schema.ChatMessagePartTypeText, Text: "msg2"}}},
			},
			expectedMessages: []*schema.Message{
				{Content: "msg1", MultiContent: nil},
				{Content: "msg2", MultiContent: nil},
			},
		},
		{
			name:             "Empty message",
			historyMessages:  []*schema.Message{{}},
			expectedMessages: []*schema.Message{{Content: "", MultiContent: nil}},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := handleHistoryMessages(tt.historyMessages)
			assert.Equal(t, tt.expectedMessages, result)
		})
	}
}
