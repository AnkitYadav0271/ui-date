# 📅 ui-date

> A lightweight, zero-dependency TypeScript library for formatting, inspecting, and displaying dates with both **Chainable (Class)** and **Standalone Functional** APIs.

`ui-date` is built on JavaScript's native **Date** and **Intl** APIs, so there are **no runtime dependencies**, no extra locale files, and no plugins to install.

Whether you need to display a date, format a time, check if a day is today, or show text like **"2 hours ago"**, `ui-date` provides a simple and consistent API for modern JavaScript applications.

---

#  Why ui-date?

Most date libraries are designed for complex date manipulation.

`ui-date` focuses on the most common UI tasks developers perform every day:

- Formatting dates
- Formatting time
- Showing relative time
- Displaying localized day and month names
- Checking date status (today, tomorrow, yesterday, weekend)
- Building custom relative time components
- Getting multiple date values in one call

Instead of learning a large API, you can use a small collection of methods that cover the majority of UI use cases.

---

---

#  Features

-  Zero Dependencies
-  Tiny Bundle Size
-  Fully Typed
-  Native Internationalization (i18n)
-  Works with JavaScript & TypeScript
-  Chainable Class API
-  Standalone Functional API
-  Date Formatting
-  Time Formatting
-  Localized Day & Month Names
-  Relative Time Formatting
-  Structured Relative Time Parts
-  Date Overview API
-  Date Status Helpers
-  Tree Shakeable
-  Works in Browser, Node.js, React, React Native and more

---

#  Installation

### npm

```bash
npm install ui-date
```

### pnpm

```bash
pnpm add ui-date
```

### yarn

```bash
yarn add ui-date
```

### bun

```bash
bun add ui-date
```

---

#  Quick Start

`ui-date` provides **two different APIs**.

Choose the style you prefer.

## 1. Chainable Class API

Ideal when you're working with a single date and want to call multiple methods.

```ts
import uiDate from "ui-date";

const date = uiDate("2026-08-15");

date.getDayName();
// Saturday

date.getMonthName();
// August

date.getDate();
// 08/15/2026

date.getTime();
// 06:30 PM

date.getRelativeTime();
// in 2 weeks
```

---

## 2. Standalone Functional API

Ideal when you only need one utility function.

```ts
import { getDayName, getMonthName, getDate, getTime } from "ui-date";

getDayName({
  input: "2026-08-15",
});
// Saturday

getMonthName({
  input: "2026-08-15",
});
// August

getDate({
  input: "2026-08-15",
});
// 08/15/2026

getTime({
  input: "2026-08-15",
});
// 06:30 PM
```

---

#  Which API Should I Use?

Both APIs provide the same features.

Choose whichever best fits your coding style.

| Chainable API                     | Functional API                      |
| --------------------------------- | ----------------------------------- |
| Works on a single date instance   | Independent utility functions       |
| Easy to chain multiple operations | Great when you only need one method |
| Cleaner for repeated operations   | Better for utility-based code       |
| `uiDate(date).getDayName()`       | `getDayName({ input: date })`       |

Both APIs are fully supported and receive the same updates.

---

#  Internationalization

`ui-date` uses the browser's native **Intl** API, so it automatically supports hundreds of locales without downloading additional locale files.

```ts
uiDate("2026-08-15", "en-US").getDayName();
// Saturday

uiDate("2026-08-15", "fr-FR").getDayName();
// samedi

uiDate("2026-08-15", "de-DE").getDayName();
// Samstag

uiDate("2026-08-15", "ja-JP").getDayName();
// 土曜日
```

The same applies to the standalone functions.

```ts
getDayName({
  input: "2026-08-15",
  locale: "fr-FR",
});

// samedi
```

If an invalid locale is provided, `ui-date` safely falls back to the system's default locale.

---

#  Works Everywhere

`ui-date` works anywhere JavaScript runs.

- JavaScript
- TypeScript
- React
- React Native
- Next.js
- Vue
- Nuxt
- Svelte
- SvelteKit
- Angular
- Astro
- Remix
- Node.js
- Bun
- Deno
- Electron

---

