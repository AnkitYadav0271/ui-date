class UiDate {
    constructor(input) {
        const d = input instanceof Date ? input : new Date(input);
        if (isNaN(d.getTime())) {
            throw new Error(`Invalid input :${input}`);
        }
        this._date = d;
    }
    /*?  Returns fullDay  ('Saturday') or short ('Sat') day name */
    getDayName(short = false) {
        return this._date.toLocaleDateString("en-US", {
            weekday: short ? "short" : "long",
        });
    }
    // Returns fullMonth ('August') or short ('Aug') month name
    getMonthName(short = false) {
        return this._date.toLocaleDateString("en-US", {
            month: short ? "short" : "long",
        });
    }
    // Returns 4 Digit Year eg-: (2026)
    getYear() {
        return this._date.getFullYear();
    }
    // Returns 1-based  month count (1 January - 12 December );
    getMonthCount() {
        return this._date.getMonth() + 1;
    }
    // Returns day of the Month (1-31) based on month for eg (june - 30 and july- 31)
    getDay() {
        return this._date.getDate();
    }
    //   Returns formatted time string ('6:30 PM' '18:30')
    getTime(use24HourFormate = false) {
        return this._date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: !use24HourFormate,
        });
    }
    // Returns formatted date string ("07/23/2026" or "2026-07-23")
    getDate(isoFormat = false) {
        if (isoFormat) {
            // Returns "2026-07-23"
            return this._date.toISOString().split("T")[0];
        }
        // Returns standard US format "07/23/2026"
        return this._date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        });
    }
    //   Checks if year is leap year
    isLeapYear() {
        const year = this._date.getFullYear();
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
    //  Checks if day falls on saturday or sunday
    isWeekend() {
        const day = this.getDay();
        return day === 1 || day === 7;
    }
    //  Checks if the wrapped date matches today's date
    isToday() {
        const today = new Date();
        return (this._date.getDate() === today.getDate() &&
            this._date.getMonth() === today.getMonth() &&
            this._date.getFullYear() === today.getFullYear());
    }
    // Checks if the date is tomorrow
    isTomorrow() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return (this._date.getDate() === tomorrow.getDate() &&
            this._date.getMonth() === tomorrow.getMonth() &&
            this._date.getFullYear() === tomorrow.getFullYear());
    }
    // Checks if the date was yesterday
    isYesterday() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return (this._date.getDate() === yesterday.getDate() &&
            this._date.getMonth() === yesterday.getMonth() &&
            this._date.getFullYear() === yesterday.getFullYear());
    }
    // Returns human readable relative time (e.g. "5 minutes ago", "in 2 hours", "just now")
    getRelativeTime() {
        const now = new Date();
        // Fix: Use .getTime() to avoid TypeScript math errors
        const diffInSeconds = Math.round((now.getTime() - this._date.getTime()) / 1000);
        const isFuture = diffInSeconds < 0;
        const absSeconds = Math.abs(diffInSeconds);
        if (absSeconds < 5) {
            return "just now";
        }
        const units = [
            { name: "year", seconds: 31536000 },
            { name: "month", seconds: 2592000 },
            { name: "day", seconds: 86400 },
            { name: "hour", seconds: 3600 },
            { name: "minute", seconds: 60 }, // Fixed typos: 'minute' & 'seconds'
            { name: "second", seconds: 1 },
        ];
        for (const unit of units) {
            const count = Math.floor(absSeconds / unit.seconds);
            if (count >= 1) {
                const plural = count > 1 ? "s" : "";
                return isFuture
                    ? `in ${count} ${unit.name}${plural}`
                    : `${count} ${unit.name}${plural} ago`;
            }
        }
        return "just now";
    }
    //   Returns human readable formatted full date eg (Thursday 23 , July ,2026) or short (Wed 23, Jul , 2026)
    formatFullDate(short = false) {
        const dayName = this.getDayName(short);
        const day = this.getDay();
        const monthName = this.getMonthName(short);
        const year = this.getYear();
        const date = `${dayName} ${day},${monthName},${year}`;
        return date;
    }
    //Returns Overview of the time
    getOverView() {
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
export function uiDate(date) {
    return new UiDate(date);
}
export default uiDate;
