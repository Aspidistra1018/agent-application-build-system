import type { IConfig } from '../../autoinstallers/plugins/node_modules/rush-init-project-plugin';
import ShowTemplatePlugin from './ShowTemplatePlugin';

const config: IConfig = {
  plugins: [new ShowTemplatePlugin()],
};

export default config;