#  Why Not Just Use Date?

JavaScript's native `Date` object is powerful, but many common UI tasks require verbose code.

For example, getting a readable day name:

```ts
new Date().toLocaleDateString("en-US", {
  weekday: "long",
});
```

With `ui-date`:

```ts
uiDate().getDayName();
```

Showing relative time:

```ts
new Intl.RelativeTimeFormat("en-US").format(-2, "day");
```

With `ui-date`:

```ts
uiDate(Date.now() - 172800000).getRelativeTime();
```

The goal of `ui-date` isn't to replace JavaScript's Date API.

It provides a cleaner, easier interface for the date formatting and display tasks developers write every day.

---

# 📖 API Overview

The library exposes two APIs.

## Chainable API

```ts
import uiDate from "ui-date";

const date = uiDate(new Date());

date.getDayName();

date.getMonthName();

date.getYear();

date.getMonthCount();

date.getDay();

date.getTime();

date.getDate();

date.isLeapYear();

date.isWeekend();

date.isToday();

date.isTomorrow();

date.isYesterday();

date.getRelativeTime();

date.getRelativeTimeParts();

date.formatFullDate();

date.getOverview();
```

---

## Standalone API

```ts
import {
  getDayName,
  getMonthName,
  getYear,
  getMonthCount,
  getDay,
  getTime,
  getDate,
  isLeapYear,
  isWeekend,
  isToday,
  isTomorrow,
  isYesterday,
  getRelativeTime,
  getRelativeTimeParts,
  formatFullDate,
} from "ui-date";
```

The next section explains every method in detail with examples for both APIs.

# API GUIDE

Every feature in `ui-date` is available through both APIs.

- **Chainable API** – Best when working with one date and calling multiple methods.
- **Standalone API** – Best when you only need a single utility function.

Both APIs produce the same output.

---

# getDayName()

Returns the localized day name.

## Chainable API

### Signature

```ts
getDayName(short?: boolean): string
```

### Parameters

| Parameter | Type    | Default | Description                                   |
| --------- | ------- | ------- | --------------------------------------------- |
| short     | boolean | `false` | Returns the abbreviated day name when `true`. |

### Example

```ts
const date = uiDate("2026-08-15");

date.getDayName();
// Saturday

date.getDayName(true);
// Sat
```

---

## Standalone API

### Signature

```ts
getDayName({
    input?,
    short?,
    locale?
}): string
```

### Example

```ts
import { getDayName } from "ui-date";

getDayName({
  input: "2026-08-15",
});
// Saturday

getDayName({
  input: "2026-08-15",
  short: true,
});
// Sat
```

### Returns

```ts
string;
```

### Common Use Cases

- Calendar headers
- Event cards
- Booking systems
- Meeting schedules
- Attendance dashboards

---

# getMonthName()

Returns the localized month name.

## Chainable API

### Signature

```ts
getMonthName(short?: boolean): string
```

### Example

```ts
const date = uiDate("2026-08-15");

date.getMonthName();
// August

date.getMonthName(true);
// Aug
```

---

## Standalone API

### Signature

```ts
getMonthName({
    input?,
    short?,
    locale?
}): string
```

### Example

```ts
import { getMonthName } from "ui-date";

getMonthName({
  input: "2026-08-15",
});
// August

getMonthName({
  input: "2026-08-15",
  short: true,
});
// Aug
```

### Returns

```ts
string;
```

### Common Use Cases

- Blog posts
- Reports
- Invoices
- Event pages
- Timeline components

---

# getYear()

Returns the four-digit year.

## Chainable API

### Signature

```ts
getYear(): number
```

### Example

```ts
uiDate("2026-08-15").getYear();

// 2026
```

---

## Standalone API

### Signature

```ts
getYear(input?): number
```

### Example

```ts
import { getYear } from "ui-date";

getYear("2026-08-15");

// 2026
```

### Returns

```ts
number;
```

### Common Use Cases

- Copyright
- Reports
- Filtering
- Archives

---

# getMonthCount()

Returns the month number (1–12).

## Chainable API

### Signature

```ts
getMonthCount(): number
```

