/**
 * Default time zone, currently used by the task module
 *
 * Domestic: UTC + 8
 * Overseas: UTC + 0
 */
export const DEFAULT_TIME_ZONE = IS_OVERSEA ? 'Etc/GMT+0' : 'Asia/Shanghai';
export const DEFAULT_TIME_ZONE_OFFSET = IS_OVERSEA ? 'UTC+00:00' : 'UTC+08:00';
// Unknown time zone for compatibility
export const UNKNOWN_TIME_ZONE_OFFSET = 'Others';
