import { it, expect, describe, beforeEach, afterEach, vi } from "vitest";
import uiDate from "./index.js";

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
