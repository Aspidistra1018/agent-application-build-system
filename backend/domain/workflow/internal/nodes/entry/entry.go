package entry

import (
	"context"
	"fmt"

	"github.com/coze-dev/coze-studio/backend/domain/workflow/entity"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/entity/vo"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/internal/canvas/convert"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/internal/nodes"
	"github.com/coze-dev/coze-studio/backend/domain/workflow/internal/schema"
)

type Config struct {
	DefaultValues map[string]any
}

func (c *Config) Adapt(_ context.Context, n *vo.Node, _ ...nodes.AdaptOption) (*schema.NodeSchema, error) {
	if n.Parent() != nil {
		return nil, fmt.Errorf("entry node cannot have parent: %s", n.Parent().ID)
	}

	if n.ID != entity.EntryNodeKey {
		return nil, fmt.Errorf("entry node id must be %s, got %s", entity.EntryNodeKey, n.ID)
	}

	ns := &schema.NodeSchema{
		Key:  vo.NodeKey(n.ID),
		Name: n.Data.Meta.Title,
		Type: entity.NodeTypeEntry,
	}

	defaultValues := make(map[string]any, len(n.Data.Outputs))
	for _, v := range n.Data.Outputs {
		variable, err := vo.ParseVariable(v)
		if err != nil {
			return nil, err
		}
		if variable.DefaultValue != nil {
			defaultValues[variable.Name] = variable.DefaultValue
		}
	}

	c.DefaultValues = defaultValues
	ns.Configs = c

	if err := convert.SetOutputTypesForNodeSchema(n, ns); err != nil {
		return nil, err
	}

	return ns, nil
}

func (c *Config) Build(ctx context.Context, ns *schema.NodeSchema, _ ...schema.BuildOption) (any, error) {
	defaultValues, _, err := nodes.ConvertInputs(ctx, c.DefaultValues, ns.OutputTypes, nodes.FailFast(), nodes.SkipRequireCheck())
	if err != nil {
		return nil, err
	}

	return &Entry{
		defaultValues: defaultValues,
		outputTypes:   ns.OutputTypes,
	}, nil
}

type Entry struct {
	defaultValues map[string]any
	outputTypes   map[string]*vo.TypeInfo
}

func (e *Entry) Invoke(_ context.Context, input map[string]any) (out map[string]any, err error) {
	in := make(map[string]any, len(input))
	for k, v := range input {
		in[k] = v
	}
	for k, v := range e.defaultValues {
		if val, ok := in[k]; ok {
			tInfo := e.outputTypes[k]
			switch tInfo.Type {
			case vo.DataTypeString:
				if len(val.(string)) == 0 {
					in[k] = v
				}
			case vo.DataTypeArray:
				if len(val.([]any)) == 0 {
					in[k] = v
				}
			case vo.DataTypeObject:
				if len(val.(map[string]any)) == 0 {
					in[k] = v
				}
			}
		} else {
			in[k] = v
		}
	}

	return in, err
}
