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
  relativeTimeParts: RelativeTimeParts;
  isToday: boolean;
  isTomorrow: boolean;
  isYesterday: boolean;
  formatFullDate: string;
}

export interface RelativeTimeParts {
  value: number;
  unit: Intl.RelativeTimeFormatUnit;
  direction: "past" | "future" | "present";
  formattedValue: string;
  formattedUnit: string;
  formattedText: string;
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
  getRelativeTime(input?: number | string | Date): string {
    let now;
    let secondDate;
    if (input) {
      secondDate = input instanceof Date ? input : new Date(input);
      if (isNaN(secondDate.getDate())) {
        throw new Error(`Invalid input:${input}`);
      }
    }

    now = secondDate || new Date();
    const diffInSeconds = Math.round(
      (this._date.getTime() - now.getTime()) / 1000,
    );

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

    return rtf.format(0, "second");
  }

  /** Returns human readable object (eg: {value:2,unit:"hour",direction:"past" |"present"| "future"}) */

  getRelativeTimeParts(input?: Date | number | string): RelativeTimeParts {
    let now;
    let secondDate;
    if (input) {
      secondDate = input instanceof Date ? input : new Date(input);
      if (isNaN(secondDate.getDate())) {
        throw `invalid input:${input}`;
      }
    }

    const d = this._date.getTime();
    now = secondDate?.getTime() || new Date().getTime();

    const diffInSeconds = Math.round((d - now) / 1000);

    const direction: "past" | "future" | "present" =
      diffInSeconds === 0 ? "present" : diffInSeconds < 0 ? "past" : "future";

    const units: { name: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
      { name: "year", seconds: 31536000 },
      { name: "month", seconds: 2592000 },
      { name: "day", seconds: 86400 },
      { name: "hour", seconds: 3600 },
      { name: "minute", seconds: 60 },
      { name: "second", seconds: 1 },
    ];

    const rtfAlways = new Intl.RelativeTimeFormat(this._locale, {
      numeric: "always",
    });
    const rtfAuto = new Intl.RelativeTimeFormat(this._locale, {
      numeric: "auto",
    });

    for (const unit of units) {
      if (Math.abs(diffInSeconds) >= unit.seconds || unit.name === "second") {
        const rawValue = Math.round(diffInSeconds / unit.seconds);
        const absValue = Math.abs(rawValue);

        const exactParts = rtfAlways.formatToParts(rawValue, unit.name);

        const integerIndex = exactParts.findIndex((p) => p.type === "integer");
        const integerPart =
          integerIndex !== -1 ? exactParts[integerIndex] : null;
        const formattedValue = integerPart ? integerPart.value : `${absValue}`;

        const unitPart = exactParts.find((p) => p.type === "unit");
        let formattedUnit = unitPart?.value;

        if (!formattedUnit && integerIndex !== -1) {
          // To strip directional suffixes (like Japanese "前"/"後" or German "vor"),
          // compare tokens with the opposite sign value to find the constant unit substring.
          //For more visit : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

          const oppositeParts = rtfAlways.formatToParts(-rawValue, unit.name);

          const currentTrailing = exactParts
            .slice(integerIndex + 1)
            .filter((p) => p.type === "literal")
            .map((p) => p.value)
            .join("")
            .trim();

          const oppositeTrailing = oppositeParts
            .slice(integerIndex + 1)
            .filter((p) => p.type === "literal")
            .map((p) => p.value)
            .join("")
            .trim();

          let commonUnit = "";
          for (let i = 0; i < currentTrailing.length; i++) {
            if (currentTrailing[i] === oppositeTrailing[i]) {
              commonUnit += currentTrailing[i];
            } else {
              break;
            }
          }

          formattedUnit = commonUnit.trim() || currentTrailing || unit.name;
        }

        formattedUnit = formattedUnit || unit.name;

        // Full localized sentence
        const autoParts = rtfAuto.formatToParts(rawValue, unit.name);
        const formattedText = autoParts.map((p) => p.value).join("");

        return {
          value: absValue,
          unit: unit.name,
          direction,
          formattedValue,
          formattedUnit,
          formattedText,
        };
      }
    }

    // Exact present fallback
    const defaultParts = rtfAuto.formatToParts(0, "second");
    return {
      value: 0,
      unit: "second",
      direction: "present",
      formattedValue: "0",
      formattedUnit:
        defaultParts.find((p) => p.type === "unit")?.value || "seconds",
      formattedText: defaultParts.map((p) => p.value).join(""),
    };
  }

  /** Returns human readable formatted full date */
  formatFullDate(short: boolean = false): string {
    const dayName = this.getDayName(short);
    const day = this.getDay();
    const monthName = this.getMonthName(short);
    const year = this.getYear();

    return `${dayName} ${day}, ${monthName}, ${year}`;
  }

