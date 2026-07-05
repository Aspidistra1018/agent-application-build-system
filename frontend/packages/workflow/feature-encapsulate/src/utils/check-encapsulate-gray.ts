import { getFlags } from '@coze-arch/bot-flags';
/**
 * Verify whether it can be encapsulated
 * Can @returns be encapsulated?
 */
export function checkEncapsulateGray() {
  const FLAGS = getFlags();
  return !!FLAGS['bot.automation.encapsulate'];
}