### Example

```ts
uiDate("2026-08-15").getMonthCount();

// 8
```

---

## Standalone API

### Signature

```ts
getMonthCount(input?): number
```

### Example

```ts
import { getMonthCount } from "ui-date";

getMonthCount("2026-08-15");

// 8
```

### Returns

```ts
number;
```

### Common Use Cases

- Database values
- Sorting
- Comparisons
- Analytics

---

# getDay()

Returns the day of the month.

## Chainable API

### Signature

```ts
getDay(): number
```

### Example

```ts
uiDate("2026-08-15").getDay();

// 15
```

---

## Standalone API

### Signature

```ts
getDay(input?): number
```

### Example

```ts
import { getDay } from "ui-date";

getDay("2026-08-15");

// 15
```

### Returns

```ts
number;
```

### Common Use Cases

- Calendars
- Event scheduling
- Timelines
- Date comparisons

---

# getDate()

Returns a formatted date string.

## Chainable API

### Signature

```ts
getDate(isoFormat?: boolean): string
```

### Parameters

| Parameter | Type    | Default | Description                                      |
| --------- | ------- | ------- | ------------------------------------------------ |
| isoFormat | boolean | `false` | Returns an ISO date (`YYYY-MM-DD`) when enabled. |

### Example

```ts
const date = uiDate("2026-08-15");

date.getDate();
// 08/15/2026

date.getDate(true);
// 2026-08-15
```

---

## Standalone API

### Signature

```ts
getDate({
    input?,
    locale?,
    isoFormat?
}): string
```

### Example

```ts
import { getDate } from "ui-date";

getDate({
  input: "2026-08-15",
});
// 08/15/2026

getDate({
  input: "2026-08-15",
  isoFormat: true,
});
// 2026-08-15
```

### Returns

```ts
string;
```

### Common Use Cases

Regular format

- UI display
- Profile pages
- Event cards
- Tables

ISO format

- REST APIs
- Databases
- JSON
- Sorting dates

---

# getTime()

Returns a localized time string.

## Chainable API

### Signature

```ts
getTime(use24HourFormat?: boolean): string
```

### Parameters

| Parameter       | Type    | Default | Description                        |
| --------------- | ------- | ------- | ---------------------------------- |
| use24HourFormat | boolean | `false` | Uses a 24-hour clock when enabled. |

### Example

```ts
const date = uiDate("2026-08-15T18:30:00");

date.getTime();
// 06:30 PM

date.getTime(true);
// 18:30
```

---

## Standalone API

### Signature

```ts
getTime({
    input?,
    locale?,
    use24HourFormat?
}): string
```

### Example

```ts
import { getTime } from "ui-date";

getTime({
  input: "2026-08-15T18:30:00",
});
// 06:30 PM

getTime({
  input: "2026-08-15T18:30:00",
  use24HourFormat: true,
});
// 18:30
```

### Returns

```ts
string;
```

### Common Use Cases

- Chat applications
- Notifications
- Calendar events
- Booking systems
- Timetables

---

# formatFullDate()

Returns a complete, human-readable date.

## Chainable API

### Signature

```ts
formatFullDate(short?: boolean): string
```

### Parameters

| Parameter | Type    | Default | Description                           |
| --------- | ------- | ------- | ------------------------------------- |
| short     | boolean | `false` | Uses abbreviated day and month names. |

### Example

```ts
const date = uiDate("2026-08-15");

date.formatFullDate();
// Saturday 15, August, 2026

date.formatFullDate(true);
// Sat 15, Aug, 2026
```

---

## Standalone API

### Signature

```ts
formatFullDate(
    input?,
    locale?,
    short?
): string
```

### Example

```ts
import { formatFullDate } from "ui-date";

formatFullDate("2026-08-15");
// Saturday 15, August, 2026

formatFullDate("2026-08-15", "default", true);
// Sat 15, Aug, 2026
```

### Returns

```ts
string;
```

### Common Use Cases

- Event pages
- Certificates
- Invoices
- Reports
- Dashboards
- Printable documents

---

# Date Status Helpers

These methods help you determine the status of a date without writing manual comparison logic.

