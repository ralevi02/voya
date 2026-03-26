/**
 * Parsea una fecha tipo "2026-05-01" sin desfase de timezone.
 * new Date("2026-05-01") interpreta como UTC → desfase en zonas negativas.
 * Esta función parsea los componentes manualmente.
 */
export function parseDateSafe(dateStr: string): Date {
  if (dateStr.includes('T')) return new Date(dateStr);
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatDate(
  dateStr: string,
  locale = 'en-US'
): string {
  return parseDateSafe(dateStr).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatTripDate(dateStr: string): string {
  return formatDate(dateStr, 'es-CL');
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
