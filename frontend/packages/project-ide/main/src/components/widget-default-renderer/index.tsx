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

import { Image } from '@coze-arch/coze-design';

import AgentWorkflowFrame from '@/assets/agent-workflow-frame.svg';
import AgentKnowledgeFrame from '@/assets/agent-knowledge-frame.svg';

import { FullScreenButton } from '../toolbar/full-screen-button';
import { SidebarExpand } from '../sidebar-expand';

import styles from './styles.module.less';

export const WidgetDefaultRenderer = () => {
  return (
    <div className={styles['default-container']}>
      <div className={styles['icon-expand']}>
        <SidebarExpand />
      </div>
      <div className={styles['full-screen']}>
        <FullScreenButton />
      </div>
      <div className={styles.title}>Hi, 欢迎来到 Agent 应用自动构建平台</div>
      <div className={styles['sub-title']}>
        在这里快速完成 Agent 编排、数据接入与自动化发布
      </div>
      <div className={styles.gallery}>
        <div className={styles['gallery-block']}>
          <Image preview={false} src={AgentWorkflowFrame} width={320} height={160} />
          <div className={styles['gallery-title']}>
            Agent 工作流自动编排
          </div>
          <div className={styles['gallery-description']}>
            基于节点快速组装执行链路，自动连接模型、变量与任务流程
          </div>
        </div>
        <div className={styles['gallery-block']}>
          <Image preview={false} src={AgentKnowledgeFrame} width={320} height={160} />
          <div className={styles['gallery-title']}>
            知识与数据统一接入
          </div>
          <div className={styles['gallery-description']}>
            将知识库、数据源与工具链融合到同一平台，实现持续可复用的构建能力
          </div>
        </div>
      </div>
    </div>
  );
};
