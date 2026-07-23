# Changelog

All notable changes to `ui-date` will be documented in this file.

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

## [1.1.0] - 2026-07-15  <-- OLDER VERSIONS BELOW

### 🚀 Added
- Initial core release with `getOverview()` method and zero-dependency base setup.