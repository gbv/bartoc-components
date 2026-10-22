# BartocFooter

Shared BARTOC footer component for Vue applications.

The component owns footer presentation only. Host applications still own route
decisions, API status fetching, environment-specific URLs, and resource URL
construction.

## Responsive Layout

- **Desktop** (`48rem` and wider): site name and link groups appear in columns.
  Search index and resource formats share an optional contextual column.
- **Mobile**: sections stack vertically. Link groups use up to two columns,
  with full-width rows for longer labels. All links stay visible.

Empty sections are omitted. Links support touch and keyboard navigation with
visible focus. Licensing appears separately at the bottom; printing shows only
the print text or `print` slot.

## Basic Usage

```vue
<script setup>
import { BartocFooter } from "@gbv/bartoc-components"

import "@gbv/bartoc-components/style.css"

const externalLinks = [
  { href: "https://www.gbv.de/impressum", label: "Imprint" },
  { href: "https://www.gbv.de/datenschutz", label: "Privacy Policy" },
  { href: "https://code4lib.social/@bartoc", label: "Mastodon", rel: "me" },
  { href: "https://github.com/gbv/bartoc.org", label: "BARTOC sources" },
  { href: "https://github.com/gbv/bartoc.org/issues", label: "Issues" },
]

const internalLinks = [
  { href: "/api", label: "API" },
  { href: "/download", label: "Download" },
  { href: "/sparql", label: "SPARQL" },
]
</script>

<template>
  <BartocFooter
    site-name="BARTOC.org"
    :internal-links="internalLinks"
    :external-links="externalLinks"
  >
    <template #site-description>
      Basic Register of Thesauri, Ontologies &amp; Classifications
    </template>
  </BartocFooter>
</template>
```

## Contextual Sections

Pass search status only where it belongs, for example on `/terminologies`:

```vue
<BartocFooter
  site-name="BARTOC.org"
  :internal-links="internalLinks"
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
  :internal-links="internalLinks"
  :external-links="externalLinks"
  :resource-format-links="resourceFormatLinks"
/>
```

These sections also appear when only their corresponding slots are supplied.
No API requests or resource URL construction happen inside the component.
The demo includes both contextual sections for testing. Host applications pass
only the sections relevant to the current page. Use distinct labels such as
`BARTOC sources` in `externalLinks` and `bartoc-search sources` in
`searchStatusLinks` to distinguish the two repositories; the component preserves
the supplied labels and URLs.

## Props

- `siteName` string, default `BARTOC.org`: displayed site instance, for example
  `BARTOC.org` or `BARTOC.org (dev)`.
- `licenseLabel` string, default `PDDL 1.0`.
- `licenseUrl` string, default
  `http://www.opendatacommons.org/licenses/pddl/1.0/`.
- `externalLinks` array, default empty: off-site links such as Mastodon,
  sources, and issues.
- `internalLinks` array, default empty: in-site links such as API, download page and sparql endpoint.
- `searchStatus` string, default empty: plain-text search status. Use the
  `search-status` slot when markup is needed.
- `searchStatusLinks` array, default empty: links below search status in the
  contextual column, such as Search API and bartoc-search sources.
- `resourceFormatLinks` array, default empty: current resource data links such
  as JSON, RDF, and XML.
- `printText` string, default empty: overrides the default print-only text.

## Slots

- `site-description`: optional short description below the site name on desktop;
  hidden on mobile and in print. No description is supplied by default.
- `search-status`: custom search/index status content.
- `search-status-links`: custom search status links.
- `legal`: custom legal/license sentence.
- `resource-format-links`: custom resource format links.
- `global-links`: replaces both default link groups with one custom navigation
  column. The slot is rendered once; provide any headings needed for custom
  groups inside the slot.
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
The legal notice links "made available" to the supplied internal link labelled
`download` (case-insensitive). Navigation labels are displayed as provided.

## Styling

The footer reuses the existing shared tokens; no additional tokens are required.

| Token | Use |
| --- | --- |
| `--cc-footer-background` | Dark footer background. |
| `--cc-footer-color` | Context and licensing text. |
| `--cc-footer-link-color` | Links; defaults to `--cc-footer-color` for a quieter appearance. |
| `--cc-footer-link-hover-color` | Hover and keyboard focus link color. |
| `--cc-color-on-primary` | Section headings and site name on the dark background. |
| `--cc-footer-border-color` | Footer top border. |
| `--cc-footer-separator-color` | Mobile section rules, contextual section rule, and licensing rule. |
| `--cc-space-*` | Section gaps, padding, and focus outline offset. |
| `--cc-touch-target-size` | Minimum navigation link width; minimum height on mobile and touch devices. |
| `--cc-border-width`, `--cc-border-width-strong` | Separator and focus outline widths. |
| `--cc-font-size-*`, `--cc-font-weight-*`, `--cc-line-height-*` | Typography. |

The `48rem` breakpoint stays in the media query because CSS custom properties
cannot be used in media query conditions.
