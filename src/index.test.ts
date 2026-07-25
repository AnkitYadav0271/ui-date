import { it, expect, describe, beforeEach, afterEach, vi } from "vitest";

import uiDate, {
  getRelativeTime,
  getRelativeTimeParts,
  getDayName,
  getMonthName,
  getYear,
  getMonthCount,
  getDay,
  getTime,
  getDate,
  formatFullDate,
  isToday,
  isTomorrow,
  isYesterday,
  isWeekend,
  isLeapYear,
} from "../src/index";

// --- Day Tests ---
describe("Day & Weekday", () => {
  it("should return day name of fixed date", () => {
    let date = uiDate("2026-07-23T12:00:00");
    expect(date.getDayName()).toBe("Thursday");
    expect(date.getDayName(true)).toBe("Thu");
  });

  it("should return day count as number of fixed date", () => {
    let date = uiDate("2026-07-23T12:00:00");
    expect(date.getDay()).toBe(23);
  });
});

// --- Month Tests ---
describe("Month", () => {
  it("should return month name of fixed date", () => {
    let date = uiDate("2026-07-23T12:00:00");
    expect(date.getMonthName()).toBe("July");
  });

  it("should return month Count number", () => {
    let date = uiDate("2026-07-23T12:00:00");
    expect(date.getMonthCount()).toBe(7);
  });

  it("should return short name of month", () => {
    let date = uiDate("2026-07-23T12:00:00");
    expect(date.getMonthName(true)).toBe("Jul");
  });
});

// --- Year & Status Tests ---
describe("Year & Calendar Checks", () => {
  it("should return year as number of fixed date", () => {
    let date = uiDate("2026-07-23T12:00:00");
    expect(date.getYear()).toBe(2026);
  });

  it("should return if year is leap", () => {
    let date = uiDate("2026-07-23T12:00:00");
    expect(date.isLeapYear()).toBe(false);

    let leapDate = uiDate("2024-02-29T12:00:00");
    expect(leapDate.isLeapYear()).toBe(true);
  });

  it("should return day falls on weekend", () => {
    let date = uiDate("2026-07-23T12:00:00"); // Thursday
    expect(date.isWeekend()).toBe(false);

    let weekendDate = uiDate("2026-07-26T12:00:00"); // Sunday
    expect(weekendDate.isWeekend()).toBe(true);
  });
});

//  Formatting (getTime / getDate)
describe("getTime & getDate", () => {
  it("should format time in 12-hour and 24-hour formats", () => {
    let date = uiDate("2026-07-23T19:11:00");
    expect(date.getTime()).toContain("07:11"); // 12-hour
    expect(date.getTime(true)).toBe("19:11"); // 24-hour
  });

  it("should format date string in USA and ISO formats", () => {
    let date = uiDate("2026-07-23T12:00:00");
    expect(date.getDate()).toBe("07/23/2026");
    expect(date.getDate(true)).toBe("2026-07-23");
  });

  it("should return string of full formatted date", () => {
    let date = uiDate("2026-07-23T12:00:00");
    expect(date.formatFullDate()).toBe("Thursday 23, July, 2026");
  });
});

//  Date Comparisons (isToday, isTomorrow, isYesterday)
describe("isToday / isTomorrow / isYesterday", () => {
  const MOCK_NOW = new Date("2026-07-23T12:00:00.000Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should correctly identify today", () => {
    const today = uiDate("2026-07-23T08:00:00.000Z");
    expect(today.isToday()).toBe(true);
    expect(today.isTomorrow()).toBe(false);
    expect(today.isYesterday()).toBe(false);
  });

  it("should correctly identify tomorrow", () => {
    const tomorrow = uiDate("2026-07-24T12:00:00.000Z");
    expect(tomorrow.isTomorrow()).toBe(true);
    expect(tomorrow.isToday()).toBe(false);
  });

  it("should correctly identify yesterday", () => {
    const yesterday = uiDate("2026-07-22T12:00:00.000Z");
    expect(yesterday.isYesterday()).toBe(true);
    expect(yesterday.isToday()).toBe(false);
  });
});

