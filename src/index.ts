export interface UiDateInput {
  input: string | Date | number;
  locale?: string;
}

export interface DateOverview {
  dayName: string;
  shortDayName: string;
  monthName: string;
  shortMonthName: string;
  monthCount: number;
  day: number;
  year: number;
  isoDate: string;
  usaDate: string;
  time12: string;
  time24: string;
  isLeapYear: boolean;
  isWeekend: boolean;
  relativeTime: string;
  isToday: boolean;
  isTomorrow: boolean;
  isYesterday: boolean;
  formatFullDate: string;
}

class UiDate {
  private _date: Date;
  private _locale: string;

  constructor({ input, locale = "default" }: UiDateInput) {
    const d = input instanceof Date ? input : new Date(input);

    if (isNaN(d.getTime())) {
      throw new Error(`Invalid input: ${input}`);
    }

    this._locale = this.validateLocale(locale);
    this._date = d;
  }

  private validateLocale(requestedLocale: string): string {
    try {
      Intl.DateTimeFormat.supportedLocalesOf(requestedLocale);
      return requestedLocale;
    } catch {
      return "default";
    }
  }

  /** Returns full ('Saturday') or short ('Sat') day name */
  getDayName(short: boolean = false): string {
    return this._date.toLocaleDateString(this._locale, {
      weekday: short ? "short" : "long",
    });
  }

  /** Returns full ('August') or short ('Aug') month name */
  getMonthName(short: boolean = false): string {
    return this._date.toLocaleDateString(this._locale, {
      month: short ? "short" : "long",
    });
  }

  /** Returns 4-digit year (e.g. 2026) */
  getYear(): number {
    return this._date.getFullYear();
  }

  /** Returns 1-based month count (1 - 12) */
  getMonthCount(): number {
    return this._date.getMonth() + 1;
  }

  /** Returns day of the month (1 - 31) */
  getDay(): number {
    return this._date.getDate();
  }

  /** Returns formatted time string ('6:30 PM' or '18:30') */
  getTime(use24HourFormat: boolean = false): string {
    return this._date.toLocaleTimeString(this._locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !use24HourFormat,
    });
  }

  /** Returns formatted date string ("07/23/2026" or "2026-07-23") */
  getDate(isoFormat: boolean = false): string {
    if (isoFormat) {
      return this._date.toISOString().split("T")[0];
    }
    return this._date.toLocaleDateString(this._locale, {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  }

  /** Checks if year is leap year */
  isLeapYear(): boolean {
    const year = this.getYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  /** Checks if day falls on Saturday or Sunday */
  isWeekend(): boolean {
    const dayOfWeek = this._date.getDay(); // 0 = Sunday, 6 = Saturday
    return dayOfWeek === 0 || dayOfWeek === 6;
  }

  /** Checks if the wrapped date matches today's date */
  isToday(): boolean {
    const today = new Date();
    return (
      this._date.getDate() === today.getDate() &&
      this._date.getMonth() === today.getMonth() &&
      this._date.getFullYear() === today.getFullYear()
    );
  }

  /** Checks if the date is tomorrow */
  isTomorrow(): boolean {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      this._date.getDate() === tomorrow.getDate() &&
      this._date.getMonth() === tomorrow.getMonth() &&
      this._date.getFullYear() === tomorrow.getFullYear()
    );
  }

  /** Checks if the date was yesterday */
  isYesterday(): boolean {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      this._date.getDate() === yesterday.getDate() &&
      this._date.getMonth() === yesterday.getMonth() &&
      this._date.getFullYear() === yesterday.getFullYear()
    );
  }

  /** Returns human readable relative time */
  getRelativeTime(): string {
    const now = new Date();
    const diffInSeconds = Math.round((this._date.getTime() - now.getTime()) / 1000);

    if (Math.abs(diffInSeconds) < 5) return "just now";

    const rtf = new Intl.RelativeTimeFormat(this._locale, { numeric: "auto" });

    const units: { name: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
      { name: "year", seconds: 31536000 },
      { name: "month", seconds: 2592000 },
      { name: "day", seconds: 86400 },
      { name: "hour", seconds: 3600 },
      { name: "minute", seconds: 60 },
      { name: "second", seconds: 1 },
    ];

    for (const unit of units) {
      if (Math.abs(diffInSeconds) >= unit.seconds) {
        const value = Math.round(diffInSeconds / unit.seconds);
        return rtf.format(value, unit.name);
      }
    }

    return "just now";
  }

  /** Returns human readable formatted full date */
  formatFullDate(short: boolean = false): string {
    const dayName = this.getDayName(short);
    const day = this.getDay();
    const monthName = this.getMonthName(short);
    const year = this.getYear();

    return `${dayName} ${day}, ${monthName}, ${year}`;
  }

  /** Returns overview of computed date properties */
  getOverview(): DateOverview {
    return {
      dayName: this.getDayName(),
      shortDayName: this.getDayName(true),
      day: this.getDay(),
      monthName: this.getMonthName(),
      shortMonthName: this.getMonthName(true),
      monthCount: this.getMonthCount(),
      isWeekend: this.isWeekend(),
      year: this.getYear(),
      isoDate: this.getDate(true),
      usaDate: this.getDate(),
      time12: this.getTime(),
      time24: this.getTime(true),
      isLeapYear: this.isLeapYear(),
      relativeTime: this.getRelativeTime(),
      isToday: this.isToday(),
      isTomorrow: this.isTomorrow(),
      isYesterday: this.isYesterday(),
      formatFullDate: this.formatFullDate(),
    };
  }
}

/** Factory function */
export function uiDate(
  input: string | Date | number = new Date(),
  locale: string = "default"
): UiDate {
  return new UiDate({ input, locale });
}

export default uiDate;