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
    logo-url="/img/bartoc-logo.svg"
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
- `navLabel` string, default `Main navigation`: accessible name of the primary nav.
- `utilityNavLabel` string, default `User navigation`: accessible name of the
  utility nav.
- `menuLabel` string, default `Menu`: label for the closed mobile toggle.
- `closeLabel` string, default `Close`: label for the open mobile toggle.
- `navigationHeading` string, default `Navigation`: mobile primary section heading.
- `accountSupportHeading` string, default `Account & Support`: mobile account
  section heading.
- `userCanAdd` boolean, default `false`: shows the Add link when true.
- `editUrl` string, default `/edit`: href for the Add link.
- `addLabel` string, default `Add`.
- `printLogoUrl` string, default empty: optional print-only logo.
- `printText` string, default BARTOC register title.

The four mobile labels default to the approved English text. To translate the
header, pass localized values alongside the navigation's accessible labels:

```vue
<BartocHeader
  :nav-links="navLinks"
  :utility-links="utilityLinks"
  menu-label="Apri menu"
  close-label="Chiudi menu"
  navigation-heading="Navigazione"
  account-support-heading="Account e supporto"
  nav-label="Navigazione principale"
  utility-nav-label="Navigazione utente"
/>
```

The host also supplies translated link labels, `addLabel`, and user status UI.

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

The component is Bootstrap-free and keeps the host-provided logo unchanged.
Pass the original BARTOC SVG through `logoUrl` or the `logo` slot. The desktop
header uses `--cc-header-background`, stays about 64px tall, and keeps the
navigation on one row. The active link has a thin underline.

Header measurements use the shared border, line height, touch target, and
transition tokens listed in the README. Header-specific tokens are:

| Token | Default | Use |
| --- | --- | --- |
| `--cc-header-background` | `--cc-color-primary` | Header background. |
| `--cc-header-color` | `--cc-color-on-primary` | Header text and icon color. |
| `--cc-header-logo-height` | `--cc-space-xxl` | Screen and print logo height. |
| `--cc-header-mobile-logo-max-width` | `50vw` | Mobile logo width limit. |
| `--cc-header-separator-opacity` | `0.35` | Desktop logo separator opacity. |
| `--cc-header-menu-icon-offset` | `--cc-space-xs` + `--cc-border-width-strong` | Aligns the bars when they form a Close icon. |
| `--cc-header-panel-z-index` | `10` | Mobile panel stacking level. |

The `75rem` breakpoint stays in the media query because CSS custom properties
do not work there.

At viewport widths of 75rem or less, the header shows a Menu button. The
button opens a white panel over the page without moving its content. The panel
has Navigation and Account & Support sections by default, each shown only when
it has content. The panel uses a brief entrance animation and respects reduced
motion preferences. The active link uses
`--cc-color-accent`. The same navigation and account slots are used in both
layouts, so host-owned login/logout and authorization
remain live. Tab reaches the panel controls; Escape closes the panel and
returns focus to the Menu button. The button exposes `aria-expanded` and
`aria-controls`, and active links retain `aria-current="page"`.

The print-only logo and text remain separate from the screen header.
