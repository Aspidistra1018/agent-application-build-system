export const filterUnnecessaryContentFromSlice = (slice: string): string => {
  let res = slice;
  // Filter img tags
  res = res.replaceAll(/<(\n)*img((?!(<(\n)*img))(.|\n))*>/g, '');
  return res;
};
