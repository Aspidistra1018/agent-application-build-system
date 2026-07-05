package impl

import (
	"net/http"

	"github.com/volcengine/volc-sdk-golang/service/visual"

	"github.com/coze-dev/coze-studio/backend/api/model/admin/config"
	"github.com/coze-dev/coze-studio/backend/infra/document/ocr"
	"github.com/coze-dev/coze-studio/backend/infra/document/ocr/impl/ppocr"
	"github.com/coze-dev/coze-studio/backend/infra/document/ocr/impl/veocr"
	"github.com/coze-dev/coze-studio/backend/pkg/logs"
)

type OCR = ocr.OCR

func New(conf *config.KnowledgeConfig) ocr.OCR {
	var ocr ocr.OCR

	switch conf.OcrConfig.Type {
	case config.OCRType_Volcengine:
		if conf.OcrConfig.VolcengineAk == "" || conf.OcrConfig.VolcengineSk == "" {
			logs.Warnf("[ve_ocr] ak / sk not configured, ocr might not work well")
		}
		inst := visual.NewInstance()
		inst.Client.SetAccessKey(conf.OcrConfig.VolcengineAk)
		inst.Client.SetSecretKey(conf.OcrConfig.VolcengineSk)
		ocr = veocr.NewOCR(&veocr.Config{Client: inst})
	case config.OCRType_Paddleocr:
		url := conf.OcrConfig.PaddleocrAPIURL
		client := &http.Client{}
		ocr = ppocr.NewOCR(&ppocr.Config{Client: client, URL: url})
	default:
		// accept ocr not configured
	}

	return ocr
}
