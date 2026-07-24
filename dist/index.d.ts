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
    getRelativeTime(): string;
    getRelativeTimeParts(): RelativeTimeParts;
    formatFullDate(short?: boolean): string;
    getOverview(): DateOverview;
}
export declare function uiDate(input?: string | Date | number, locale?: string): UiDate;
export default uiDate;
