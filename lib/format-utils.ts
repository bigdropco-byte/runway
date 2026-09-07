/**
 * Native Internationalization Formatting Helpers
 * Uses Intl.NumberFormat and Intl.DateTimeFormat
 */

export function formatLocalizedNumber(
  value: number,
  locale: string = 'en',
  options?: Intl.NumberFormatOptions
): string {
  try {
    return new Intl.NumberFormat(locale, options).format(value);
  } catch {
    return new Intl.NumberFormat('en', options).format(value);
  }
}

export function formatLocalizedCurrency(
  amount: number,
  locale: string = 'en',
  currency: string = 'USD'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(amount);
  } catch {
    return `$${amount.toLocaleString('en-US')}`;
  }
}

export function formatLocalizedPercent(
  value: number,
  locale: string = 'en',
  decimals: number = 1
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value / 100);
  } catch {
    return `${value.toFixed(decimals)}%`;
  }
}

export function formatLocalizedDate(
  date: Date | string | number,
  locale: string = 'en',
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
): string {
  try {
    const d = typeof date === 'object' ? date : new Date(date);
    return new Intl.DateTimeFormat(locale, options).format(d);
  } catch {
    return new Date(date).toLocaleDateString('en-US');
  }
}