They are useful for calendars, reminders, notifications, event scheduling, attendance systems, and timeline applications.

---

# isLeapYear()

Checks whether the year is a leap year.

## Chainable API

### Signature

```ts
isLeapYear(): boolean
```

### Example

```ts
uiDate("2024-02-29").isLeapYear();

// true

uiDate("2025-01-01").isLeapYear();

// false
```

---

## Standalone API

### Signature

```ts
isLeapYear(input?): boolean
```

### Example

```ts
import { isLeapYear } from "ui-date";

isLeapYear("2024-02-29");

// true

isLeapYear("2025-01-01");

// false
```

### Returns

```ts
boolean;
```

### Common Use Cases

- Calendar applications
- Financial systems
- Date validation
- Year calculations

---

# isWeekend()

Checks whether the date falls on Saturday or Sunday.

## Chainable API

### Signature

```ts
isWeekend(): boolean
```

### Example

```ts
uiDate("2026-08-15").isWeekend();

// true

uiDate("2026-08-17").isWeekend();

// false
```

---

## Standalone API

### Signature

```ts
isWeekend(input?): boolean
```

### Example

```ts
import { isWeekend } from "ui-date";

isWeekend("2026-08-15");

// true

isWeekend("2026-08-17");

// false
```

### Returns

```ts
boolean;
```

### Common Use Cases

- Leave management
- Office scheduling
- Booking systems
- Attendance software
- School management

---

# isToday()

Checks whether the given date is today.

## Chainable API

### Signature

```ts
isToday(): boolean
```

### Example

```ts
uiDate(new Date()).isToday();

// true

uiDate("2026-08-15").isToday();

// false
```

---

## Standalone API

### Signature

```ts
isToday(input): boolean
```

### Example

```ts
import { isToday } from "ui-date";

isToday(new Date());

// true
```

### Returns

```ts
boolean;
```

### Common Use Cases

- Highlight today's events
- Dashboard widgets
- Calendar applications
- Task management
- Daily reminders

---

# isTomorrow()

Checks whether the date is tomorrow.

## Chainable API

### Signature

```ts
isTomorrow(): boolean
```

### Example

```ts
const tomorrow = new Date();

tomorrow.setDate(tomorrow.getDate() + 1);

uiDate(tomorrow).isTomorrow();

// true
```

---

## Standalone API

### Signature

```ts
isTomorrow(input): boolean
```

### Example

```ts
import { isTomorrow } from "ui-date";

const tomorrow = new Date();

tomorrow.setDate(tomorrow.getDate() + 1);

isTomorrow(tomorrow);

// true
```

### Returns

```ts
boolean;
```

### Common Use Cases

- Reminder applications
- Upcoming events
- Notifications
- Appointment scheduling

---

# isYesterday()

Checks whether the date is yesterday.

## Chainable API

### Signature

```ts
isYesterday(): boolean
```

### Example

```ts
const yesterday = new Date();

yesterday.setDate(yesterday.getDate() - 1);

uiDate(yesterday).isYesterday();

// true
```

---

## Standalone API

### Signature

```ts
isYesterday(input): boolean
```

### Example

```ts
import { isYesterday } from "ui-date";

const yesterday = new Date();

yesterday.setDate(yesterday.getDate() - 1);

isYesterday(yesterday);

// true
```

### Returns

```ts
boolean;
```

### Common Use Cases

- Chat applications
- Activity feeds
- Notifications
- Timeline components
- History pages

---

# getOverview()

Returns multiple commonly used date values in a single object.

Instead of calling many methods individually, `getOverview()` computes everything at once and returns a structured object.

## Chainable API

### Signature

```ts
getOverview(): DateOverview
```

### Example

```ts
const overview = uiDate("2026-08-15").getOverview();

console.log(overview);
```

Returns

