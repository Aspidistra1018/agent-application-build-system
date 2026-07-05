/* eslint-disable @typescript-eslint/naming-convention */
// Values that need to be shared globally can be registered here in advance
interface GlobalVars {
  /**
   * Last Execute ID that extracts from apps/bot/src/store/bot-detail/utils/execute-draft-bot-request-id.ts
   *
   * The log id of the debug record dialogue interface does not need to be reactive, so it is directly stored in const.
   */
  LAST_EXECUTE_ID: string;
  [key: string | symbol]: unknown;
}

const createGlobalVarsStorage = () => {
  const storage = new Map();

  return new Proxy<GlobalVars>(Object.create(null), {
    get<T extends keyof GlobalVars>(_: unknown, prop: T): GlobalVars[T] {
      if (storage.has(prop)) {
        return storage.get(prop as string);
      }
      // add more logic for dev mode
      return undefined;
    },
    set<T extends keyof GlobalVars>(_: unknown, prop: T, value: GlobalVars[T]) {
      storage.set(prop, value);
      return true;
    },
  }) as GlobalVars;
};

/**
 * universal global variable
 */
export const globalVars = createGlobalVarsStorage();
