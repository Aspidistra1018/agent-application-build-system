import { type DefinePluginOptions } from '@rspack/core';

import { getRspackAppDefineEnvs } from './app';

export const devDefineEnvs: DefinePluginOptions = getRspackAppDefineEnvs();
