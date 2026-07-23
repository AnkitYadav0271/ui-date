export type UiDateInput = string | Date | number;
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
declare class UiDate {
    private _date;
    constructor(input: UiDateInput);
    getDayName(short?: boolean): string;
    getMonthName(short?: boolean): string;
    getYear(): number;
    getMonthCount(): number;
    getDay(): number;
    getTime(use24HourFormate?: boolean): string;
    getDate(isoFormat?: boolean): string;
    isLeapYear(): boolean;
    isWeekend(): boolean;
    isToday(): boolean;
    isTomorrow(): boolean;
    isYesterday(): boolean;
    getRelativeTime(): string;
    formatFullDate(short?: boolean): string;
    getOverView(): DateOverview;
}
export declare function uiDate(date: UiDateInput): UiDate;
export default uiDate;
