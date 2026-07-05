package convert

import (
	"github.com/coze-dev/coze-studio/backend/infra/document"
	rdbEntity "github.com/coze-dev/coze-studio/backend/infra/rdb/entity"
)

func ConvertColumnType(columnType document.TableColumnType) rdbEntity.DataType {
	switch columnType {
	case document.TableColumnTypeBoolean:
		return rdbEntity.TypeBoolean
	case document.TableColumnTypeInteger:
		return rdbEntity.TypeBigInt
	case document.TableColumnTypeNumber:
		return rdbEntity.TypeDouble
	case document.TableColumnTypeString, document.TableColumnTypeImage:
		return rdbEntity.TypeText
	case document.TableColumnTypeTime:
		return rdbEntity.TypeTimestamp
	default:
		return rdbEntity.TypeText
	}
}
