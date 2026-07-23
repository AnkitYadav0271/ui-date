# 📅 ui-date

> A lightweight, chainable, zero-dependency date formatting and manipulation library built for modern web applications and react native applications.

`ui-date` provides a clean, object-oriented wrapper around JavaScript's native `Intl` and `Date` APIs. It gives you intuitive date parsing, formatting, relative time calculation, and status checks with strong TypeScript definitions out of the box.

---

## ⚡ Performance & Size

- 📦 **Unminified:** 1.64 kB
- 🗜️ **Minified + Gzipped:** < 1 kB
- 🚫 **Dependencies:** 0 (Tree-shakeable ES Module)

## ✨ Features

- **Zero Dependencies:** Extremely small bundle footprint built entirely on native JavaScript capabilities.
- **Light & Fast:**Minimal memory overhead with instant method evaluations.
- **Fully Typed:** Written in TypeScript with complete type definitions and inline doc comments.
- **Chainable API:** Clean, readable methods for extracting human-formatted date/time properties.
- **Relative Time Built-In:** Human-readable output like `"5 minutes ago"` or `"in 2 days"`.
- **Full Date Formate Built-In:** Human-readable output like `"Thursday 23,July,2026"`.

---

## 📦 Installation

### using npm

```bash
npm install ui-date
```

### using yarn

```bash
yarn add ui-date
```

### using pnpm

```bash
pnpm add ui-date
```

### using yarn

```bash
bun add ui-date
```

## 🚀 Quick Start

```javascript
import uiDate from "ui-date";

// Initialize with a Date object, ISO string, timestamp, or no arguments (defaults to now)
const date = uiDate("2026-07-23T19:11:00");

// Extract Formatted Date Parts
console.log(date.getDayName()); // "Thursday"
console.log(date.getDayName(true)); // "Thu"
console.log(date.getMonthName()); // "July"

// Date & Time Formatting
console.log(date.getTime()); // "07:11 PM"
console.log(date.getTime(true)); // "19:11"
console.log(date.getDate()); // "07/23/2026"
console.log(date.getDate(true)); // "2026-07-23"

// Relative Time
console.log(date.getRelativeTime()); // e.g. "just now" / "2 hours ago"

//formatFullDate

console.log(date.formatFullDate()); // e.g. "Thursday 23,July,2026"

// Boolean Status Checks
console.log(date.isToday()); // false
console.log(date.isWeekend()); // false
console.log(date.isLeapYear()); // true
```

## 📖 API Reference

### 🚀 Core Methods

| Method                 | params                  | Returns  | Example / Output                               | Description                                              |
| :--------------------- | :---------------------- | :------- | :--------------------------------------------- | :------------------------------------------------------- |
| **`getDayName`**       | `(short?: boolean)`     | `string` | `getDayName(true)` ➔ `"Thu"`                   | Full or short weekday name (`"Thursday"` vs `"Thu"`).    |
| **`getMonthName`**     | `(short?: boolean)`     | `string` | `getMonthName()` ➔ `"July"`                    | Full or short month name (`"July"` vs `"Jul"`).          |
| **`getTime`**          | `(use24Hour?: boolean)` | `string` | `getTime(true)` ➔ `"19:11"`                    | Formatted time string (`"07:11 PM"` or `"19:11"`).       |
| **`getDate`**          | `(isoFormat?: boolean)` | `string` | `getDate(true)` ➔ `"2026-07-23"`               | Calendar date string (`"07/23/2026"` or `"2026-07-23"`). |
| **`getRelativeTime`**  | —                       | `string` | `getRelativeTime()` ➔ `"5 minutes ago"`        | Human-readable time relative to right now.               |
| **`formatFullDate()`** | \_                      | `string` | `formatFullDate()` ➔ `"Thursday 23,July,2026"` | Human-readable time formate                              |

---

### 🔢 Numeric Getters

| Method              | params | Returns  | Example / Output        | Description                 |
| :------------------ | :----- | :------- | :---------------------- | :-------------------------- |
| **`getDay`**        | —      | `number` | `getDay()` ➔ `23`       | Day of the month (1–31).    |
| **`getMonthCount`** | —      | `number` | `getMonthCount()` ➔ `7` | 1-based month index (1–12). |
| **`getYear`**       | —      | `number` | `getYear()` ➔ `2026`    | Four-digit year (`YYYY`).   |

---

### ⚡ Status Checks & Overview

| Method            | params | Returns   | Output                | Description                                           |
| :---------------- | :----- | :-------- | :-------------------- | :---------------------------------------------------- |
| **`isToday`**     | —      | `boolean` | `true` / `false`      | Checks if date matches today's calendar day.          |
| **`isWeekend`**   | —      | `boolean` | `true` / `false`      | Returns `true` if Saturday or Sunday.                 |
| **`isLeapYear`**  | —      | `boolean` | `true` / `false`      | Returns `true` if year is a leap year.                |
| **`getOverview`** | —      | `Object`  | `{ date, time, ... }` | Returns a key-value object of all computed fields.    |
| **`isTomorrow`**  | \_     | `Boolean` | `true`/ `false`       | Returns `true` if next day from init date is tomorrow |

# Comprehensive getOverview() Example

`When building user interfaces, you often need multiple fields at once. getOverview() returns a summary object:`

```javascript
const date = uiDate("2026-07-23T19:11:00");

console.log(date.getOverview());
/*
Output:
{
  dayName: 'Thursday',
  shortDayName: 'Thu',
  day: 23,
  monthName: 'July',
  shortMonthName: 'Jul',
  monthCount: 7,
  isWeekend: false,
  year: 2026,
  isoDate: '2026-07-23',
  usDate: '07/23/2026',
  time12: '07:16 PM',
  time24: '19:16',
  isLeapYear: false,
  relativeTime: 'just now',
  isToday: true,
  isTomorrow: false,
  isYesterday: false,
  formatFullDate: 'Thursday 23,July,2026'
}
*/
```

## 🤝 Contributing

Contributions are always welcome! Whether you're fixing a bug, adding a new utility method, or improving documentation, here is how to get started:

### 🛠️ Local Development Setup

1. **Fork & Clone the repository:**
   ```bash
   git clone [https://github.com/AnkitYadav0271/ui-date.git](https://github.com/AnkitYadav0271/ui-date.git)
   cd ui-date
   ```
2. **Install Dependency**

```bash
 npm install
```

3. **Run Test**

```bash
  npm run test
```

4. **Build**

```bash
  npm build
```

## 📋 Guidelines

- **_Zero Dependencies:_** All new features must rely exclusively on native JavaScript APIs (e.g., Intl, Date).

- **_100% Test Coverage:_** Please write corresponding Vitest unit tests for any new methods or edge cases.

- **_TypeScript First:_** Ensure code compiles cleanly without explicit or implicit any types.

- Feel free to open an Issue or submit a Pull Request!