```ts
{
  dayName: "Saturday",
  shortDayName: "Sat",
  monthName: "August",
  shortMonthName: "Aug",
  monthCount: 8,
  day: 15,
  year: 2026,
  isoDate: "2026-08-15",
  usaDate: "08/15/2026",
  time12: "06:30 PM",
  time24: "18:30",
  isLeapYear: false,
  isWeekend: true,
  relativeTime: "in 2 weeks",
  relativeTimeParts: {
    value: 2,
    unit: "week",
    direction: "future",
    formattedValue: "2",
    formattedUnit: "weeks",
    formattedText: "in 2 weeks"
  },
  isToday: false,
  isTomorrow: false,
  isYesterday: false,
  formatFullDate: "Saturday 15, August, 2026"
}
```

---

## Why use getOverview()?

Without `getOverview()` you might write:

```ts
const date = uiDate("2026-08-15");

const dayName = date.getDayName();

const month = date.getMonthName();

const year = date.getYear();

const time = date.getTime();

const weekend = date.isWeekend();

const relative = date.getRelativeTime();

const formatted = date.formatFullDate();
```

Using `getOverview()`:

```ts
const overview = uiDate("2026-08-15").getOverview();

overview.dayName;

overview.monthName;

overview.time12;

overview.relativeTime;

overview.isWeekend;
```

Much cleaner and easier to maintain.

---

## Returns

```ts
interface DateOverview {
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
```

### Common Use Cases

- Dashboard cards
- Calendar screens
- Event detail pages
- User profile pages
- Date summary widgets
- Analytics dashboards

---

# Relative Time APIs

`ui-date` provides two APIs for working with relative time.

- **getRelativeTime()** — Returns a ready-to-display string.
- **getRelativeTimeParts()** — Returns structured data for building custom interfaces.

Although both methods calculate relative time, they are designed for different use cases.

---

# getRelativeTime()

Returns a human-readable relative time string.

Examples include:

- just now
- 5 minutes ago
- yesterday
- in 2 days
- next month

This is the recommended API when you simply want to display relative time in your application.

---

## Chainable API

### Signature

```ts
getRelativeTime(compareWith?: Date | string | number): string
```

If no comparison date is provided, the current date and time is used.

### Example

```ts
uiDate(Date.now() - 60000).getRelativeTime();

// "1 minute ago"

uiDate(Date.now() + 7200000).getRelativeTime();

// "in 2 hours"
```

---

### Comparing Two Dates

You can also compare one date with another.

```ts
const eventDate = new Date("2026-12-25");

const bookingDate = new Date("2026-12-20");

uiDate(eventDate).getRelativeTime(bookingDate);

// "in 5 days"
```

---

## Standalone API

### Signature

```ts
getRelativeTime({
    date1,
    date2?,
    locale?
}): string
```

### Example

```ts
import { getRelativeTime } from "ui-date";

getRelativeTime({
    date1: Date.now() - 3600000,
    locale: "en-US"
});

// "1 hour ago"
```

---

### Comparing Two Dates

```ts
getRelativeTime({
    date1: "2026-12-25",
    date2: "2026-12-20"
});

// "in 5 days"
```

---

### Returns

```ts
string
```

---

### Common Use Cases

- Social media posts
- Chat messages
- Notifications
- Comments
- Activity feeds
- Git commits
- Email timestamps

---

# getRelativeTimeParts()

Returns structured relative time information instead of a single string.

Rather than returning:

```text
2 hours ago
```

it returns an object that contains each piece separately.

```ts
{
    value: 2,
    unit: "hour",
    direction: "past",
    formattedValue: "2",
    formattedUnit: "hours",
    formattedText: "2 hours ago"
}
```

This makes it much easier to build custom user interfaces without manually splitting strings.
This method always returns

 ```json
{
    value: 2,
    unit: "hour",
    direction: "past",
    formattedValue: "2",
    formattedUnit: "hours",
    formattedText: "2 hours ago"
}
``` 
there is no fallback for formattedText. It's guaranteed that it will return as expected for RTL language too.`

---

## Chainable API

### Signature

```ts
getRelativeTimeParts(compareWith?: Date | string | number): RelativeTimeParts
```

### Example

```ts
const parts = uiDate(
    Date.now() - 7200000
).getRelativeTimeParts();

console.log(parts);
```

Returns

