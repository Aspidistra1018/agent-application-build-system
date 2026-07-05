package impl

import "github.com/coze-dev/coze-studio/backend/pkg/logs"

// Create a document after the user enters custom content
type customDocProcessor struct {
	baseDocProcessor
}

func (c *customDocProcessor) BeforeCreate() error {
	for i := range c.Documents {
		if c.Documents[i].RawContent != "" {
			c.Documents[i].FileExtension = getFormatType(c.Documents[i].Type)
			uri := getTosUri(c.UserID, string(c.Documents[i].FileExtension))
			err := c.storage.PutObject(c.ctx, uri, []byte(c.Documents[i].RawContent))
			if err != nil {
				logs.CtxErrorf(c.ctx, "put object failed, err: %v", err)
				return err
			}
			c.Documents[i].URI = uri
		}
	}

	return nil
}
