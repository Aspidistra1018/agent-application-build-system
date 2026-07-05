/**
 * Format file size
 * @param bytes file size
 * @Param decimals, default 2 digits
 * @example
 * formatBytes(1024);       // 1KB
 * formatBytes('1024');     // 1KB
 * formatBytes(1234);       // 1.21KB
 * formatBytes(1234, 3);    // 1.205KB
 */
export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024,
    dm = decimals,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`;
}
