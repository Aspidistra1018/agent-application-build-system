package impl

import (
	"context"
	"fmt"
	"os"

	"github.com/coze-dev/coze-studio/backend/infra/imagex"
	"github.com/coze-dev/coze-studio/backend/infra/storage"
	"github.com/coze-dev/coze-studio/backend/infra/storage/impl/minio"
	"github.com/coze-dev/coze-studio/backend/infra/storage/impl/s3"
	"github.com/coze-dev/coze-studio/backend/infra/storage/impl/tos"
	"github.com/coze-dev/coze-studio/backend/types/consts"
)

type Storage = storage.Storage

func New(ctx context.Context) (Storage, error) {
	storageType := os.Getenv(consts.StorageType)
	switch storageType {
	case "minio":
		return minio.New(
			ctx,
			os.Getenv(consts.MinIOEndpoint),
			os.Getenv(consts.MinIOAK),
			os.Getenv(consts.MinIOSK),
			os.Getenv(consts.StorageBucket),
			false,
		)
	case "tos":
		return tos.New(
			ctx,
			os.Getenv(consts.TOSAccessKey),
			os.Getenv(consts.TOSSecretKey),
			os.Getenv(consts.StorageBucket),
			os.Getenv(consts.TOSEndpoint),
			os.Getenv(consts.TOSRegion),
		)
	case "s3":
		return s3.New(
			ctx,
			os.Getenv(consts.S3AccessKey),
			os.Getenv(consts.S3SecretKey),
			os.Getenv(consts.StorageBucket),
			os.Getenv(consts.S3Endpoint),
			os.Getenv(consts.S3Region),
		)
	}

	return nil, fmt.Errorf("unknown storage type: %s", storageType)
}

func NewImagex(ctx context.Context) (imagex.ImageX, error) {
	storageType := os.Getenv(consts.StorageType)
	switch storageType {
	case "minio":
		return minio.NewStorageImagex(
			ctx,
			os.Getenv(consts.MinIOEndpoint),
			os.Getenv(consts.MinIOAK),
			os.Getenv(consts.MinIOSK),
			os.Getenv(consts.StorageBucket),
			false,
		)
	case "tos":
		return tos.NewStorageImagex(
			ctx,
			os.Getenv(consts.TOSAccessKey),
			os.Getenv(consts.TOSSecretKey),
			os.Getenv(consts.StorageBucket),
			os.Getenv(consts.TOSEndpoint),
			os.Getenv(consts.TOSRegion),
		)
	case "s3":
		return s3.NewStorageImagex(
			ctx,
			os.Getenv(consts.S3AccessKey),
			os.Getenv(consts.S3SecretKey),
			os.Getenv(consts.StorageBucket),
			os.Getenv(consts.S3Endpoint),
			os.Getenv(consts.S3Region),
		)
	}
	return nil, fmt.Errorf("unknown storage type: %s", storageType)
}
