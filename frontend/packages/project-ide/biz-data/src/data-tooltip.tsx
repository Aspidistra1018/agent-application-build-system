import React, { type FC } from 'react';

import { Image } from '@coze-arch/coze-design';
import { BizResourceTypeEnum } from '@coze-project-ide/biz-components';

import knowledgeAgentCard from './knowledge-agent-card.svg';
import databaseAgentCard from './database-agent-card.svg';

export const DataTooltip: FC<{ subType: BizResourceTypeEnum }> = ({
  subType,
}) => {
  const isKnowledge = subType === BizResourceTypeEnum.Knowledge;
  return (
    <div className="flex flex-col gap-1">
      <Image
        src={isKnowledge ? knowledgeAgentCard : databaseAgentCard}
        crossOrigin="anonymous"
        imgStyle={{
          width: 200,
          minHeight: 120,
          borderRadius: '7.5px',
          border: '1px solid var(--coz-stroke-primary)',
        }}
        preview={false}
      />
      <div className="px-2 pt-1 pb-2">
        <p className="text-14 font-medium coz-fg-primary leading-5">
          {isKnowledge ? 'Knowledge' : 'Database'}
        </p>
        <span className="text-[12px] coz-fg-primary leading-4">
          {isKnowledge
            ? '用于构建知识检索与问答能力'
            : '用于存储与查询结构化业务数据'}
        </span>
      </div>
    </div>
  );
};

