package entity

import (
	"context"
	"encoding/base64"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/coze-dev/coze-studio/backend/api/model/data/variable/kvmemory"
	"github.com/coze-dev/coze-studio/backend/api/model/data/variable/project_memory"
	variables "github.com/coze-dev/coze-studio/backend/crossdomain/variables/model"
	"github.com/coze-dev/coze-studio/backend/pkg/errorx"
	"github.com/coze-dev/coze-studio/backend/types/errno"
)

type UserVariableMeta struct {
	*variables.UserVariableMeta
}

func NewUserVariableMeta(v *variables.UserVariableMeta) *UserVariableMeta {
	return &UserVariableMeta{
		UserVariableMeta: v,
	}
}

type VariableInstance struct {
	ID           int64
	BizType      project_memory.VariableConnector
	BizID        string
	Version      string
	Keyword      string
	Type         int32
	Content      string
	ConnectorUID string
	ConnectorID  int64
	CreatedAt    int64
	UpdatedAt    int64
}

const (
	sysUUIDKey string = "sys_uuid"
)

func (v *UserVariableMeta) GenSystemKV(ctx context.Context, keyword string) (*kvmemory.KVItem, error) {
	if keyword != sysUUIDKey { // The outfield only supports this one variable for the time being
		return nil, nil
	}

	return v.genUUID(ctx)
}

func (v *UserVariableMeta) genUUID(ctx context.Context) (*kvmemory.KVItem, error) {
	if v.BizID == "" {
		return nil, errorx.New(errno.ErrMemoryGetSysUUIDInstanceCode, errorx.KV("msg", "biz_id is empty"))
	}

	if v.ConnectorUID == "" {
		return nil, errorx.New(errno.ErrMemoryGetSysUUIDInstanceCode, errorx.KV("msg", "connector_uid is empty"))
	}

	if v.ConnectorID == 0 {
		return nil, errorx.New(errno.ErrMemoryGetSysUUIDInstanceCode, errorx.KV("msg", "connector_id is empty"))
	}

	encryptSysUUIDKey := v.encryptSysUUIDKey(ctx)
	now := time.Now().Unix()

	return &kvmemory.KVItem{
		Keyword:    sysUUIDKey,
		Value:      encryptSysUUIDKey,
		Schema:     stringSchema,
		CreateTime: now,
		UpdateTime: now,
		IsSystem:   true,
	}, nil
}

func (v *UserVariableMeta) encryptSysUUIDKey(ctx context.Context) string {
	// Combine four fields with a special delimiter (e.g. |)
	plain := fmt.Sprintf("%d|%s|%s|%d", v.BizType, v.BizID, v.ConnectorUID, v.ConnectorID)
	return base64.StdEncoding.EncodeToString([]byte(plain))
}

func (v *UserVariableMeta) DecryptSysUUIDKey(ctx context.Context, encryptSysUUIDKey string) *VariableInstance {
	data, err := base64.StdEncoding.DecodeString(encryptSysUUIDKey)
	if err != nil {
		return nil
	}

	parts := strings.Split(string(data), "|")
	if len(parts) != 4 {
		return nil
	}

	bizType64, _ := strconv.ParseInt(parts[0], 10, 32)
	connectorID, _ := strconv.ParseInt(parts[3], 10, 64)
	return &VariableInstance{
		BizType:      project_memory.VariableConnector(bizType64),
		BizID:        parts[1],
		ConnectorUID: parts[2],
		ConnectorID:  connectorID,
	}
}
