# BartocHeader

Shared BARTOC header component for Vue applications.

The component owns header presentation only. Host applications still own login
state, authorization checks, route decisions, environment-specific edit URLs,
and conversion from server-side menu data.

## Basic Usage

```vue
<script setup>
import { BartocHeader } from "@gbv/bartoc-components"

import "@gbv/bartoc-components/style.css"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/vocabularies", label: "Terminologies" },
  { href: "/registries", label: "Registries" },
]

const utilityLinks = [{ href: "/contact", label: "Contact & Editors" }]
</script>

<template>
  <BartocHeader
    site-name="BARTOC.org"
    home-url="/"
    logo-url="/img/bartoc-logo-new.png"
    logo-alt="BARTOC"
    :nav-links="navLinks"
    :utility-links="utilityLinks"
    active-path="/vocabularies"
    :user-can-add="userCanAdd"
    edit-url="/edit"
  >
    <template #user-status>
      <UserStatus redirect />
    </template>
  </BartocHeader>
</template>
```

## Props

- `siteName` string, default `BARTOC.org`: fallback visible brand text and
  default logo alt text.
- `homeUrl` string, default `/`: URL for the brand link.
- `logoUrl` string, default empty: screen logo image URL. If omitted, the
  component renders `siteName` as text.
- `logoAlt` string, default empty: screen logo alt text. Falls back to
  `siteName`.
- `navLinks` array, default empty: primary navigation links.
- `utilityLinks` array, default empty: secondary navigation links such as
  Contact & Editors.
- `activePath` string, default empty: marks a link active when it matches
  `href`.
- `navLabel` string, default `Main navigation`.
- `utilityNavLabel` string, default `User navigation`.
- `userCanAdd` boolean, default `false`: shows the Add link when true.
- `editUrl` string, default `/edit`: href for the Add link.
- `addLabel` string, default `Add`.
- `printLogoUrl` string, default empty: optional print-only logo.
- `printText` string, default BARTOC register title.

## Link Objects

Navigation arrays use the shared link shape:

```js
const link = {
  href: "/vocabularies",
  label: "Terminologies",
  active: true,
  rel: "me",
  target: "_blank",
}
```

Only `href` and `label` are required. If `active` is set, it takes precedence
over `activePath`. If `target` is `_blank`, the component adds
`rel="noopener noreferrer"` unless `rel` is explicitly set.

## Slots

- `logo`: replaces the default brand link.
- `nav-left`: replaces the rendered primary navigation links.
- `nav-right`: replaces the whole right-side area.
- `user-status`: inserts host-owned login/user status UI.
- `actions`: inserts extra right-side actions after the Add link.
- `print`: custom print-only header text.

## Host Responsibilities

`BartocHeader` does not inject login state, call authorization APIs, read
`import.meta.env`, or use Vue Router. Keep those in local wrappers:

```vue
<BartocHeader
  :nav-links="navLinks"
  :utility-links="utilityLinks"
  :user-can-add="userCanAdd"
  :edit-url="editUrl"
>
  <template #user-status>
    <UserStatus redirect />
  </template>
</BartocHeader>
```

For `bartoc.org`, convert `config.menu` and `path` into `navLinks` in the host
Vue entry or wrapper:

```js
const navLinks = config.menu.map((item) => ({
  href: item.url,
  label: item.prefLabel.en,
  active: item.url === path,
}))
```

## Styling

The component is Bootstrap-free. Its default visual contract follows the
current `bartoc.org` header: primary background, 48px logo, light navigation
links, and bold active item.

`bartoc-search` can opt into its sticky behavior in its local CSS:

```css
.bartoc-header {
  position: sticky;
  top: 0;
  z-index: 100;
  margin-bottom: 0;
  box-shadow: var(--cc-shadow-sm);
}
```
