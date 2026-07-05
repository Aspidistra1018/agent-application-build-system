// import { runtimeEnv } from '@coze-arch/bot-env/runtime';
const DEBUG_TAG = 'open_debug';
const OPEN_CONSOLE_MARK = new RegExp(`(?:\\?|\\&)${DEBUG_TAG}=true`);

export const shouldCloseConsole = () => {
  // Allow console to open if the URL is marked with debug enabled
  const { search } = window.location;
  let isOpenDebug = !!sessionStorage.getItem(DEBUG_TAG);
  if (!isOpenDebug) {
    isOpenDebug = OPEN_CONSOLE_MARK.test(search);
    isOpenDebug && sessionStorage.setItem(DEBUG_TAG, 'true');
  }
  // Except for the official normal environment, the console is allowed to open
  const isProduction = !!IS_RELEASE_VERSION;
  console.log('IS_RELEASE_VERSION', IS_RELEASE_VERSION, isProduction);
  return !isOpenDebug && isProduction;
};
