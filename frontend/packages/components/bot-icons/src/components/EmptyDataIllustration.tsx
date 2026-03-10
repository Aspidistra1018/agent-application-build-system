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

import React from 'react';

interface EmptyDataIllustrationProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 自定义空状态插图 - 用于替换 IllustrationNoContent
 * 设计理念：展示一个空的数据容器，配合变量符号，传达"暂无数据"的概念
 */
export const EmptyDataIllustration: React.FC<EmptyDataIllustrationProps> = ({
  className,
  style,
}) => {
  return (
    <svg
      className={className}
      style={style}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 背景圆形装饰 */}
      <circle cx="100" cy="100" r="90" fill="#F7F8FA" />
      
      {/* 主容器 - 数据库/文件夹形状 */}
      <rect
        x="50"
        y="70"
        width="100"
        height="80"
        rx="8"
        fill="white"
        stroke="#DFE1E6"
        strokeWidth="2"
      />
      
      {/* 容器顶部装饰线 */}
      <line
        x1="50"
        y1="90"
        x2="150"
        y2="90"
        stroke="#DFE1E6"
        strokeWidth="2"
      />
      
      {/* 变量符号 X */}
      <text
        x="100"
        y="125"
        fontSize="48"
        fontWeight="300"
        fill="#C9CDD4"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
      >
        X
      </text>
      
      {/* 装饰性小圆点 */}
      <circle cx="70" cy="80" r="3" fill="#C9CDD4" />
      <circle cx="85" cy="80" r="3" fill="#C9CDD4" />
      <circle cx="100" cy="80" r="3" fill="#C9CDD4" />
      
      {/* 底部装饰线条 - 表示空列表 */}
      <line
        x1="65"
        y1="105"
        x2="95"
        y2="105"
        stroke="#E8EAED"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="65"
        y1="135"
        x2="135"
        y2="135"
        stroke="#E8EAED"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* 浮动装饰元素 - 左上 */}
      <circle
        cx="35"
        cy="55"
        r="4"
        fill="#E3E5E8"
        opacity="0.6"
      />
      <circle
        cx="45"
        cy="45"
        r="3"
        fill="#E3E5E8"
        opacity="0.4"
      />
      
      {/* 浮动装饰元素 - 右下 */}
      <circle
        cx="165"
        cy="145"
        r="4"
        fill="#E3E5E8"
        opacity="0.6"
      />
      <circle
        cx="155"
        cy="155"
        r="3"
        fill="#E3E5E8"
        opacity="0.4"
      />
    </svg>
  );
};
