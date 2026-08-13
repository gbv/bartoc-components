# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

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
