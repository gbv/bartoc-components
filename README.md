# BARTOC Components

Shared Vue footer component, design tokens, and CSS utilities for BARTOC
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
import { BartocFooter } from "@gbv/bartoc-components"

import "@gbv/bartoc-components/style.css"
```

## Components

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
design tokens, `app-container`, print helpers, and footer classes.

Styles are scoped to component classes such as `bartoc-footer`, so the package
CSS should not reset the host application's global body or link styles.

## Development

```sh
npm install
npm run dev
npm run build
```

The development server renders the demo app from `dev/App.vue`. The production
build emits the library files and package CSS in `dist/`.
