import type {
  IPlugin,
  IHooks,
  ITemplatesHook,
  IPromptsHookParams,
} from 'rush-init-project-plugin';
// FIXME:
// According to https://github.com/bytemate/rush-plugins/blob/main/rush-plugins/rush-init-project-plugin/docs/init_project_configuration.md
// The guidelines of this article cannot be correctly resolved to the corresponding module, and a solution has not been found for the time being, so the relative path reference is used here first
// Future needs to be adjusted to normal node_modules citation
import {
  getTemplatesFolder,
  getTemplateNameList,
} from '../../autoinstallers/plugins/node_modules/rush-init-project-plugin/lib/logic/templateFolder';
import { parseCommandLineArguments } from './utils/parse-args';

export default class ShowTemplatePlugin implements IPlugin {
  apply(hooks: IHooks): void {
    const args = parseCommandLineArguments();

    const answer = JSON.parse(args.answer ?? '{}');
    const isShowChatAreaTemplate = answer['showTemplate'];

    hooks.templates.tap('ShowTemplatePlugin', (templates: ITemplatesHook) => {
      const templateFolder: string = getTemplatesFolder();
      const templateNameList = getTemplateNameList(templateFolder);

      const filteredNormalTemplateNameList = templateNameList.filter(
        item => !item.templateFolder?.includes('chat-'),
      );

      templates.templates.push(
        ...(isShowChatAreaTemplate
          ? templateNameList
          : filteredNormalTemplateNameList),
      );
    });
  }
}
