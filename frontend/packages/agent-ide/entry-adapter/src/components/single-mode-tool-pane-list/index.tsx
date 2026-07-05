import { BotPageFromEnum } from '@coze-arch/bot-typings/common';
import { SkillsPane } from '@coze-agent-ide/skills-pane-adapter';
import { MemoryToolPane } from '@coze-agent-ide/memory-tool-pane-adapter';
import { DebugToolList } from '@coze-agent-ide/debug-tool-list';

export interface SingleModeToolPaneListProps {
  pageFrom: BotPageFromEnum | undefined;
  showBackground: boolean;
}

export const SingleModeToolPaneList: React.FC<SingleModeToolPaneListProps> = ({
  pageFrom,
  showBackground,
}) => {
  // 隐藏右上角的调试工具图标
  return null;
  
  /* 原始代码已隐藏
  if (pageFrom === BotPageFromEnum.Store) {
    return (
      <DebugToolList showBackground={showBackground}>
        <MemoryToolPane />
      </DebugToolList>
    );
  }
  return (
    <DebugToolList showBackground={showBackground}>
      <SkillsPane />
      <MemoryToolPane />
    </DebugToolList>
  );
  */
};