```ts
{
    value: 2,
    unit: "hour",
    direction: "past",
    formattedValue: "2",
    formattedUnit: "hours",
    formattedText: "2 hours ago"
}
```

---

## Standalone API

### Signature

```ts
getRelativeTimeParts({
    date1,
    date2?,
    locale?
}): RelativeTimeParts
```

### Example

```ts
import { getRelativeTimeParts } from "ui-date";

const result = getRelativeTimeParts({
    date1: Date.now() - 7200000
});

console.log(result);
```

---

# Finding the Difference Between Two Events

`getRelativeTimeParts()` is **not limited to comparing against the current time**.

You can compare **any two dates**.

For example:

- Event start and end
- Booking and check-in
- Order date and delivery date
- Project start and deadline
- Product launch and release

---

### Example

```ts
const launchDate = new Date("2026-09-01");

const deadline = new Date("2026-09-10");

const difference = uiDate(deadline)
    .getRelativeTimeParts(launchDate);

console.log(difference);
```

Returns

```ts
{
    value: 9,
    unit: "day",
    direction: "future",
    formattedValue: "9",
    formattedUnit: "days",
    formattedText: "in 9 days"
}
```

The standalone API works the same way.

```ts
const difference = getRelativeTimeParts({
    date1: "2026-09-10",
    date2: "2026-09-01"
});
```

---

# Building Custom UI

Suppose you want to style the number differently from the unit.

Instead of:

```
2 hours ago
```

you want:

```
[2] [hours]
```

Using `getRelativeTimeParts()`:

```tsx
const {
    formattedValue,
    formattedUnit
} = uiDate(post.createdAt)
    .getRelativeTimeParts();

return (
    <>
        <span>{formattedValue}</span>
        <span>{formattedUnit}</span>
    </>
);
```

You can also use:

- Different colors
- Different font sizes
- Animations
- Progress indicators
- Badges
- Timeline components

without parsing a formatted string.

---

# RelativeTimeParts

```ts
interface RelativeTimeParts {
    value: number;
    unit: Intl.RelativeTimeFormatUnit;
    direction: "past" | "future" | "present";
    formattedValue: string;
    formattedUnit: string;
    formattedText: string;
}
```

---

# getRelativeTime() vs getRelativeTimeParts()

Both methods calculate relative time using the same algorithm.

The difference is what they return.

| Feature | getRelativeTime() | getRelativeTimeParts() |
|----------|-------------------|------------------------|
| Return Type | string | object |
| Ready to display | ✅ | ❌ |
| Custom styling | ❌ | ✅ |
| Separate value and unit | ❌ | ✅ |
| formattedValue | ❌ | ✅ |
| formattedUnit | ❌ | ✅ |
| direction | ❌ | ✅ |
| formattedText | ✅ | ✅ |
| Compare two dates | ✅ | ✅ |
| Localization | ✅ | ✅ |

---

# Which One Should I Use?

Use **getRelativeTime()** when you only need a readable string.

```ts
uiDate(post.createdAt)
    .getRelativeTime();

// "3 hours ago"
```

Use **getRelativeTimeParts()** when you're building reusable UI components or need access to the individual parts.

```ts
const {
    formattedValue,
    formattedUnit
} = uiDate(post.createdAt)
    .getRelativeTimeParts();
```

---

## Recommendation

For most applications, **getRelativeTime()** is the simplest choice.

Choose **getRelativeTimeParts()** when you need:

- Custom UI
- Rich timeline components
- Styled badges
- Animated counters
- Comparing two events
- Reusable date components
- Access to the numeric value and unit separately

# Supported Input Types

Both APIs accept the following date inputs.

| Type | Example |
|------|----------|
| Date | `new Date()` |
| ISO String | `"2026-08-15"` |
| Timestamp | `1786752000000` |

Examples:

```ts
uiDate(new Date());

uiDate("2026-08-15");

uiDate(1786752000000);
```

Standalone API:

```ts
getDayName({
    input: new Date()
});

getDayName({
    input: "2026-08-15"
});

getDayName({
    input: 1786752000000
});
```

---

# Localization

`ui-date` uses JavaScript's native `Intl` API.

No locale packages need to be installed.

