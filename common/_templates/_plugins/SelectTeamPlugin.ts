import type {
  IPlugin,
  IHooks,
  IPromptsHookParams,
} from 'rush-init-project-plugin';
import { readFileSync } from 'fs';
import path from 'path';
import JSON5 from '../../autoinstallers/plugins/node_modules/json5';

const rushJson = JSON5.parse(
  readFileSync(path.resolve(__dirname, '../../../rush.json')).toString('utf-8'),
);

export default class SelectTeamPlugin implements IPlugin {
  apply(hooks: IHooks): void {
    hooks.prompts.tap('SelectTeamPlugin', (prompts: IPromptsHookParams) => {
      // Leave only the prefix team-
      const teamNamePrefix = /^team-/;
      const choices = rushJson.allowedProjectTags
        .filter(teamName => teamNamePrefix.test(teamName))
        .map(teamName => teamName.replace(teamNamePrefix, ''));

      // Unshift an issue, causing the user to display the issue after selecting a template.
      prompts.promptQueue.unshift({
        type: 'list',
        name: 'team',
        message: 'Select your team',
        choices,
        default: 0, // Default choices [0]
      });

      const projectFolderPrompt = prompts.promptQueue.find(
        item => item.name === 'projectFolder',
      );
      projectFolderPrompt.default = answers => {
        // Remove the scope from the folder name, such as @code-arch/foo - > foo
        const folderDir = answers.packageName.split('/').slice(-1)[0];
        return `frontend/packages/${answers.team}/${folderDir}`;
      };
    });
  }
}
