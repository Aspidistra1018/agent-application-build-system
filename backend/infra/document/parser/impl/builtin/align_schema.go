package builtin

import (
	"github.com/coze-dev/coze-studio/backend/infra/document"
)

func alignTableSliceValue(schema []*document.Column, row []*document.ColumnData) (err error) {
	for i, col := range row {
		var newCol *document.ColumnData
		newCol, err = assertValAs(schema[i].Type, col.GetStringValue())
		if err != nil {
			return err
		}

		newCol.ColumnID = col.ColumnID
		newCol.ColumnName = col.ColumnName
		row[i] = newCol
	}

	return nil
}
