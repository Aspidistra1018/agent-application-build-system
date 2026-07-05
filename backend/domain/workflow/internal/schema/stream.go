package schema

import (
	"github.com/cloudwego/eino/compose"

	"github.com/coze-dev/coze-studio/backend/domain/workflow/entity/vo"
)

type FieldStreamType string

const (
	FieldIsStream    FieldStreamType = "yes"     // absolutely a stream
	FieldNotStream   FieldStreamType = "no"      // absolutely not a stream
	FieldMaybeStream FieldStreamType = "maybe"   // maybe a stream, requires request-time resolution
	FieldSkipped     FieldStreamType = "skipped" // the field source's node is skipped
)

// SourceInfo contains stream type for a input field source of a node.
type SourceInfo struct {
	// IsIntermediate means this field is itself not a field source, but a map containing one or more field sources.
	IsIntermediate bool
	// FieldType the stream type of the field. May require request-time resolution in addition to compile-time.
	FieldType FieldStreamType
	// FromNodeKey is the node key that produces this field source. empty if the field is a static value or variable.
	FromNodeKey vo.NodeKey
	// FromPath is the path of this field source within the source node. empty if the field is a static value or variable.
	FromPath compose.FieldPath
	TypeInfo *vo.TypeInfo
	// SubSources are SourceInfo for keys within this intermediate Map(Object) field.
	SubSources map[string]*SourceInfo
}

func (s *SourceInfo) Skipped() bool {
	if !s.IsIntermediate {
		return s.FieldType == FieldSkipped
	}

	for _, sub := range s.SubSources {
		if !sub.Skipped() {
			return false
		}
	}

	return true
}
