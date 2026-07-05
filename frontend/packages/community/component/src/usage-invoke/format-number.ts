// 将数字转换成百分数, 向上取整
export const formatNumber = (num?: number): string => {
  if (num === undefined || num === null) {
    return '-';
  }

  let formatted = '';
  if (num >= 10000) {
    formatted = (num / 10000).toFixed(1);
    // 如果小数点后一位是0，则移除小数点和0
    if (formatted.endsWith('.0')) {
      formatted = formatted.slice(0, -2);
    }
    // 添加w并返回结果
    formatted = `${formatted}w`;
  } else {
    formatted = num.toString();
  }

  return formatted;
};
