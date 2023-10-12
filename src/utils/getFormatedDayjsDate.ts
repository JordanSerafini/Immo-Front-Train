// === LIBRARY === //
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function getFormatedDayjsDate(date: string) {
  if (!date.length) return '';

  return dayjs.utc(date).tz('Europe/Paris').toISOString();
}