//  Relative Time Tests
describe("getRelativeTime()", () => {
  const MOCK_NOW = new Date("2026-07-23T12:00:00.000Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return "just now" for very recent events (< 5 seconds)', () => {
    const date = uiDate("2026-07-23T11:59:58.000Z");
    expect(date.getRelativeTime()).toBe("just now");
  });

  it("should format past minutes correctly", () => {
    const date = uiDate("2026-07-23T11:55:00.000Z");
    expect(date.getRelativeTime()).toBe("5 minutes ago");
  });

  it("should handle singular vs plural units correctly", () => {
    const oneHourAgo = uiDate("2026-07-23T11:00:00.000Z");
    expect(oneHourAgo.getRelativeTime()).toBe("1 hour ago");

    const twoHoursAgo = uiDate("2026-07-23T10:00:00.000Z");
    expect(twoHoursAgo.getRelativeTime()).toBe("2 hours ago");
  });

  it("should format past days and months correctly", () => {
    const daysAgo = uiDate("2026-07-21T12:00:00.000Z");
    expect(daysAgo.getRelativeTime()).toBe("2 days ago");

    const yearsAgo = uiDate("2025-07-23T12:00:00.000Z");
    expect(yearsAgo.getRelativeTime()).toBe("last year");
  });

  it("should format future relative dates correctly", () => {
    const futureMinutes = uiDate("2026-07-23T12:30:00.000Z");
    expect(futureMinutes.getRelativeTime()).toBe("in 30 minutes");

    const futureDays = uiDate("2026-07-26T12:00:00.000Z");
    expect(futureDays.getRelativeTime()).toBe("in 3 days");
  });
});

//Relative Time Parts Test

describe("getRelativeTimeParts() - Multi-Locale Coverage", () => {
  const MOCK_NOW = new Date("2026-07-24T10:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("1. English (`en-US`) - Suffix Past / Prefix Future", () => {
    it("formats past and future with standard English structures", () => {
      const past = new Date("2026-07-24T08:00:00Z"); // 2 hours ago
      const future = new Date("2026-07-24T12:00:00Z"); // in 2 hours

      expect(uiDate(past, "en-US").getRelativeTimeParts()).toMatchObject({
        value: 2,
        unit: "hour",
        direction: "past",
        formattedValue: "2",
        formattedUnit: "hours",
        formattedText: "2 hours ago",
      });

      expect(uiDate(future, "en-US").getRelativeTimeParts()).toMatchObject({
        value: 2,
        unit: "hour",
        direction: "future",
        formattedText: "in 2 hours",
      });
    });
  });

  describe('2. Spanish (`es-ES`) - Prefix Preposition ("hace")', () => {
    it('formats past using leading preposition "hace"', () => {
      const past = new Date("2026-07-24T08:00:00Z"); // 2 hours ago

      expect(uiDate(past, "es-ES").getRelativeTimeParts()).toMatchObject({
        value: 2,
        unit: "hour",
        direction: "past",
        formattedValue: "2",
        formattedUnit: "horas",
        formattedText: "hace 2 horas",
      });
    });

    it('formats exact present as "ahora"', () => {
      expect(uiDate(MOCK_NOW, "es-ES").getRelativeTimeParts()).toMatchObject({
        direction: "present",
        formattedText: "ahora",
      });
    });
  });

  describe('3. German (`de-DE`) - Dative Suffixing ("vor" & "-n")', () => {
    it('formats past using preposition "vor" and dative unit forms', () => {
      const past = new Date("2026-07-24T08:00:00Z"); // 2 hours ago

      expect(uiDate(past, "de-DE").getRelativeTimeParts()).toMatchObject({
        value: 2,
        unit: "hour",
        direction: "past",
        formattedValue: "2",
        formattedUnit: "Stunden",
        formattedText: "vor 2 Stunden",
      });
    });

    it('formats exact present as "jetzt"', () => {
      expect(uiDate(MOCK_NOW, "de-DE").getRelativeTimeParts()).toMatchObject({
        direction: "present",
        formattedText: "jetzt",
      });
    });
  });

  describe('4. Japanese (`ja-JP`) - Postposition Suffixing ("前" / "後")', () => {
    it("formats relative time using kanji suffixes without spaces", () => {
      const past = new Date("2026-07-24T08:00:00Z"); // 2 hours ago
      const future = new Date("2026-07-24T12:00:00Z"); // in 2 hours

      expect(uiDate(past, "ja-JP").getRelativeTimeParts()).toMatchObject({
        value: 2,
        unit: "hour",
        direction: "past",
        formattedValue: "2",
        formattedUnit: "時間",
        formattedText: "2 時間前",
      });

      expect(uiDate(future, "ja-JP").getRelativeTimeParts()).toMatchObject({
        value: 2,
        unit: "hour",
        direction: "future",
        formattedText: "2 時間後",
      });
    });

    it('formats exact present as "今"', () => {
      expect(uiDate(MOCK_NOW, "ja-JP").getRelativeTimeParts()).toMatchObject({
        direction: "present",
        formattedText: "今",
      });
    });
  });

  describe('5. French (`fr-FR`) - Prefix Preposition ("il y a")', () => {
    it('formats past using multi-word preposition "il y a"', () => {
      const past = new Date("2026-07-24T08:00:00Z"); // 2 hours ago

      expect(uiDate(past, "fr-FR").getRelativeTimeParts()).toMatchObject({
        value: 2,
        unit: "hour",
        direction: "past",
        formattedValue: "2",
        formattedUnit: "heures", // Clean unit word!
        formattedText: "il y a 2 heures",
      });
    });
  });

  describe("6. Arabic (`ar-EG`) - Right-to-Left (RTL) & Dual Forms", () => {
    it("handles localized Arabic numeral formatting and RTL text", () => {
      const past = new Date("2026-07-24T07:00:00Z"); // 3 hours ago

      const parts = uiDate(past, "ar-EG").getRelativeTimeParts();

      expect(parts.direction).toBe("past");
      expect(parts.unit).toBe("hour");
      expect(parts.formattedText).toBeTruthy(); // Verifies non-empty localized RTL string
    });
  });
});

