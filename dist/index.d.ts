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
    getDayName(short?: boolean): string;
    getMonthName(short?: boolean): string;
    getYear(): number;
    getMonthCount(): number;
    getDay(): number;
    getTime(use24HourFormat?: boolean): string;
    getDate(isoFormat?: boolean): string;
    isLeapYear(): boolean;
    isWeekend(): boolean;
    isToday(): boolean;
    isTomorrow(): boolean;
    isYesterday(): boolean;
    getRelativeTime(input?: number | string | Date): string;
    getRelativeTimeParts(input?: Date | number | string): RelativeTimeParts;
    formatFullDate(short?: boolean): string;
    getOverview(): DateOverview;
}
export declare function uiDate(input?: string | Date | number, locale?: string): UiDate;
declare function getDayName({ input, short, locale, }?: {
    input?: string | number | Date;
    locale?: string;
    short?: boolean;
}): string;
declare function getMonthName({ input, short, locale, }?: {
    input?: string | number | Date;
    locale?: string;
    short?: boolean;
}): string;
declare function getYear(input?: Date | string | number): number;
declare function getMonthCount(input?: string | Date | number): number;
declare function getDay(input?: string | Date | number): number;
declare function getTime({ input, use24HourFormat, locale, }?: {
    input?: string | number | Date;
    locale?: string;
    use24HourFormat?: boolean;
}): string;
declare function getDate({ input, isoFormat, locale, }?: {
    input?: string | number | Date;
    locale?: string;
    isoFormat?: boolean;
}): string;
declare function isLeapYear(input?: string | Date | number): boolean;
declare function isWeekend(input?: string | number | Date): boolean;
declare function isToday(input: string | number | Date): boolean;
declare function isTomorrow(input: string | number | Date): boolean;
declare function isYesterday(input: string | number | Date): boolean;
declare function getRelativeTime({ date1, date2, locale, }: {
    date1: string | number | Date;
    date2?: string | number | Date;
    locale?: string;
}): string;
declare function getRelativeTimeParts({ date1, date2, locale, }: {
    date1: string | number | Date;
    date2?: string | number | Date;
    locale?: string;
}): RelativeTimeParts;
declare function formatFullDate({ input, locale, short, }: {
    input: string | number | Date;
    locale?: string;
    short?: boolean;
}): string;
export default uiDate;
export { getDayName, getMonthName, getYear, getDate, getDay, getMonthCount, getTime, isLeapYear, isToday, isTomorrow, isWeekend, isYesterday, formatFullDate, getRelativeTime, getRelativeTimeParts, };
