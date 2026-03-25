export function formatDate(
  dateStr: string,
  locale = 'en-US'
): string {
  return new Date(dateStr).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTime(
  dateStr: string,
  locale = 'en-US'
): string {
  return new Date(dateStr).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateTime(
  dateStr: string,
  locale = 'en-US'
): string {
  return `${formatDate(dateStr, locale)} ${formatTime(dateStr, locale)}`;
}

export function getDaysBetween(start: string, end: string): number {
  const ms = new Date(end).getTime() - new Date(start).getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function isToday(dateStr: string): boolean {
  const date = new Date(dateStr);
  const today = new Date();
  return date.toDateString() === today.toDateString();
}
