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
import {
  BartocFooter,
  BartocHeader,
  BartocSearchBar,
} from "@gbv/bartoc-components"

import "@gbv/bartoc-components/style.css"
```


## CSS Approach

The `--cc-*` custom properties define semantic design tokens shared across BARTOC and the coli-conc application family. They cover colors, font sizes, spacing, radii, borders, and list/table row rhythm.

Component classes use a pragmatic BEM style. Block names start with
`bartoc-*`, for example `bartoc-header` or `bartoc-search-bar`. Elements use
`__`, for example `bartoc-header__nav-link`. Modifiers use `--`, but only when
they are styled or part of a consumer contract.

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
| `cc-button-sm` | Compact button size for dense UI such as badges, filters, or row actions. |
| `cc-button-icon` | Square icon-only button. Use with an accessible label such as `aria-label`. |


## Components

### BartocHeader

`BartocHeader` provides shared BARTOC header presentation without depending on
Bootstrap. The host application still owns login state, authorization checks,
environment-specific edit URLs, and route/menu data.

```vue
<BartocHeader
  logo-url="/img/bartoc-logo-new.png"
  :nav-links="navLinks"
  :utility-links="utilityLinks"
  :user-can-add="userCanAdd"
  edit-url="/edit"
>
  <template #user-status>
    <UserStatus redirect />
  </template>
</BartocHeader>
```

See [BartocHeader documentation](docs/components/BartocHeader.md) for props,
slots, link objects, and host integration notes.

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
  :internal-links="internalLinks"
  :external-links="externalLinks"
/>
```

See [BartocFooter documentation](docs/components/BartocFooter.md) for props,
slots, link objects, and contextual examples.

## CSS Contract

Importing `@gbv/bartoc-components/style.css` provides the shared `--cc-*`
design tokens, `app-container`, print helpers, form/button controls, header
classes, search bar classes, table utilities, and footer classes.

Styles are scoped to component classes such as `bartoc-search-bar` and
`bartoc-header`, so the package CSS should not reset the host application's
global body or link styles.

### Tables

Add `cc-table` to a native HTML table to apply shared width, spacing, text
color, alignment, and collapsed-border behavior without depending on
Bootstrap. The base table is intentionally borderless; add modifiers only for
the behavior the table needs.

| Class | Semantics |
| --- | --- |
| `cc-table` | Required borderless base class with the standard shared row padding. |
| `cc-table--compact` | Reduces cell padding for dense editor interfaces. |
| `cc-table--divided` | Adds cell/row dividers and a stronger, bottom-aligned header separator. |
| `cc-table--hover` | Highlights body rows on hover while retaining the shared readable text color. |

Modifiers are composable. For example, this compact table has visible
dividers and hover feedback:

```html
<table class="cc-table cc-table--compact cc-table--divided cc-table--hover">
  <thead>
    <tr>
      <th scope="col">Registry</th>
      <th scope="col">Terminologies</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">BARTOC</th>
      <td>3,200</td>
    </tr>
    <tr>
      <th scope="row">coli-conc</th>
      <td>120</td>
    </tr>
  </tbody>
</table>
```

## Development

```sh
npm install
npm run dev
npm run check
```

The development server renders the demo app from `dev/App.vue`. The production
build emits the library files and package CSS in `dist/`.

See [RELEASING.md](RELEASING.md) for the release process and
[CHANGELOG.md](CHANGELOG.md) for breaking changes and migration notes.
