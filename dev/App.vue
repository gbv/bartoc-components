<template>
  <div class="demo-app">
    <BartocHeader
      site-name="BARTOC.org"
      home-url="/"
      :logo-url="demoLogoUrl"
      logo-alt="BARTOC"
      :print-logo-url="demoPrintLogoUrl"
      :nav-links="headerNavLinks"
      :utility-links="headerUtilityLinks"
      :active-path="activePath"
      :user-can-add="true"
      edit-url="/edit"
      add-label="add"
    >
      <template #user-status>
        <a href="/login">Login</a>
      </template>
    </BartocHeader>

    <main class="app-container demo-main">
      <section class="demo-search">
        <BartocSearchBar />
      </section>
    </main>

    <BartocFooter
      api-url="/api/"
      download-url="/download"
      :external-links="footerExternalLinks"
      :resource-format-links="footerResourceFormatLinks"
      :search-status-links="footerSearchStatusLinks"
    >
      <template #search-status>
        search in <b>123</b> terminologies
        (as of <b>2026-07-06</b>, live updates <b>enabled</b>)
      </template>
    </BartocFooter>
  </div>
</template>

<script setup>
import { BartocFooter, BartocHeader, BartocSearchBar } from "../src/index.js"
import demoLogoUrl from "./assets/bartoc-logo-new.png"

const demoPrintLogoUrl = svgDataUrl(`
<svg xmlns="http://www.w3.org/2000/svg" width="250" height="72" viewBox="0 0 250 72">
  <text x="0" y="51" fill="#212121" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="700">BARTOC</text>
</svg>
`)

const headerNavLinks = [
  { href: "/about", label: "About" },
  { href: "/vocabularies", label: "Terminologies" },
  { href: "/registries", label: "Registries" },
  { href: "/software", label: "Software" },
  { href: "/stats", label: "Statistics" },
]

const headerUtilityLinks = [{ href: "/contact", label: "Contact & Editors" }]

const activePath = window.location.pathname

const footerExternalLinks = [
  { href: "https://code4lib.social/@bartoc", label: "Mastodon", rel: "me" },
  { href: "https://github.com/gbv/bartoc.org", label: "sources" },
  { href: "https://github.com/gbv/bartoc.org/issues", label: "issues" },
]

const footerResourceFormatLinks = [
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

const footerSearchStatusLinks = [
  { href: "/api/status", label: "Search API" },
  { href: "https://github.com/gbv/bartoc-search", label: "sources" },
]

function svgDataUrl(svg) {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}
</script>

<style scoped>
:global(body) {
  margin: 0;
  background: var(--cc-color-page);
  color: var(--cc-color-text);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.demo-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.demo-main {
  display: flex;
  align-items: center;
  flex: 1 0 auto;
  justify-content: center;
  padding-block: var(--cc-space-xl);
}

.demo-search {
  width: min(100%, 48rem);
  text-align: center;
}
</style>
