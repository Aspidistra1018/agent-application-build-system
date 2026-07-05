package goutil

import "net/url"

// MapToQuery converts a map[string]string to a URL-encoded query string.
func MapToQuery(data map[string]string) string {
	if len(data) == 0 {
		return ""
	}
	params := url.Values{}
	for k, v := range data {
		params.Set(k, v)
	}
	return params.Encode()
}
