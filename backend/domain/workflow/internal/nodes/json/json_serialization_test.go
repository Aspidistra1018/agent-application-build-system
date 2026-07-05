package json

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/coze-dev/coze-studio/backend/domain/workflow/entity/vo"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/internal/schema"
)

func TestNewJsonSerialize(t *testing.T) {
	ctx := context.Background()

	// Test with missing InputTypes config
	s, err := (&SerializationConfig{}).Build(ctx, &schema.NodeSchema{
		InputTypes: map[string]*vo.TypeInfo{
			"testKey": {Type: "string"},
		},
	})

	assert.NoError(t, err)
	assert.NotNil(t, s)
}

func TestJsonSerialize_Invoke(t *testing.T) {
	ctx := context.Background()

	processor, err := (&SerializationConfig{}).Build(ctx, &schema.NodeSchema{
		InputTypes: map[string]*vo.TypeInfo{
			"stringKey": {Type: "string"},
			"intKey":    {Type: "integer"},
			"boolKey":   {Type: "boolean"},
			"objKey":    {Type: "object"},
		},
	})
	assert.NoError(t, err)

	// Test cases
	tests := []struct {
		name      string
		input     map[string]any
		expected  string
		expectErr bool
	}{{
		name: "Test string serialization",
		input: map[string]any{
			"input": "test",
		},
		expected:  `"test"`,
		expectErr: false,
	}, {
		name: "Test integer serialization",
		input: map[string]any{
			"input": 123,
		},
		expected:  `123`,
		expectErr: false,
	}, {
		name: "Test boolean serialization",
		input: map[string]any{
			"input": true,
		},
		expected:  `true`,
		expectErr: false,
	}, {
		name: "Test object serialization",
		input: map[string]any{
			"input": map[string]any{
				"nestedKey": "nestedValue",
			},
		},
		expected:  `{"nestedKey":"nestedValue"}`,
		expectErr: false,
	}, {
		name:      "Test nil input",
		input:     nil,
		expected:  "",
		expectErr: true,
	}, {
		name: "Test special character handling",
		input: map[string]any{
			"input": "\"test\"\nwith\twhitespace",
		},
		expected:  `"\"test\"\nwith\twhitespace"`,
		expectErr: false,
	}}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, err := processor.(*Serializer).Invoke(ctx, tt.input)

			if tt.expectErr {
				assert.Error(t, err)
				return
			}

			assert.NoError(t, err)
			assert.Contains(t, result, OutputKeySerialization)

			jsonStr, ok := result[OutputKeySerialization].(string)
			assert.True(t, ok, "The output should be of type string")

			assert.JSONEq(t, tt.expected, jsonStr)
		})
	}
}