  /** Returns time difference between two dates (eg {value:5,unit:'second'} */
  //for my project hamara-kunda (this method is helping me to find time duration of an event )

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
      relativeTimeParts: this.getRelativeTimeParts(),
    };
  }
}

/** Factory function */
export function uiDate(
  input: string | Date | number = new Date(),
  locale: string = "default",
): UiDate {
  return new UiDate({ input, locale });
}

//_________________________________________________________________________________________//
//_________________________________________________________________________________________//

/** functional api starts here */
//_________________________________________________________________________________________//
//_________________________________________________________________________________________//

/** validates if user requestedLocale is valid returns 'default' if not  */
function validateLocale(requestedLocale: string): string {
  try {
    Intl.DateTimeFormat.supportedLocalesOf(requestedLocale);
    return requestedLocale;
  } catch {
    return "default";
  }
}

/** validate if users input date is valid throws error if not or returns date object if valid */
function validateDate(input: string | number | Date) {
  let d = input instanceof Date ? input : new Date(input);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid input:${input}`);
  }
  return d;
}

/** Returns full ('Saturday') or short ('Sat') day name default today if no args provided*/

function getDayName({
  input = new Date(),
  short = false,
  locale = "default",
}: {
  input?: string | number | Date;
  locale?: string;
  short?: boolean;
} = {}): string {
  const d = validateDate(input);
  const valLocal = validateLocale(locale);
  return d.toLocaleDateString(valLocal, {
    weekday: short ? "short" : "long",
  });
}

/** Returns full ('August') or short ('Aug') month name default current month without args */
function getMonthName({
  input = new Date(),
  short = false,
  locale = "default",
}: {
  input?: string | number | Date;
  locale?: string;
  short?: boolean;
} = {}): string {
  const d = validateDate(input);
  const valLocal = validateLocale(locale);
  return d.toLocaleDateString(valLocal, {
    month: short ? "short" : "long",
  });
}

/** Returns 4-digit year (e.g. 2026) defaults current year if not args provided */
function getYear(input: Date | string | number = new Date()): number {
  const d = validateDate(input);
  return d.getFullYear();
}

/** Returns 1-based month count (1 - 12) default current month if no args provided */
function getMonthCount(input: string | Date | number = new Date()): number {
  const d = validateDate(input);
  return d.getMonth() + 1;
}

/** Returns day of the month (1 - 31) default current time if no args provided*/
function getDay(input: string | Date | number = new Date()): number {
  const d = validateDate(input);
  return d.getDate();
}

/** Returns formatted time string ('6:30 PM' or '18:30') default is current time if no args provided */

function getTime({
  input = new Date(),
  use24HourFormat = false,
  locale = "default",
}: {
  input?: string | number | Date;
  locale?: string;
  use24HourFormat?: boolean;
} = {}): string {
  const d = validateDate(input);
  const valLocal = validateLocale(locale);
  return d.toLocaleTimeString(valLocal, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !use24HourFormat,
  });
}

/** Returns formatted date string ("07/23/2026" or "2026-07-23") default today's date if no args provided */
function getDate({
  input = new Date(),
  isoFormat = false,
  locale = "default",
}: {
  input?: string | number | Date;
  locale?: string;
  isoFormat?: boolean;
} = {}): string {
  const d = validateDate(input);
  const valLocal = validateLocale(locale);
  if (isoFormat) {
    return d.toISOString().split("T")[0];
  }
  return d.toLocaleDateString(valLocal, {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

/** Checks if year is leap year for default checks for current year if no args provided */
function isLeapYear(input: string | Date | number = new Date()): boolean {
  const d = validateDate(input);
  const year = getYear(d);
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** Checks if day falls on Saturday or Sunday default checks current day if no args provided */
function isWeekend(input: string | number | Date = new Date()): boolean {
  const d = validateDate(input);
  const dayOfWeek = d.getDay(); // 0 = Sunday, 6 = Saturday
  return dayOfWeek === 0 || dayOfWeek === 6;
}

/** Checks if the user's date matches today date */
function isToday(input: string | number | Date): boolean {
  const today = new Date();
  const d = validateDate(input);
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

/** Checks if the date is tomorrow */
function isTomorrow(input: string | number | Date): boolean {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const d = validateDate(input);
  return (
    d.getDate() === tomorrow.getDate() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getFullYear() === tomorrow.getFullYear()
  );
}

/** Checks if the date was yesterday */
function isYesterday(input: string | number | Date): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const d = validateDate(input);
  return (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  );
}

/** Returns human readable relative time */
function getRelativeTime({
  date1,
  date2 = new Date(),
  locale = "default",
}: {
  date1: string | number | Date;
  date2?: string | number | Date;
  locale?: string;
}): string {
  const d1 = validateDate(date1);
  const d2 = validateDate(date2);
  const valLocal = validateLocale(locale);

  const diffInSeconds = Math.round((d1.getTime() - d2.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(valLocal, { numeric: "auto" });

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

  return rtf.format(0, "second");
}

/** Returns human readable object (eg: {value:2,unit:"hour",direction:"past" |"present"| "future"}) */
/**
 *
 * @param {date1,date2(optional),local(optional default = "default")}
 * @returns
 */

function getRelativeTimeParts({
  date1,
  date2 = new Date(),
  locale = "default",
}: {
  date1: string | number | Date;
  date2?: string | number | Date;
  locale?: string;
}): RelativeTimeParts {
  const d1 = validateDate(date1);
  const d2 = validateDate(date2);
  const valLocal = validateLocale(locale);

  const diffInSeconds = Math.round((d1.getTime() - d2.getTime()) / 1000);

  const direction: "past" | "future" | "present" =
    diffInSeconds === 0 ? "present" : diffInSeconds < 0 ? "past" : "future";

  const units: { name: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 3600 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  const rtfAlways = new Intl.RelativeTimeFormat(valLocal, {
    numeric: "always",
  });
  const rtfAuto = new Intl.RelativeTimeFormat(valLocal, {
    numeric: "auto",
  });

  for (const unit of units) {
    if (Math.abs(diffInSeconds) >= unit.seconds || unit.name === "second") {
      const rawValue = Math.round(diffInSeconds / unit.seconds);
      const absValue = Math.abs(rawValue);

      const exactParts = rtfAlways.formatToParts(rawValue, unit.name);

      const integerIndex = exactParts.findIndex((p) => p.type === "integer");
      const integerPart = integerIndex !== -1 ? exactParts[integerIndex] : null;
      const formattedValue = integerPart ? integerPart.value : `${absValue}`;

      const unitPart = exactParts.find((p) => p.type === "unit");
      let formattedUnit = unitPart?.value;

      if (!formattedUnit && integerIndex !== -1) {
        // To strip directional suffixes (like Japanese "前"/"後" or German "vor"),
        // compare tokens with the opposite sign value to find the constant unit substring.
        //For more visit : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
        //since i do not know much about other languages

        const oppositeParts = rtfAlways.formatToParts(-rawValue, unit.name);

        const currentTrailing = exactParts
          .slice(integerIndex + 1)
          .filter((p) => p.type === "literal")
          .map((p) => p.value)
          .join("")
          .trim();

        const oppositeTrailing = oppositeParts
          .slice(integerIndex + 1)
          .filter((p) => p.type === "literal")
          .map((p) => p.value)
          .join("")
          .trim();

        let commonUnit = "";
        for (let i = 0; i < currentTrailing.length; i++) {
          if (currentTrailing[i] === oppositeTrailing[i]) {
            commonUnit += currentTrailing[i];
          } else {
            break;
          }
        }

        formattedUnit = commonUnit.trim() || currentTrailing || unit.name;
      }

      formattedUnit = formattedUnit || unit.name;

      // Full localized sentence
      const autoParts = rtfAuto.formatToParts(rawValue, unit.name);
      const formattedText = autoParts.map((p) => p.value).join("");

      return {
        value: absValue,
        unit: unit.name,
        direction,
        formattedValue,
        formattedUnit,
        formattedText,
      };
    }
  }

  // Exact present fallback
  const defaultParts = rtfAuto.formatToParts(0, "second");
  return {
    value: 0,
    unit: "second",
    direction: "present",
    formattedValue: "0",
    formattedUnit:
      defaultParts.find((p) => p.type === "unit")?.value || "seconds",
    formattedText: defaultParts.map((p) => p.value).join(""),
  };
}

/** Returns human readable formatted full date default is today date if no args provided */

function formatFullDate({
  input,
  locale = "default",
  short = false,
}: {
  input: string | number | Date;
  locale?: string;
  short?: boolean;
}): string {
  const d = validateDate(input);
  const valLocal = validateLocale(locale);
  const dayName = getDayName({ input: d, locale: valLocal, short });
  const day = getDay(d);
  const monthName = getMonthName({ input: d, locale: valLocal, short });
  const year = getYear(d);

  return `${dayName} ${day}, ${monthName}, ${year}`;
}

export default uiDate;

/** exports */
export {
  getDayName,
  getMonthName,
  getYear,
  getDate,
  getDay,
  getMonthCount,
  getTime,
  isLeapYear,
  isToday,
  isTomorrow,
  isWeekend,
  isYesterday,
  formatFullDate,
  getRelativeTime,
  getRelativeTimeParts,
};
