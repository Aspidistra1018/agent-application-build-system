// Text in the object to avoid characters being translated
export const generateStrAvoidEscape = (str: string) => {
  const characters = {
    '\\': '\\\\',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t',
  };

  let next = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    next += characters[char] || char;
  }

  return next;
};