//  Localization Tests
describe("Locale Support", () => {
  it("should format weekday and month in Spanish when locale is es-ES", () => {
    const date = uiDate("2026-07-23T12:00:00", "es-ES");
    expect(date.getDayName().toLowerCase()).toBe("jueves");
    expect(date.getMonthName().toLowerCase()).toBe("julio");
  });

  it("should fall back gracefully when an invalid locale tag is passed", () => {
    expect(() => {
      const date = uiDate("2026-07-23T12:00:00", "invalid-locale");
      expect(date.getMonthName()).toBeDefined();
    }).not.toThrow();
  });
});

//  Invalid Date Input Handling ---
describe("Error Handling", () => {
  it("should throw an error for invalid date inputs", () => {
    expect(() => uiDate("not-a-valid-date")).toThrow("Invalid input");
  });
});

describe("ui-date Standalone Functional API - Edge Cases & Comprehensive Tests", () => {
  // Fixed system reference time: Aug 15, 2026 12:00:00 UTC (Saturday)
  const MOCK_NOW = new Date("2026-08-15T12:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ==========================================
  // 1. RELATIVE TIME & RELATIVE TIME PARTS
  // ==========================================
  describe("getRelativeTime() - Standalone", () => {
    it("should calculate relative time against current time when targetDate is omitted", () => {
      const past = new Date("2026-08-15T10:00:00Z"); // 2 hours ago
      expect(getRelativeTime({ date1: past })).toMatch(/2 hours ago/i);
    });

    it("should calculate Date-to-Date relative distance", () => {
      expect(
        getRelativeTime({ date1: "2026-08-01", date2: "2026-08-15" }),
      ).toMatch(/14 days ago/i);
      expect(
        getRelativeTime({ date1: "2026-08-15", date2: "2026-08-01" }),
      ).toMatch(/in 14 days/i);
    });

    it("should gracefully handle identical dates (present / 0 difference)", () => {
      expect(
        getRelativeTime({ date1: "2026-08-15", date2: "2026-08-15" }),
      ).toMatch(/now|0 seconds/i);
    });

    it("should fallback to 'now' when input date is undefined", () => {
      expect(getRelativeTime({ date1: "2026-08-10" })).toMatch(/5 days ago/i);
    });

    it("should correctly handle internationalized locale strings", () => {
      expect(
        getRelativeTime({
          date1: "2026-08-01",
          date2: "2026-08-15",
          locale: "es-ES",
        }),
      ).toMatch(/hace 14 días/i);
      expect(
        getRelativeTime({
          date1: "2026-08-01",
          date2: "2026-08-15",
          locale: "de-DE",
        }),
      ).toMatch(/vor 14 Tagen/i);
    });

    it("should fallback gracefully if an invalid locale string is provided", () => {
      expect(() =>
        getRelativeTime({
          date1: "2026-08-01",
          date2: "2026-08-15",
          locale: "invalid-locale-123",
        }),
      ).not.toThrow();
      expect(
        getRelativeTime({
          date1: "2026-08-01",
          date2: "2026-08-15",
          locale: "invalid-locale-123",
        }),
      ).toMatch(/14 days ago/i);
    });
  });

  describe("getRelativeTimeParts() - Standalone", () => {
    it("should return structured breakdown for past, present, and future dates", () => {
      const pastParts = getRelativeTimeParts({
        date1: "2026-08-10",
        date2: "2026-08-15",
      });
      expect(pastParts).toEqual({
        value: 5,
        unit: "day",
        direction: "past",
        formattedValue: "5",
        formattedUnit: expect.stringMatching(/days/i),
        formattedText: expect.stringMatching(/5 days ago/i),
      });

      const futureParts = getRelativeTimeParts({
        date1: "2026-08-20",
        date2: "2026-08-15",
      });
      expect(futureParts.direction).toBe("future");
      expect(futureParts.value).toBe(5);
    });

    it("should handle boundary transitions correctly (e.g., millisecond thresholds)", () => {
      const edgePast = new Date(MOCK_NOW.getTime() - 999); // 999ms ago
      const parts = getRelativeTimeParts({ date1: new Date() });
      expect(parts.unit).toBe("second");
    });
  });

  // ==========================================
  // 2. GETTERS WITH OPTIONS OBJECT PATTERN
  // ==========================================
  describe("getDayName() - Standalone", () => {
    it("should return day name with options object", () => {
      expect(getDayName({ input: "2026-08-15" })).toBe("Saturday");
      expect(getDayName({ input: "2026-08-15", short: true })).toBe("Sat");
    });

    it("should default to current date when options object is empty or omitted", () => {
      expect(getDayName()).toBe("Saturday");
      expect(getDayName({})).toBe("Saturday");
      expect(getDayName({ short: true })).toBe("Sat");
    });

    it("should format custom locales correctly", () => {
      expect(getDayName({ input: "2026-08-15", locale: "hi-IN" })).toMatch(
        /शनिवार/,
      );
      expect(
        getDayName({ input: "2026-08-15", locale: "fr-FR", short: true }),
      ).toBe("sam.");
    });
  });

  describe("getMonthName() - Standalone", () => {
    it("should format long and short month names", () => {
      expect(getMonthName({ input: "2026-08-15" })).toBe("August");
      expect(getMonthName({ input: "2026-08-15", short: true })).toBe("Aug");
    });

    it("should default to current month when called without parameters", () => {
      expect(getMonthName()).toBe("August");
      expect(getMonthName({ short: true })).toBe("Aug");
    });
  });

  describe("getTime() & getDate() - Standalone", () => {
    it("should toggle standard vs. ISO date formatting", () => {
      expect(getDate({ input: "2026-08-15", isoFormat: true })).toBe(
        "2026-08-15",
      );
      expect(getDate({ input: "2026-08-15", isoFormat: false })).toBe(
        "08/15/2026",
      );
    });

    it("should fallback to system 'now' when input is omitted in options", () => {
      expect(getDate({ isoFormat: true })).toBe("2026-08-15");
    });
  });

  describe("formatFullDate() - Standalone", () => {
    it("should format full localized readable date strings", () => {
      expect(formatFullDate({ input: "2026-08-15" })).toBe(
        "Saturday 15, August, 2026",
      );
      expect(formatFullDate({ input: "2026-08-15", short: true })).toBe(
        "Sat 15, Aug, 2026",
      );
    });

    it("should handle custom locales in full date formatting", () => {
      expect(formatFullDate({ input: "2026-08-15", locale: "es-ES" })).toMatch(
        /sábado/i,
      );
    });
  });

  // ==========================================
  // 3. NUMERIC GETTERS (DEFAULT ARGUMENT SUPPORT)
  // ==========================================
  describe("getYear(), getMonthCount(), getDay() - Standalone", () => {
    it("should extract year, 1-indexed month, and day of month", () => {
      expect(getYear("2026-08-15")).toBe(2026);
      expect(getMonthCount("2026-08-15")).toBe(8); // August = 8
      expect(getDay("2026-08-15")).toBe(15);
    });

    it("should handle numeric millisecond timestamps", () => {
      const timestamp = new Date("2026-08-15T00:00:00Z").getTime();
      expect(getYear(timestamp)).toBe(2026);
      expect(getMonthCount(timestamp)).toBe(8);
      expect(getDay(timestamp)).toBe(15);
    });

    it("should default to current time when argument is omitted", () => {
      expect(getYear()).toBe(2026);
      expect(getMonthCount()).toBe(8);
      expect(getDay()).toBe(15);
    });

    it("should handle leap year dates accurately (e.g. Feb 29)", () => {
      expect(getMonthCount("2024-02-29")).toBe(2);
      expect(getDay("2024-02-29")).toBe(29);
    });
  });

  // ==========================================
  // 4. BOOLEAN STATUS HELPERS
  // ==========================================
  describe("Status Checks - Standalone", () => {
    it("should identify isToday(), isTomorrow(), and isYesterday()", () => {
      expect(isToday("2026-08-15")).toBe(true);
      expect(isToday("2026-08-16")).toBe(false);

      expect(isTomorrow("2026-08-16")).toBe(true);
      expect(isTomorrow("2026-08-15")).toBe(false);

      expect(isYesterday("2026-08-14")).toBe(true);
      expect(isYesterday("2026-08-15")).toBe(false);
    });

    it("should handle midnight boundaries for isToday()", () => {
      expect(isToday("2026-08-15T00:00:00.000Z")).toBe(true);
      expect(isToday(new Date())).toBe(true);
    });

    it("should identify weekends correctly", () => {
      expect(isWeekend("2026-08-15")).toBe(true); // Saturday
      expect(isWeekend("2026-08-16")).toBe(true); // Sunday
      expect(isWeekend("2026-08-17")).toBe(false); // Monday
    });

    it("should identify leap years correctly", () => {
      expect(isLeapYear("2024-01-01")).toBe(true); // Leap year
      expect(isLeapYear("2026-01-01")).toBe(false); // Standard year
      expect(isLeapYear("2000-01-01")).toBe(true); // Century leap year
      expect(isLeapYear("1900-01-01")).toBe(false); // Century non-leap year
    });

    it("should default status helpers to 'now' when no argument is passed", () => {
      expect(isToday(new Date())).toBe(true);
      expect(isTomorrow(new Date())).toBe(false);
      expect(isYesterday(new Date())).toBe(false);
      expect(isWeekend()).toBe(true); // Aug 15, 2026 is Saturday
      expect(isLeapYear()).toBe(false); // 2026 is not a leap year
    });
  });

  // ==========================================
  // 6. EDGE CASES & INVALID INPUT HANDLING
  // ==========================================
  describe("Edge Cases & Resilience", () => {
    it("should handle invalid date string inputs gracefully", () => {
      // 1. Check that validateDate throws the exact expected Error message
      expect(() => getYear("invalid-date-string")).toThrow(
        "Invalid input:invalid-date-string",
      );

      // 2. Check functions wrapped with try/catch or fallback logic
      expect(() =>
        getRelativeTime({
          date1: "soemthing",
          date2: "string",
          locale: "local",
        }),
      ).not.toThrow("Invalid input:something");

      // 3. If you want isToday to throw on invalid input:
      expect(() => isToday("not-a-date")).toThrow("Invalid input:not-a-date");
    });

    it("should handle extreme historical and far-future years", () => {
      expect(getYear("1000-01-01")).toBe(1000);
      expect(getYear("3000-01-01")).toBe(3000);
      expect(isLeapYear("2000-01-01")).toBe(true);
    });
  });
});
