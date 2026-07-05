package fileutil

import (
	"os"
	"path/filepath"

	"github.com/coze-dev/coze-studio/backend/pkg/logs"
)

func GetPythonFilePath(fileName string) string {
	cwd, err := os.Getwd()
	if err != nil {
		logs.Warnf("[GetPythonFilePath] Failed to get current working directory: %v", err)
		return fileName
	}

	return filepath.Join(cwd, fileName)
}

func GetPython3Path() string {
	cwd, err := os.Getwd()
	if err != nil {
		logs.Warnf("[GetPython3Path] Failed to get current working directory: %v", err)
		return ".venv/bin/python3"
	}

	filePath := filepath.Join(cwd, ".venv/bin/python3")
	if _, err := os.Stat(filePath); err == nil {
		return filePath
	}

	return "python3" // use system python3
}