## Chainable API

```ts
uiDate("2026-08-15", "en-US")
    .getDayName();

// Saturday

uiDate("2026-08-15", "fr-FR")
    .getDayName();

// samedi

uiDate("2026-08-15", "de-DE")
    .getDayName();

// Samstag

uiDate("2026-08-15", "ja-JP")
    .getDayName();

// 土曜日
```

---

## Standalone API

```ts
getDayName({
    input: "2026-08-15",
    locale: "hi-IN"
});

// शनिवार
```

If an invalid locale is provided, `ui-date` automatically falls back to the system's default locale.

---

# Error Handling

Invalid dates throw an error instead of producing incorrect results.

```ts
uiDate("not-a-date");
```

```text
Error: Invalid input: not-a-date
```

Standalone API behaves the same way.

```ts
getDayName({
    input: "not-a-date"
});
```

```text
Error: Invalid input: not-a-date
```

---

# TypeScript Support

`ui-date` is written in TypeScript and ships with built-in type definitions.

No additional packages are required.

```ts
import uiDate from "ui-date";

const date = uiDate();

const day: string = date.getDayName();

const year: number = date.getYear();

const weekend: boolean = date.isWeekend();
```

TypeScript also provides autocomplete for every available method.

---

# Tree Shaking

Standalone functions can be imported individually.

```ts
import { getDayName } from "ui-date";
```

Instead of importing the entire library.

```ts
import uiDate from "ui-date";
```

Modern bundlers will remove unused exports, helping keep your bundle size small.

---

# When Should I Use Which API?

| Situation | Recommended API |
|-----------|-----------------|
| Working with one date | Chainable API |
| Calling many methods | Chainable API |
| Utility functions | Standalone API |
| Tree-shaking | Standalone API |
| React Components | Either |
| Node.js | Either |
| TypeScript | Either |

There is no performance difference between the two APIs.

Choose the one that best matches your coding style.

---

# API Summary

## Chainable API

```ts
uiDate(date)

.getDayName()

.getMonthName()

.getYear()

.getMonthCount()

.getDay()

.getDate()

.getTime()

.isLeapYear()

.isWeekend()

.isToday()

.isTomorrow()

.isYesterday()

.getRelativeTime()

.getRelativeTimeParts()

.formatFullDate()

.getOverview()
```

---

## Standalone API

```ts
getDayName()

getMonthName()

getYear()

getMonthCount()

getDay()

getDate()

getTime()

isLeapYear()

isWeekend()

isToday()

isTomorrow()

isYesterday()

getRelativeTime()

getRelativeTimeParts()

formatFullDate()
```

---

# Contributing

Contributions are welcome.

Whether you're fixing bugs, improving documentation, adding tests, or proposing new features, every contribution is appreciated.

## Clone the Repository

```bash
git clone https://github.com/AnkitYadav0271/ui-date.git

cd ui-date
```

---

## Install Dependencies

```bash
npm install
```

---

## Run Tests

```bash
npm test
```

---

## Build

```bash
npm run build
```

---

## Guidelines

Please follow these principles when contributing.

- Keep the library dependency-free.
- Use native JavaScript APIs whenever possible.
- Maintain TypeScript compatibility.
- Add tests for new features.
- Keep the API simple and intuitive.
- Update the documentation when adding or changing APIs.

Before opening a Pull Request, ensure all tests pass successfully.

---

# Roadmap

Future improvements being considered:

- Week support
- Quarter support
- Duration formatting
- Time difference utilities
- More formatting helpers
- Additional locale improvements

Suggestions are always welcome through GitHub Issues.

---

# License

MIT License

---

# Author

Created and maintained by **Ankit Yadav**.

If you find this project useful, consider giving it a ⭐ on GitHub.

It helps others discover the project and supports future development.

---

# Links

## GitHub

https://github.com/AnkitYadav0271/ui-date

## npm

https://www.npmjs.com/package/ui-date

---

# Support

If you encounter a bug or have a feature request, please open an issue on GitHub.

Questions, suggestions, and contributions are always welcome.

---

Thank you for using **ui-date** ❤️