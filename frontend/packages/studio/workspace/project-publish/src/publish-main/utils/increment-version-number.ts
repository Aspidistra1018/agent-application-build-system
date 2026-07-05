export const incrementVersionNumber = (input: string) => {
  // Define regular expressions that match the pattern of "number. number. number"
  const regex = /(\d+)\.(\d+)\.(\d+)/g;

  // Use the replace method and callback function to replace the matching part
  // eslint-disable-next-line max-params
  const result = input.replace(regex, (_match, p1, p2, p3) => {
    // Add 1 to the last number.
    const incrementedP3 = parseInt(String(p3), 10) + 1;
    // Return a new string
    return `${p1}.${p2}.${incrementedP3}`;
  });

  return result;
};
