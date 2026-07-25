# Changelog

[2.0.0] - 2026-07-26
🚀 Added
Dual Architecture (Class vs. Standalone Functional): Re-architected package to export both the ergonomic UiDate class (uiDate()) and standalone pure functional utilities (e.g., getRelativeTime(), getDayName()) for tree-shaking support (~300 bytes per method).

Target Date Parameter (targetDate): Extended getRelativeTime() and getRelativeTimeParts() to accept an optional targetDate parameter to compute relative distance between two explicit dates (Date-to-Date distance).

Options Object Pattern: Adopted an options object pattern for functional utility exports (e.g., getDayName({ input, locale, short })) to prevent positional argument sequence awkwardness.

Tree-Shaking Support: Configured "sideEffects": false in package.json for bundler optimization.

⚡ Changed
Default Parameter Fallbacks: Standardized input parameters across all functional exports to default to the current system time (new Date()) when undefined or omitted.

Improved Error Handling: Centralized error throwing in validateDate() for invalid date inputs with clear error messages.

🧪 Testing & Documentation
Comprehensive Vitest test suites covering standard usage, options object patterns, timezone boundaries, and edge cases.

Completely rewritten README.md featuring architecture guides, comparative performance matrices, and custom UI component examples.

## [1.3.0] - 2026-07-24

### 🚀 Added
- **`getRelativeTimeParts()` Method:** Introduced granular relative time decomposition returning `value`, `unit`, `direction`, `formattedValue`, `formattedUnit`, and `formattedText`.
- **Locale-Aware Token Parsing:** Intelligently isolates numeric values and localized unit names across complex languages (including prepositions and postpositions in Spanish, French, German, Japanese, etc.).
- **Deterministic Direction Enum:** Always returns standardized `'past'`, `'future'`, or `'present'` status keys regardless of active locale for predictable programmatic UI logic.

### ⚡ Changed
- **Mathematical Relative Calculation:** Removed hardcoded near-zero time thresholds in favor of strict mathematical relative calculations, giving consumers full control over real-time UI boundaries.

---

## [1.2.0] - 2026-07-23

### 🚀 Added
- **Full Internationalization (i18n):** Support for all standard BCP 47 locale tags (`es-ES`, `de-DE`, `ja-JP`, etc.).
- **Graceful Locale Fallback:** Bad or unsupported locale strings now safely default to system locale without crashing.
- **Native Relative Time Formatting:** Utilizes `Intl.RelativeTimeFormat` for automatically localized relative dates.

### 🐛 Fixed
- Fixed `isWeekend()` day-of-week calculation bug.
- Replaced hardcoded `"en-US"` defaults with dynamic instance locale fallback.
- Fixed `uiDate()` helper signature to accept standard inputs natively.

---

## [1.1.0] - 2026-07-15

### 🚀 Added
- Initial core release with `getOverview()` method and zero-dependency base setup.