<script setup>
import { computed } from "vue"

const props = defineProps({
  externalLinks: {
    type: Array,
    default: () => [],
  },
  resourceFormatLinks: {
    type: Array,
    default: () => [],
  },
  searchStatusLinks: {
    type: Array,
    default: () => [],
  },
  searchStatus: {
    type: String,
    default: "",
  },
  siteName: {
    type: String,
    default: "BARTOC.org",
  },
  apiUrl: {
    type: String,
    default: "",
  },
  apiLabel: {
    type: String,
    default: "API",
  },
  downloadUrl: {
    type: String,
    default: "",
  },
  downloadLabel: {
    type: String,
    default: "download",
  },
  licenseLabel: {
    type: String,
    default: "PDDL 1.0",
  },
  licenseUrl: {
    type: String,
    default: "http://www.opendatacommons.org/licenses/pddl/1.0/",
  },
  printText: {
    type: String,
    default: "",
  },
})

const defaultPrintText = computed(() =>
  `${props.siteName} vocabulary metadata is made available under the ${props.licenseLabel}.`
)

const globalLinks = computed(() => [
  ...(props.apiUrl ? [{ label: props.apiLabel, href: props.apiUrl }] : []),
  ...(props.downloadUrl
    ? [{ label: props.downloadLabel, href: props.downloadUrl }]
    : []),
  ...props.externalLinks,
])

function linkRel(link) {
  if (link.rel) {
    return link.rel
  }

  return link.target === "_blank" ? "noopener noreferrer" : undefined
}

function linkKey(link) {
  return `${link.label}-${link.href}`
}
</script>

<template>
  <footer class="bartoc-footer">
    <div class="bartoc-footer__screen noprint">
      <div class="app-container bartoc-footer__inner">
        <div
          v-if="
            searchStatus ||
            searchStatusLinks.length ||
            $slots['search-status'] ||
            $slots['search-status-links']
          "
          class="bartoc-footer__row"
        >
          <p
            v-if="searchStatus || $slots['search-status']"
            class="bartoc-footer__search-status"
          >
            <slot name="search-status">{{ searchStatus }}</slot>
          </p>

          <nav
            v-if="searchStatusLinks.length || $slots['search-status-links']"
            class="bartoc-footer__search-status-links"
            aria-label="Search status links"
          >
            <slot name="search-status-links">
              <ul class="bartoc-footer__link-list">
                <li
                  v-for="link in searchStatusLinks"
                  :key="linkKey(link)"
                  class="bartoc-footer__link-item"
                >
                  <a
                    class="bartoc-footer__link"
                    :href="link.href"
                    :target="link.target"
                    :rel="linkRel(link)"
                  >
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </slot>
          </nav>
        </div>

        <div class="bartoc-footer__row">
          <p class="bartoc-footer__legal">
            <slot name="legal">
              <span>{{ siteName }} vocabulary metadata is </span>
              <a v-if="downloadUrl" :href="downloadUrl">made available</a>
              <span v-else>made available</span>
              <span> under the </span>
              <a :href="licenseUrl">{{ licenseLabel }}</a>
            </slot>
          </p>
        </div>

        <div
          v-if="resourceFormatLinks.length || $slots['resource-format-links']"
          class="bartoc-footer__row"
        >
          <nav
            class="bartoc-footer__resource-format-links"
            aria-label="Resource formats"
          >
            <slot name="resource-format-links">
              <ul class="bartoc-footer__link-list">
                <li
                  v-for="link in resourceFormatLinks"
                  :key="linkKey(link)"
                  class="bartoc-footer__link-item"
                >
                  <a
                    class="bartoc-footer__link"
                    :href="link.href"
                    :target="link.target"
                    :rel="linkRel(link)"
                  >
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </slot>
          </nav>
        </div>

        <div
          v-if="globalLinks.length || $slots['global-links']"
          class="bartoc-footer__row"
        >
          <nav class="bartoc-footer__global-links" aria-label="Footer">
            <slot name="global-links">
              <ul class="bartoc-footer__link-list">
                <li
                  v-for="link in globalLinks"
                  :key="linkKey(link)"
                  class="bartoc-footer__link-item"
                >
                  <a
                    class="bartoc-footer__link"
                    :href="link.href"
                    :target="link.target"
                    :rel="linkRel(link)"
                  >
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </slot>
          </nav>
        </div>
      </div>
    </div>

    <p class="bartoc-footer__print printonly">
      <slot name="print">{{ printText || defaultPrintText }}</slot>
    </p>
  </footer>
</template>
