# 📅 ui-date

> A lightweight, zero-dependency TypeScript library for formatting, inspecting, and presenting dates with a clean, chainable API.

`ui-date` Built on JavaScript's native `Date` and `Intl` APIs for maximum performance and zero dependencies. It gives you intuitive date parsing, formatting, relative time calculation, and status checks with strong TypeScript definitions out of the box.

---

## ⚡ Package Size

- 📦 Unpacked Size: **1.64 kB**
- 🗜️ Minified + Gzipped: **< 1 kB**
- 🚫 Runtime Dependencies: **0**
- 🌲 Tree-shakeable ES Module
- 📘 Full TypeScript Support

## ✨ Features

## ✨ Features

- 🚫 **Zero Dependencies** — Built entirely on native JavaScript APIs.
- ⚡ **Lightweight & Fast** — Tiny bundle size with minimal runtime overhead.
- **Full Internationalization (i18n):** Support for all standard BCP 47 locale tags (`es-ES`, `de-DE`, `ja-JP`, etc.).
- **Graceful Locale Fallback:** Bad or unsupported locale strings now safely default to system locale without crashing.
- **Native Relative Time Formatting:** Utilizes `Intl.RelativeTimeFormat` for automatically localized relative dates.
-  **Fully Typed** — Complete TypeScript definitions included.
-  **Chainable API** — Clean, intuitive, object-oriented methods.
-  **Relative Time** — Generate strings like `"5 minutes ago"` or `"in 2 days"`.
-  **Readable Date Formatting** — Format dates into human-friendly strings.
-  **Date Overview API** — Retrieve all commonly used date properties in a single call.
-  **Date Status Helpers** — Check if a date is today, tomorrow, yesterday, a weekend, or a leap year.
-  **Framework Agnostic** — Works with any JavaScript or TypeScript project.

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

## 🚀 Quick Example

```ts
import uiDate from "ui-date";

const date = uiDate("2026-07-23");

date.getDayName();
// Thursday

date.getRelativeTime();
// in 2 days

date.formatFullDate();
// Thursday 23, July, 2026

date.isWeekend();
// false
```

## ✅ Works Everywhere

`ui-date` works anywhere JavaScript runs.

- Vanilla JavaScript
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

## 📖 API Reference

# API Reference

The package exports a single factory function, `uiDate()`, which returns a `UiDate` instance exposing a rich set of date formatting and utility methods.

```ts
import uiDate from "@ui-date";

const date = uiDate("2026-08-15");
```

> **Supported input types**
>
> - `Date`
> - ISO Date String
> - Timestamp (milliseconds)

```ts
uiDate(new Date());

uiDate("2026-08-15");

uiDate(1786752000000);
```

You can also specify a locale for localized formatting.

```ts
uiDate("2026-08-15", "en-US");

uiDate("2026-08-15", "fr-FR");

uiDate("2026-08-15", "hi-IN");
```

---

# Methods

## getDayName()

Returns the day name.

### Signature

```ts
getDayName(short?: boolean): string
```

### Parameters

| Parameter | Type    | Default | Description                                                                 |
| --------- | ------- | ------- | --------------------------------------------------------------------------- |
| short     | boolean | false   | Returns short (eg: Wed) when `true` or full (eg:- Wednesday) when `false` . |

### Returns

```ts
string;
```

### Example

```ts
const date = uiDate("2026-08-15");

date.getDayName();
// Saturday

date.getDayName(true);
// Sat
```

### Use Cases

Use this method whenever you need to display the weekday in a user interface.

Examples:

- Calendar headers
- Event cards
- Meeting schedules
- Booking systems

---

## getMonthName()

Returns the localized month name.

### Signature

```ts
getMonthName(short?: boolean): string
```

### Parameters

| Parameter | Type    | Default | Description                                                                   |
| --------- | ------- | ------- | ----------------------------------------------------------------------------- |
| short     | boolean | false   | Returns short (eg:Jul) when `true` or full (eg:July) when `false` month name. |

### Returns

```ts
string;
```

### Example

```ts
const date = uiDate("2026-08-15");

date.getMonthName();
// August

date.getMonthName(true);
// Aug
```

### Use Cases

Perfect for displaying readable dates inside cards, invoices, reports, or event pages.

---

## getYear()

Returns the four-digit year.

### Signature

```ts
getYear(): number
```

### Returns

```ts
number;
```

### Example

```ts
uiDate("2026-08-15").getYear();

// 2026
```

### Use Cases

Useful for:

- Copyright notices
- Reports
- Archives
- Date calculations

---

## getMonthCount()

Returns the month number (1-12).

### Signature

```ts
getMonthCount(): number
```

### Returns

```ts
number;
```

### Example

```ts
uiDate("2026-08-15").getMonthCount();

// 8
```

### Use Cases

Useful when storing or comparing months numerically.

---

## getDay()

Returns the day of the month.

### Signature

```ts
getDay(): number
```

### Returns

```ts
number;
```

### Example

```ts
uiDate("2026-08-15").getDay();

// 15
```

### Use Cases

Ideal for calendars, schedules, and custom date formatting.

---

## getTime()

Returns the formatted time.

### Signature

```ts
getTime(use24HourFormat?: boolean): string
```

### Parameters

| Parameter       | Type    | Default |
| --------------- | ------- | ------- |
| use24HourFormat | boolean | false   |

### Example

```ts
const date = uiDate();

date.getTime();
// 06:30 PM

date.getTime(true);
// 18:30
```

### Use Cases

Recommended for:

- Chat timestamps
- Notifications
- Messages
- Event timing
- Booking applications

---

## getDate()

Returns a formatted date string.

### Signature

```ts
getDate(isoFormat?: boolean): string
```

### Parameters

