package veocr

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"strconv"

	"github.com/volcengine/volc-sdk-golang/service/visual"
	"github.com/volcengine/volcengine-go-sdk/service/arkruntime/model"

	"github.com/coze-dev/coze-studio/backend/infra/document/ocr"
	"github.com/coze-dev/coze-studio/backend/pkg/errorx"
	"github.com/coze-dev/coze-studio/backend/types/errno"
)

type Config struct {
	Client *visual.Visual

	// see: https://www.volcengine.com/docs/6790/117730
	ApproximatePixel *int    // default: 0
	Mode             *string // default: "text_block"
	FilterThresh     *int    // default: 80
	HalfToFull       *bool   // default: false
}

func NewOCR(config *Config) ocr.OCR {
	return &ocrImpl{config}
}

type ocrImpl struct {
	config *Config
}

func (o *ocrImpl) FromBase64(ctx context.Context, b64 string) ([]string, error) {
	form := o.newForm()
	form.Add("image_base64", b64)

	resp, statusCode, err := o.config.Client.OCRNormal(form)
	if err != nil {
		return nil, o.handleError(fmt.Errorf("[ve_ocr][FromBase64] OCRNormal err: %w", err))
	}
	if statusCode != http.StatusOK {
		err = fmt.Errorf("[ve_ocr][FromBase64] OCRNormal failed, status code=%d", statusCode)
		if statusCode == http.StatusBadRequest {
			return nil, errorx.WrapByCode(err, errno.ErrKnowledgeNonRetryableCode)
		}
		return nil, err
	}

	return resp.Data.LineTexts, nil
}

func (o *ocrImpl) FromURL(ctx context.Context, url string) ([]string, error) {
	form := o.newForm()
	form.Add("image_url", url)

	resp, statusCode, err := o.config.Client.OCRNormal(form)
	if err != nil {
		return nil, o.handleError(fmt.Errorf("[ve_ocr][FromURL] OCRNormal error: %w", err))
	}
	if statusCode != http.StatusOK {
		err = fmt.Errorf("[ve_ocr][FromURL] OCRNormal failed, status code=%d", statusCode)
		if statusCode == http.StatusBadRequest {
			return nil, errorx.WrapByCode(err, errno.ErrKnowledgeNonRetryableCode)
		}
		return nil, err
	}

	return resp.Data.LineTexts, nil
}

func (o *ocrImpl) newForm() url.Values {
	form := url.Values{}
	if o.config.ApproximatePixel != nil {
		form.Add("approximate_pixel", strconv.FormatInt(int64(*o.config.ApproximatePixel), 10))
	}
	if o.config.Mode != nil {
		form.Add("mode", *o.config.Mode)
	} else {
		form.Add("mode", "text_block")
	}
	if o.config.FilterThresh != nil {
		form.Add("filter_thresh", strconv.FormatInt(int64(*o.config.FilterThresh), 10))
	}
	if o.config.HalfToFull != nil {
		form.Add("half_to_full", strconv.FormatBool(*o.config.HalfToFull))
	}
	return form
}

func (o *ocrImpl) handleError(err error) error {
	var (
		apiErr = &model.APIError{}
		reqErr = &model.RequestError{}
	)
	if errors.As(err, &apiErr) {
		if apiErr.HTTPStatusCode >= http.StatusInternalServerError ||
			apiErr.HTTPStatusCode == http.StatusTooManyRequests {
			return err
		}
	} else if errors.As(err, &reqErr) {
		if reqErr.HTTPStatusCode >= http.StatusInternalServerError {
			return err
		}
	}
	return errorx.WrapByCode(err, errno.ErrKnowledgeNonRetryableCode)
}
