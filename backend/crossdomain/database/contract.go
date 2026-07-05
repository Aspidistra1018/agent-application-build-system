package database

import (
	"context"

	database "github.com/coze-dev/coze-studio/backend/crossdomain/database/model"
)

//go:generate  mockgen -destination databasemock/database_mock.go --package databasemock -source model.go
type Database interface {
	ExecuteSQL(ctx context.Context, req *database.ExecuteSQLRequest) (*database.ExecuteSQLResponse, error)
	PublishDatabase(ctx context.Context, req *database.PublishDatabaseRequest) (resp *database.PublishDatabaseResponse, err error)
	DeleteDatabase(ctx context.Context, req *database.DeleteDatabaseRequest) error
	BindDatabase(ctx context.Context, req *database.BindDatabaseToAgentRequest) error
	UnBindDatabase(ctx context.Context, req *database.UnBindDatabaseToAgentRequest) error
	MGetDatabase(ctx context.Context, req *database.MGetDatabaseRequest) (*database.MGetDatabaseResponse, error)
	GetAllDatabaseByAppID(ctx context.Context, req *database.GetAllDatabaseByAppIDRequest) (*database.GetAllDatabaseByAppIDResponse, error)

	Execute(ctx context.Context, request *database.CustomSQLRequest) (*database.Response, error)
	Query(ctx context.Context, request *database.QueryRequest) (*database.Response, error)
	Update(context.Context, *database.UpdateRequest) (*database.Response, error)
	Insert(ctx context.Context, request *database.InsertRequest) (*database.Response, error)
	Delete(context.Context, *database.DeleteRequest) (*database.Response, error)
}

var defaultSVC Database

func DefaultSVC() Database {
	return defaultSVC
}

func SetDefaultSVC(c Database) {
	defaultSVC = c
}
