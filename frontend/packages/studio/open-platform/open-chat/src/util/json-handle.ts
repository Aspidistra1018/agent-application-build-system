export const STRINGIFY_ERROR = Symbol();

export const catchStringify = (obj: unknown) => {
  try {
    return JSON.stringify(obj);
  } catch (err) {
    console.log('catchStringify error', err);
    return STRINGIFY_ERROR;
  }
};

export const catchParse = <T = unknown>(objStr: string, defaultValue?: T) => {
  try {
    return JSON.parse(objStr) as T;
  } catch (err) {
    console.log('catchParse error', err);
  }

  return defaultValue;
};