| Parameter | Type    | Default |
| --------- | ------- | ------- |
| isoFormat | boolean | false   |

### Example

```ts
const date = uiDate("2026-08-15");

date.getDate();
// 08/15/2026

date.getDate(true);
// 2026-08-15
```

### Use Cases

Use the default format for displaying dates to users.

Use ISO format when:

- Saving to databases
- Sending API requests
- Comparing dates
- Serializing JSON

---

## isLeapYear()

Checks whether the year is a leap year.

### Signature

```ts
isLeapYear(): boolean
```

### Example

```ts
uiDate("2024-01-01").isLeapYear();

// true
```

### Use Cases

Useful for:

- Date calculations
- Financial software
- Calendar systems

---

## isWeekend()

Determines whether the date falls on Saturday or Sunday.

### Signature

```ts
isWeekend(): boolean
```

### Example

```ts
uiDate("2026-08-15").isWeekend();

// true
```

### Use Cases

Perfect for:

- Attendance systems
- Leave management
- Booking applications
- Work schedule planners

---

## isToday()

Checks if the wrapped date is today's date.

### Signature

```ts
isToday(): boolean
```

### Example

```ts
uiDate().isToday();

// true
```

### Use Cases

Useful for highlighting today's events or messages.

---

## isTomorrow()

Checks if the wrapped date is tomorrow.

### Signature

```ts
isTomorrow(): boolean
```

### Example

```ts
uiDate(Date.now() + 86400000).isTomorrow();
```

### Use Cases

Great for reminders and upcoming event notifications.

---

## isYesterday()

Checks if the wrapped date represents yesterday.

### Signature

```ts
isYesterday(): boolean
```

### Example

```ts
uiDate(Date.now() - 86400000).isYesterday();
```

### Use Cases

Useful for messaging apps, timelines, and activity feeds.

---

## getRelativeTime()

Returns a localized relative time string.

### Signature

```ts
getRelativeTime(): string
```

### Example

```ts
uiDate(Date.now() - 60000).getRelativeTime();

// 1 minute ago

uiDate(Date.now() + 7200000).getRelativeTime();

// in 2 hours
```

### Use Cases

One of the most commonly used methods.

Recommended for:

- Social media feeds
- Notifications
- Chat applications
- Activity history
- Comments

---

## getRelativeTimeParts()

Returns structured relative time information.

### Signature

```ts
getRelativeTimeParts(): RelativeTimeParts
```

### Returns

```ts
{
  value: number;
  unit: "second" | "minute" | "hour" | "day" | ...;
  direction: "past" | "future" | "present";
  formattedValue: string;
  formattedUnit: string;
  formattedText: string;
}
```

### Example

```ts
uiDate(Date.now() - 7200000).getRelativeTimeParts();
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

### Use Cases

Use this API when building fully customized relative time UIs instead of relying on a single formatted string.

Examples include:

- Internationalized interfaces
- Animated counters
- Custom timeline components

---

## formatFullDate()

Returns a complete human-readable date.

### Signature

```ts
formatFullDate(short?: boolean): string
```

### Example

```ts
uiDate("2026-08-15").formatFullDate();

// Saturday 15, August, 2026

uiDate("2026-08-15").formatFullDate(true);

// Sat 15, Aug, 2026
```

### Use Cases

Recommended for:

- Event pages
- Invoice dates
- Reports
- Profile pages

---

## getOverview()

Returns all computed values in a single object.

### Signature

```ts
getOverview(): DateOverview
```

### Example

```ts
const overview = uiDate().getOverview();
```

Returns

```ts
{
  (dayName,
    shortDayName,
    monthName,
    shortMonthName,
    monthCount,
    day,
    year,
    isoDate,
    usaDate,
    time12,
    time24,
    isLeapYear,
    isWeekend,
    relativeTime,
    isToday,
    isTomorrow,
    isYesterday,
    formatFullDate);
}
```

### Use Cases

This is the recommended API when you need multiple date properties simultaneously.

Instead of calling several methods:

```ts
date.getDayName();
date.getMonthName();
date.getTime();
date.getDate();
date.isWeekend();
```

You can simply call:

```ts
const overview = date.getOverview();
```

This keeps your code cleaner, more readable, and avoids repetitive method calls.

Recommended for:

- Dashboard applications
- Calendar screens
- Event details
- User profile pages
- Date summary components

## Choosing Between `getRelativeTime()` and `getRelativeTimeParts()`

Both methods provide relative time information, but they serve different purposes.

| Feature                | `getRelativeTime()`               | `getRelativeTimeParts()`          |
| ---------------------- | --------------------------------- | --------------------------------- |
| Returns                | Human-readable string             | Structured object                 |
| Best For               | Displaying relative time directly | Building custom UI components     |
| Ready to Render        | ✅ Yes                            | ❌ No                             |
| Custom Styling         | ❌ No                             | ✅ Yes                            |
| Access to Value & Unit | ❌ No                             | ✅ Yes                            |
| Internationalization   | ✅ Uses `Intl.RelativeTimeFormat` | ✅ Uses `Intl.RelativeTimeFormat` |
| Recommended For        | Most applications                 | Advanced or custom interfaces     |

### Which one should I use?

Use **`getRelativeTime()`** if you simply want to display relative time to your users.

```ts
// "2 hours ago"
post.createdAt.getRelativeTime();
```

Use **`getRelativeTimeParts()`** when you need complete control over how the relative time is rendered.

```ts
// { value: 2, unit: "hour", direction: "past", ... }
post.createdAt.getRelativeTimeParts();
```

> **Recommendation**
>
> For most applications, `getRelativeTime()` is the recommended choice. Reach for `getRelativeTimeParts()` only when you need structured data for custom rendering, animations, or reusable UI components.

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
