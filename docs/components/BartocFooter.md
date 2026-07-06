# BartocFooter

Shared BARTOC footer component for Vue applications.

The component owns footer presentation only. Host applications still own route
decisions, API status fetching, environment-specific URLs, and resource URL
construction.

## Basic Usage

```vue
<script setup>
import { BartocFooter } from "@gbv/bartoc-components"

import "@gbv/bartoc-components/style.css"

const externalLinks = [
  { href: "https://code4lib.social/@bartoc", label: "Mastodon", rel: "me" },
  { href: "https://github.com/gbv/bartoc.org", label: "sources" },
  { href: "https://github.com/gbv/bartoc.org/issues", label: "issues" },
]
</script>

<template>
  <BartocFooter
    site-name="BARTOC.org"
    api-url="/api/"
    download-url="/download"
    :external-links="externalLinks"
  />
</template>
```

## Contextual Sections

Pass search status only where it belongs, for example on `/terminologies`:

```vue
<BartocFooter
  site-name="BARTOC.org"
  api-url="/api/"
  download-url="/download"
  :external-links="externalLinks"
  :search-status-links="searchStatusLinks"
>
  <template #search-status>
    search in <b>123</b> terminologies
    (as of <b>2026-07-06</b>, live updates <b>enabled</b>)
  </template>
</BartocFooter>
```

Pass resource format links only on pages with a current vocabulary or resource:

```vue
<BartocFooter
  site-name="BARTOC.org"
  api-url="/api/"
  download-url="/download"
  :external-links="externalLinks"
  :resource-format-links="resourceFormatLinks"
/>
```

## Props

- `siteName` string, default `BARTOC.org`: displayed site instance, for example
  `BARTOC.org` or `BARTOC.org (dev)`.
- `apiUrl` string, default empty: environment-dependent API URL. When set, it
  is rendered in the global footer links.
- `apiLabel` string, default `API`.
- `downloadUrl` string, default empty: environment-dependent download URL. When
  set, it is rendered in the legal sentence and global footer links.
- `downloadLabel` string, default `download`.
- `licenseLabel` string, default `PDDL 1.0`.
- `licenseUrl` string, default
  `http://www.opendatacommons.org/licenses/pddl/1.0/`.
- `externalLinks` array, default empty: off-site links such as Mastodon,
  sources, and issues.
- `searchStatus` string, default empty: plain-text search status. Use the
  `search-status` slot when markup is needed.
- `searchStatusLinks` array, default empty: links shown next to search status,
  such as Search API and bartoc-search sources.
- `resourceFormatLinks` array, default empty: current resource data links such
  as JSON, RDF, and XML.
- `printText` string, default empty: overrides the default print-only text.

## Slots

- `search-status`: custom search/index status content.
- `search-status-links`: custom search status links.
- `legal`: custom legal/license sentence.
- `resource-format-links`: custom resource format links.
- `global-links`: custom global footer links.
- `print`: custom print-only footer text.

## Link Objects

All link arrays use the same shape:

```js
const link = {
  href: "/api/",
  label: "API",
  rel: "me",
  target: "_blank",
}
```

Only `href` and `label` are required. If `target` is `_blank`, the component
adds `rel="noopener noreferrer"` unless `rel` is explicitly set.

## Default Text

The default screen legal sentence is:

```text
BARTOC.org vocabulary metadata is made available under the PDDL 1.0
```

The default print text adds a final period.
