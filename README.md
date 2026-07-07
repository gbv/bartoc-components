# BARTOC Components

Shared Vue components, design tokens, and CSS utilities for BARTOC
applications.

This package is a component library, not a standalone product application. It
includes a small Vite demo app for local development and visual checks.

## Installation

```sh
npm install github:gbv/bartoc-components
```

Vue 3 is a peer dependency; consuming applications provide it:

```json
{
  "peerDependencies": {
    "vue": "^3.5.0"
  }
}
```

## Usage

```js
import { BartocFooter, BartocSearchBar } from "@gbv/bartoc-components"

import "@gbv/bartoc-components/style.css"
```


## CSS Approach

The `--cc-*` custom properties define semantic design tokens shared across BARTOC and the coli-conc application family. They cover colors, font sizes, spacing, radii, borders, and list/table row rhythm.

Color tokens:

| Token | Current value | Use |
| --- | --- | --- |
| `--cc-color-primary` | `#b13f13` | Main brand/action color. |
| `--cc-color-primary-hover` | `#c8623b` | Hover state for primary actions. |
| `--cc-color-secondary` | `#e9e1e1` | Secondary brand/support color. |
| `--cc-color-accent` | `#f1ecea` | Soft highlight, selected rows, action backgrounds. |
| `--cc-color-danger` | `#dc3545` | Destructive actions and error-like states. |
| `--cc-color-danger-hover` | `#bd2130` | Hover state for destructive actions. |
| `--cc-color-text` | `#212121` | Main readable text. |
| `--cc-color-muted` | `#6c757d` | Secondary text and low-emphasis UI. |
| `--cc-color-link` | `#8b2406` | Standard link color. |
| `--cc-color-page` | `#f6f3f3` | Page background. |
| `--cc-color-surface` | `#fff` | Cards, controls, and raised surfaces. |
| `--cc-color-surface-muted` | `#fcfcfc` | Subtle surface background. |
| `--cc-color-on-primary` | `#fff` | Text/icons on primary or danger backgrounds. |

Font sizes use `rem` values so they follow the browser/root font size:

- `--cc-font-size-sm`: `0.875rem`, usually 14px.
- `--cc-font-size-base`: `1rem`, usually 16px.
- `--cc-font-size-lg`: `1.25rem`, usually 20px.
- `--cc-font-size-xl`: `1.75rem`, usually 28px.

Font weights follow the coli-conc scale:

- `--cc-font-weight-light`: `400`.
- `--cc-font-weight-regular`: `600`.
- `--cc-font-weight-bold`: `700`.

The helper classes `font-weight-light`, `font-weight-regular`, and `font-weight-bold` use these tokens. This means `font-weight-light` is intentionally `400` in BARTOC's shared layer, not Bootstrap's default `300`.

Use `--cc-space-*` for page and component spacing, and `--cc-row-*` for compact repeated rows, lists, and table-like UI. Bootstrap spacing utilities can still be used for ordinary layout when they already fit.

Button semantics:

| Class | Use |
| --- | --- |
| `cc-button-primary` | Main action in the current context, such as save/search/edit. |
| `cc-button-secondary` | Neutral actions, such as cancel/reset. |
| `cc-button-action` | Positive utility actions, such as download/export/report. |
| `cc-button-danger` | Destructive actions, such as clear/remove. |
| `cc-button-ghost` | Low-emphasis filters or inactive toggles. |
| `cc-button-selected` | Selected/toggled state. |
| `cc-button-on-primary` | Action placed on a primary-colored surface, such as the header. |


## Components

### BartocSearchBar

`BartocSearchBar` provides shared terminology search form presentation. The
host application still owns route synchronization, URI lookup, search limits,
and URL construction.

```vue
<BartocSearchBar
  v-model:search="search"
  v-model:field="field"
  @submit="submitSearch"
/>
```

See [BartocSearchBar documentation](docs/components/BartocSearchBar.md) for the
field contract, events, slots, and host integration notes.

### BartocFooter

`BartocFooter` provides shared footer presentation for BARTOC metadata,
search index status, global navigation links, resource format links, and print
output. The host application still owns API status fetching, route decisions,
and URL construction.

```vue
<BartocFooter
  site-name="BARTOC.org"
  api-url="/api/"
  download-url="/download"
  :external-links="externalLinks"
/>
```

See [BartocFooter documentation](docs/components/BartocFooter.md) for props,
slots, link objects, and contextual examples.

## CSS Contract

Importing `@gbv/bartoc-components/style.css` provides the shared `--cc-*`
design tokens, `app-container`, print helpers, form/button controls, search bar
classes, and footer classes.

Styles are scoped to component classes such as `bartoc-search-bar` and
`bartoc-footer`, so the package CSS should not reset the host application's
global body or link styles.

## Development

```sh
npm install
npm run dev
npm run build
```

The development server renders the demo app from `dev/App.vue`. The production
build emits the library files and package CSS in `dist/`.
