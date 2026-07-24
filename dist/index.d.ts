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
declare class UiDate {
    private _date;
    private _locale;
    constructor({ input, locale }: UiDateInput);
    private validateLocale;
    /** Returns full ('Saturday') or short ('Sat') day name */
    getDayName(short?: boolean): string;
    /** Returns full ('August') or short ('Aug') month name */
    getMonthName(short?: boolean): string;
    /** Returns 4-digit year (e.g. 2026) */
    getYear(): number;
    /** Returns 1-based month count (1 - 12) */
    getMonthCount(): number;
    /** Returns day of the month (1 - 31) */
    getDay(): number;
    /** Returns formatted time string ('6:30 PM' or '18:30') */
    getTime(use24HourFormat?: boolean): string;
    /** Returns formatted date string ("07/23/2026" or "2026-07-23") */
    getDate(isoFormat?: boolean): string;
    /** Checks if year is leap year */
    isLeapYear(): boolean;
    /** Checks if day falls on Saturday or Sunday */
    isWeekend(): boolean;
    /** Checks if the wrapped date matches today's date */
    isToday(): boolean;
    /** Checks if the date is tomorrow */
    isTomorrow(): boolean;
    /** Checks if the date was yesterday */
    isYesterday(): boolean;
    /** Returns human readable relative time */
    getRelativeTime(): string;
    /** Returns human readable object (eg: {value:2,unit:"hour",direction:"past" |"present"| "future"}) */
    getRelativeTimeParts(): RelativeTimeParts;
    /** Returns human readable formatted full date */
    formatFullDate(short?: boolean): string;
    /** Returns overview of computed date properties */
    getOverview(): DateOverview;
}
/** Factory function */
export declare function uiDate(input?: string | Date | number, locale?: string): UiDate;
export default uiDate;
