package nodes

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/coze-dev/coze-studio/backend/pkg/sonic"
)

func TestExtractJSONString(t *testing.T) {
	s := "\n```json{\"k\":1}```\t"
	s1 := ExtractJSONString(s)
	var v map[string]any
	err := sonic.UnmarshalString(s1, &v)
	assert.NoError(t, err)
	assert.Equal(t, map[string]any{"k": int64(1)}, v)
}
