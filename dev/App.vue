<script setup>
import { BartocFooter } from "../src/index.js"

const externalLinks = [
  { href: "https://code4lib.social/@bartoc", label: "Mastodon", rel: "me" },
  { href: "https://github.com/gbv/bartoc.org", label: "sources" },
  { href: "https://github.com/gbv/bartoc.org/issues", label: "issues" },
]

const resourceFormatLinks = [
  {
    href: "/api/data?uri=https%3A%2F%2Fbartoc.org%2Fen%2Fnode%2F18785",
    label: "JSON",
  },
  {
    href: "/vocabularies?uri=https%3A%2F%2Fbartoc.org%2Fen%2Fnode%2F18785&format=nt",
    label: "RDF",
  },
  {
    href: "/vocabularies?uri=https%3A%2F%2Fbartoc.org%2Fen%2Fnode%2F18785&format=rdfxml",
    label: "XML",
  },
]

const searchStatusLinks = [
  { href: "/api/status", label: "Search API" },
  { href: "https://github.com/gbv/bartoc-search", label: "sources" },
]
</script>

<template>
  <div class="demo-app">
    <main class="app-container demo-main">
      <h1>BARTOC footer</h1>
    </main>

    <BartocFooter
      api-url="/api/"
      download-url="/download"
      :external-links="externalLinks"
      :resource-format-links="resourceFormatLinks"
      :search-status-links="searchStatusLinks"
    >
      <template #search-status>
        search in <b>123</b> terminologies
        (as of <b>2026-07-06</b>, live updates <b>enabled</b>)
      </template>
    </BartocFooter>
  </div>
</template>

<style scoped>
:global(body) {
  margin: 0;
  background: var(--cc-color-page);
  color: var(--cc-color-text);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.demo-app {
  display: grid;
  min-height: 100vh;
  grid-template-rows: 1fr auto;
}

.demo-main {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: var(--cc-space-xl);
}

.demo-main h1 {
  margin: 0;
  color: var(--cc-color-muted);
  font-size: 1.5rem;
  font-weight: var(--cc-font-weight-regular);
  line-height: 1.2;
}
</style>
