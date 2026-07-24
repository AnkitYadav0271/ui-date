class UiDate {
    constructor({ input, locale = "default" }) {
        const d = input instanceof Date ? input : new Date(input);
        if (isNaN(d.getTime())) {
            throw new Error(`Invalid input: ${input}`);
        }
        this._locale = this.validateLocale(locale);
        this._date = d;
    }
    validateLocale(requestedLocale) {
        try {
            Intl.DateTimeFormat.supportedLocalesOf(requestedLocale);
            return requestedLocale;
        }
        catch {
            return "default";
        }
    }
    /** Returns full ('Saturday') or short ('Sat') day name */
    getDayName(short = false) {
        return this._date.toLocaleDateString(this._locale, {
            weekday: short ? "short" : "long",
        });
    }
    /** Returns full ('August') or short ('Aug') month name */
    getMonthName(short = false) {
        return this._date.toLocaleDateString(this._locale, {
            month: short ? "short" : "long",
        });
    }
    /** Returns 4-digit year (e.g. 2026) */
    getYear() {
        return this._date.getFullYear();
    }
    /** Returns 1-based month count (1 - 12) */
    getMonthCount() {
        return this._date.getMonth() + 1;
    }
    /** Returns day of the month (1 - 31) */
    getDay() {
        return this._date.getDate();
    }
    /** Returns formatted time string ('6:30 PM' or '18:30') */
    getTime(use24HourFormat = false) {
        return this._date.toLocaleTimeString(this._locale, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: !use24HourFormat,
        });
    }
    /** Returns formatted date string ("07/23/2026" or "2026-07-23") */
    getDate(isoFormat = false) {
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
    isLeapYear() {
        const year = this.getYear();
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
    /** Checks if day falls on Saturday or Sunday */
    isWeekend() {
        const dayOfWeek = this._date.getDay(); // 0 = Sunday, 6 = Saturday
        return dayOfWeek === 0 || dayOfWeek === 6;
    }
    /** Checks if the wrapped date matches today's date */
    isToday() {
        const today = new Date();
        return (this._date.getDate() === today.getDate() &&
            this._date.getMonth() === today.getMonth() &&
            this._date.getFullYear() === today.getFullYear());
    }
    /** Checks if the date is tomorrow */
    isTomorrow() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return (this._date.getDate() === tomorrow.getDate() &&
            this._date.getMonth() === tomorrow.getMonth() &&
            this._date.getFullYear() === tomorrow.getFullYear());
    }
    /** Checks if the date was yesterday */
    isYesterday() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return (this._date.getDate() === yesterday.getDate() &&
            this._date.getMonth() === yesterday.getMonth() &&
            this._date.getFullYear() === yesterday.getFullYear());
    }
    /** Returns human readable relative time */
    getRelativeTime() {
        const now = new Date();
        const diffInSeconds = Math.round((this._date.getTime() - now.getTime()) / 1000);
        if (Math.abs(diffInSeconds) < 5)
            return "just now";
        const rtf = new Intl.RelativeTimeFormat(this._locale, { numeric: "auto" });
        const units = [
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
    /** Returns human readable object (eg: {value:2,unit:"hour",direction:"past" |"present"| "future"}) */
    getRelativeTimeParts() {
        const d = this._date.getTime();
        const now = new Date().getTime();
        const diffInSeconds = Math.round((d - now) / 1000);
        const direction = diffInSeconds === 0 ? "present" : diffInSeconds < 0 ? "past" : "future";
        const units = [
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
                const integerPart = integerIndex !== -1 ? exactParts[integerIndex] : null;
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
                        }
                        else {
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
            formattedUnit: defaultParts.find((p) => p.type === "unit")?.value || "seconds",
            formattedText: defaultParts.map((p) => p.value).join(""),
        };
    }
    /** Returns human readable formatted full date */
    formatFullDate(short = false) {
        const dayName = this.getDayName(short);
        const day = this.getDay();
        const monthName = this.getMonthName(short);
        const year = this.getYear();
        return `${dayName} ${day}, ${monthName}, ${year}`;
    }
    /** Returns overview of computed date properties */
    getOverview() {
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
export function uiDate(input = new Date(), locale = "default") {
    return new UiDate({ input, locale });
}
export default uiDate;
