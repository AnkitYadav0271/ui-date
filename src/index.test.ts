import { it, expect, describe, beforeEach, afterEach, vi } from "vitest";

import uiDate from "./index.js";

//day name

it("should return day name of  fixed date :", () => {
  let date = uiDate("2026-07-23T12:00:00");
  expect(date.getDayName()).toEqual("Thursday");
});

//day

it("should return day count as number of fixed date :", () => {
  let date = uiDate("2026-07-23T12:00:00");
  expect(date.getDay()).toEqual(23);
});

describe("month:", () => {
  it("should return month name of fixed date", () => {
    let date = uiDate("2026-07-23T12:00:00");
    expect(date.getMonthName()).toEqual("July");
  });

  it("should return month Count number", () => {
    let date = uiDate("2026-07-23T12:00:00");
    expect(date.getMonthCount()).toEqual(7);
  });

  it("should return short name of month", () => {
    let date = uiDate("2026-07-23T12:00:00");
    expect(date.getMonthName(true)).toEqual("Jul");
  });
});

//getYear

it("should return year as number of fixed date", () => {
  let date = uiDate("2026-07-23T12:00:00");
  expect(date.getYear()).toEqual(2026);
});

//isLeapYear

it("should return if year is leap ", () => {
  let date = uiDate("2026-07-23T12:00:00");
  expect(date.isLeapYear()).toEqual(false);
});

// is Weekend

it("should return day falls on weekend ", () => {
  let date = uiDate("2026-07-23T12:00:00");
  expect(date.isWeekend()).toEqual(false);
});

describe("getRelativeTime()", () => {
  const MOCK_NOW = new Date("2026-07-23T12:00:00.000Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(MOCK_NOW);
  });

  afterEach(() => {
    vi.useRealTimers(); // Always clean up timers after each test!
  });

  it('should return "just now" for very recent events (< 5 seconds)', () => {
    // 2 seconds ago
    const date = uiDate("2026-07-23T11:59:58.000Z");
    expect(date.getRelativeTime()).toBe("just now");
  });

  it("should format past minutes correctly", () => {
    // 5 minutes ago
    const date = uiDate("2026-07-23T11:55:00.000Z");
    expect(date.getRelativeTime()).toBe("5 minutes ago");
  });

  it("should handle singular vs plural units correctly", () => {
    // 1 hour ago (singular "hour")
    const oneHourAgo = uiDate("2026-07-23T11:00:00.000Z");
    expect(oneHourAgo.getRelativeTime()).toBe("1 hour ago");

    // 2 hours ago (plural "hours")
    const twoHoursAgo = uiDate("2026-07-23T10:00:00.000Z");
    expect(twoHoursAgo.getRelativeTime()).toBe("2 hours ago");
  });

  it("should format past days and months correctly", () => {
    // 2 days ago
    const daysAgo = uiDate("2026-07-21T12:00:00.000Z");
    expect(daysAgo.getRelativeTime()).toBe("2 days ago");

    // 1 year ago
    const yearsAgo = uiDate("2025-07-23T12:00:00.000Z");
    expect(yearsAgo.getRelativeTime()).toBe("1 year ago");
  });

  it("should format future relative dates correctly", () => {
    // In 30 minutes
    const futureMinutes = uiDate("2026-07-23T12:30:00.000Z");
    expect(futureMinutes.getRelativeTime()).toBe("in 30 minutes");

    // In 3 days
    const futureDays = uiDate("2026-07-26T12:00:00.000Z");
    expect(futureDays.getRelativeTime()).toBe("in 3 days");
  });
});

//formateFullDate

it("should return string of full formatted date", () => {
  let date = uiDate("2026-07-23T12:00:00");
  expect(date.formatFullDate()).toEqual("Thursday 23,July,2026");
});
