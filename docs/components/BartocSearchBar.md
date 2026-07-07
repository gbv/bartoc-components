# BartocSearchBar

Shared BARTOC terminology search form for Vue applications.

The component owns form presentation and normalized submit events only. Host
applications still own routing, URL construction, API calls, search limits,
lookup URI behavior, and any project-specific query synchronization.

## Basic Usage

```vue
<script setup>
import { ref } from "vue"
import { BartocSearchBar } from "@gbv/bartoc-components"

import "@gbv/bartoc-components/style.css"

const search = ref("")
const field = ref("")

function submitSearch(query) {
  // Host application decides whether to push a route or navigate.
}
</script>

<template>
  <BartocSearchBar
    v-model:search="search"
    v-model:field="field"
    @submit="submitSearch"
  />
</template>
```

## Props

- `search` string, default empty: current search text.
- `field` string, default empty: current selected field.
- `fields` array, default BARTOC search fields: select options using
  `{ label, value }` objects.
- `placeholder` string, default `Search terminology...`.
- `submitLabel` string, default `Search`.
- `formLabel` string, default `Terminology search`: accessible form label.
- `inputLabel` string, default `Search terminology`: visually hidden input
  label.
- `fieldLabel` string, default `Search field`: visually hidden select label.

## Events

- `update:search`: emitted with the current input text.
- `update:field`: emitted with the current selected field.
- `submit`: emitted with a query object. `search` is trimmed. `field` is only
  included when it has a value.

```js
{ search: "classification", field: "title_search" }
{ search: "classification" }
```

## Default Fields

```js
const fields = [
  { label: "All fields", value: "" },
  { label: "Title", value: "title_search" },
  { label: "Publisher", value: "publisher_en" },
  { label: "Subject notation", value: "subject_notation" },
  { label: "Subject URI", value: "subject_uri" },
]
```

`bartoc.org` can pass a legacy all-fields value if it still needs
`field=allfields` in generated URLs:

```js
const fields = [
  { label: "All Fields", value: "allfields" },
  { label: "Title", value: "title_search" },
]
```

## Slots

- `summary`: optional content above the search controls. Use this for
  app-specific context such as the bartoc.org terminology count.

```vue
<BartocSearchBar>
  <template #summary>
    Search in metadata about <span>123</span> terminologies
  </template>
</BartocSearchBar>
```