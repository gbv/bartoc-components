# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added

- Added the reusable `cc-checkbox` class for native checkboxes, with keyboard
  focus and disabled states ([#5](https://github.com/gbv/bartoc-components/issues/5)).

## 0.5.0 - 2026-10-22

### Added

- Added shared `--cc-*` tokens for borders, line heights, touch targets,
  transitions, and header layout, reused across components.
- Added the optional `site-description` slot for desktop footer branding.

### Changed

- Redesigned `BartocHeader` with horizontal desktop navigation and an animated
  mobile menu with keyboard support. Aligned Login and Add styling across
  layouts ([#2](https://github.com/gbv/bartoc-components/issues/2)).
- Updated `BartocSearchBar` with a single desktop row and a mobile layout with
  the input above the field selector and Search button, stacking controls when
  needed ([#3](https://github.com/gbv/bartoc-components/issues/3)).
- Redesigned `BartocFooter` with grouped links, desktop columns, compact mobile
  sections, and separate licensing. Search index information and resource
  formats share an optional contextual column
  ([#4](https://github.com/gbv/bartoc-components/issues/4)).

## 0.4.0 - 2026-08-13

### Added

- Added shared warning tokens and Bootstrap-independent `cc-message` utilities.

## 0.3.0 - 2026-08-12

### Added

- Added Bootstrap-independent `cc-table` utilities with compact, divided, and
  hover modifiers.

## 0.2.0 - 2026-07-30

### Changed

- **Breaking:** `BartocFooter` replaces the `apiUrl`, `apiLabel`,
  `downloadUrl`, and `downloadLabel` props with the `internalLinks` array.

### Migration

Replace the dedicated API and download props:

```vue
<BartocFooter
  api-url="/api/"
  download-url="/download"
/>
```

with link objects:

```vue
<script setup>
const internalLinks = [
  { href: "/api/", label: "API" },
  { href: "/download", label: "download" },
]
</script>

<template>
  <BartocFooter :internal-links="internalLinks" />
</template>
```
