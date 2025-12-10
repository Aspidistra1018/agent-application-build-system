/*
 * Copyright 2025 coze-dev Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package middleware

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"strings"
	"time"

	"github.com/cloudwego/hertz/pkg/app"
	"github.com/coze-dev/coze-studio/backend/application/user"
	"github.com/coze-dev/coze-studio/backend/domain/user/entity"
	"github.com/coze-dev/coze-studio/backend/pkg/ctxcache"
	"github.com/coze-dev/coze-studio/backend/pkg/logs"
	"github.com/coze-dev/coze-studio/backend/types/consts"
)

const (
	jwtSecretKey = "your-secret-key-must-be-at-least-256-bits-long-for-HS256-algorithm"
)

type JWTClaims struct {
	UserID   int64  `json:"userId"`
	Email    string `json:"email"`
	Platform string `json:"platform"`
	Sub      string `json:"sub"`
	Iat      int64  `json:"iat"`
	Exp      int64  `json:"exp"`
}

func SSOAuthMW() app.HandlerFunc {
	return func(c context.Context, ctx *app.RequestContext) {
		token := string(ctx.Query("token"))

		if token != "" {
			claims, err := validateJWT(token)
			if err == nil && claims != nil {
				platform := claims.Platform
				if platform == "agent" || platform == "both" {
					userInfo, err := user.UserApplicationSVC.GetUserByEmail(c, claims.Email)
					if err == nil && userInfo != nil {
						session := &entity.Session{
							UserID:    userInfo.UserID,
							UserEmail: userInfo.Email,
						}
						ctxcache.Store(c, consts.SessionDataKeyInCtx, session)
						logs.Infof("[SSOAuthMW] SSO login success for user: %s", claims.Email)
					}
				}
			}
		}

		ctx.Next(c)
	}
}

func validateJWT(tokenString string) (*JWTClaims, error) {
	parts := strings.Split(tokenString, ".")
	if len(parts) != 3 {
		return nil, nil
	}

	headerBytes, err := base64.RawURLEncoding.DecodeString(parts[0])
	if err != nil {
		return nil, err
	}

	payloadBytes, err := base64.RawURLEncoding.DecodeString(parts[1])
	if err != nil {
		return nil, err
	}

	signature, err := base64.RawURLEncoding.DecodeString(parts[2])
	if err != nil {
		return nil, err
	}

	expectedSignature := generateSignature(parts[0] + "." + parts[1])
	if !hmac.Equal(signature, expectedSignature) {
		return nil, nil
	}

	var claims JWTClaims
	if err := json.Unmarshal(payloadBytes, &claims); err != nil {
		return nil, err
	}

	if time.Now().Unix() > claims.Exp {
		return nil, nil
	}

	_ = headerBytes

	return &claims, nil
}

func generateSignature(data string) []byte {
	h := hmac.New(sha256.New, []byte(jwtSecretKey))
	h.Write([]byte(data))
	return h.Sum(nil)
}
