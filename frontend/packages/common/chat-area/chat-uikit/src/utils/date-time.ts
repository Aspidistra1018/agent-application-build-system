import dayjs from 'dayjs';

export const formatMessageBoxContentTime = (contentTime: number): string => {
  if (contentTime < 1) {
    return '';
  }
  // Day: hh: mm; across the sky: mm-dd hh: mm; New Year's Eve: yyyy-mm-dd hh: mm
  const now = Date.now();
  const today = dayjs(now);
  const messageDay = dayjs(contentTime);
  if (today.year() !== messageDay.year()) {
    return messageDay.format('YYYY-MM-DD HH:mm');
  }
  if (
    today.month() !== messageDay.month() ||
    today.date() !== messageDay.date()
  ) {
    return messageDay.format('MM-DD HH:mm');
  }
  return messageDay.format('HH:mm');
};
