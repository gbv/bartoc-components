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
      add-label="add">
      <template #user-status>
        <a href="/login">Login</a>
      </template>
    </BartocHeader>

    <main class="app-container demo-main">
      <section class="demo-search">
        <BartocSearchBar />
      </section>

      <section
        class="demo-tables"
        aria-labelledby="demo-tables-title">
        <h1 id="demo-tables-title">
          Shared table styles
        </h1>

        <div class="demo-table-grid">
          <article class="demo-table-card">
            <table class="cc-table">
              <caption>Base: borderless metadata</caption>
              <tbody>
                <tr>
                  <th scope="row">
                    Preferred label
                  </th>
                  <td>Art &amp; architecture thesaurus</td>
                </tr>
                <tr>
                  <th scope="row">
                    Languages
                  </th>
                  <td>English, Spanish</td>
                </tr>
              </tbody>
            </table>
          </article>

          <article class="demo-table-card">
            <table class="cc-table cc-table--compact">
              <caption>Compact: dense editor rows</caption>
              <thead>
                <tr>
                  <th scope="col">
                    Field
                  </th>
                  <th scope="col">
                    Value
                  </th>
                  <th scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    Identifier
                  </th>
                  <td>AAT</td>
                  <td>
                    <button
                      class="cc-button cc-button-secondary cc-button-sm"
                      type="button">
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    Status
                  </th>
                  <td>Active</td>
                  <td>
                    <button
                      class="cc-button cc-button-secondary cc-button-sm"
                      type="button">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </article>

          <article class="demo-table-card">
            <table class="cc-table cc-table--divided">
              <caption>Divided: metadata with row separators</caption>
              <thead>
                <tr>
                  <th scope="col">
                    Property
                  </th>
                  <th scope="col">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    Publisher
                  </th>
                  <td>Getty Research Institute</td>
                </tr>
                <tr>
                  <th scope="row">
                    License
                  </th>
                  <td>Open Data Commons Attribution License</td>
                </tr>
              </tbody>
            </table>
          </article>

          <article class="demo-table-card">
            <table class="cc-table cc-table--hover">
              <caption>Hover: borderless registry results</caption>
              <thead>
                <tr>
                  <th scope="col">
                    Registry
                  </th>
                  <th scope="col">
                    Terminologies
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    BARTOC
                  </th>
                  <td>3,200</td>
                </tr>
                <tr>
                  <th scope="row">
                    Wikidata
                  </th>
                  <td>540</td>
                </tr>
              </tbody>
            </table>
          </article>
        </div>
      </section>
    </main>

    <BartocFooter
      :external-links="footerExternalLinks"
      :internal-links="footerInternalLinks"
      :resource-format-links="footerResourceFormatLinks"
      :search-status-links="footerSearchStatusLinks">
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

const footerInternalLinks = [
  { href: "/api", label: "API" },
  { href: "/download", label: "download" },
  { href: "/sparql", label: "SPARQL" },
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
  flex-direction: column;
  gap: var(--cc-space-xl);
  justify-content: center;
  padding-block: var(--cc-space-xl);
}

.demo-search {
  width: min(100%, 48rem);
  text-align: center;
}

.demo-tables {
  width: 100%;
}

.demo-tables h1 {
  margin-top: 0;
  text-align: center;
}

.demo-table-grid {
  display: grid;
  gap: var(--cc-space-md);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 28rem), 1fr));
}

.demo-table-card {
  min-width: 0;
  padding: var(--cc-space-md);
  overflow-x: auto;
  border: 1px solid var(--cc-border-color);
  border-radius: var(--cc-radius-md);
  background: var(--cc-color-surface);
}

.demo-table-card caption {
  margin-bottom: var(--cc-space-sm);
  font-weight: var(--cc-font-weight-bold);
  text-align: start;
}

.demo-table-card .cc-table {
  margin-bottom: 0;
}
</style>
