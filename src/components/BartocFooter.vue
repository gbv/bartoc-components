<script setup>
import { computed } from "vue"

const props = defineProps({
  internalLinks: {
    type: Array,
    default: () => [],
  },
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
  `${props.siteName} vocabulary metadata is made available under the ${props.licenseLabel}.`,
)

const linkGroups = computed(() => [
  { label: "Data & tools", links: props.internalLinks },
  { label: "Information & community", links: props.externalLinks },
].filter((group) => group.links.length))

const downloadLink = computed(() =>
  props.internalLinks.find((link) => String(link.label).toLowerCase() === "download"),
)

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
        <div class="bartoc-footer__main">
          <div class="bartoc-footer__branding">
            <p class="bartoc-footer__brand">
              {{ siteName }}
            </p>
            <p
              v-if="$slots['site-description']"
              class="bartoc-footer__description">
              <slot name="site-description" />
            </p>
          </div>

          <nav
            v-if="$slots['global-links']"
            class="bartoc-footer__global-links"
            aria-label="Footer">
            <slot name="global-links" />
          </nav>

          <template v-else>
            <nav
              v-for="group in linkGroups"
              :key="group.label"
              class="bartoc-footer__global-links"
              :aria-label="group.label">
              <h2 class="bartoc-footer__heading">
                {{ group.label }}
              </h2>
              <ul class="bartoc-footer__link-list">
                <li
                  v-for="link in group.links"
                  :key="linkKey(link)"
                  class="bartoc-footer__link-item">
                  <a
                    class="bartoc-footer__link"
                    :href="link.href"
                    :target="link.target"
                    :rel="linkRel(link)">
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </nav>
          </template>

          <div
            v-if="
              searchStatus ||
                searchStatusLinks.length ||
                resourceFormatLinks.length ||
                $slots['search-status'] ||
                $slots['search-status-links'] ||
                $slots['resource-format-links']
            "
            class="bartoc-footer__context">
            <section
              v-if="
                searchStatus ||
                  searchStatusLinks.length ||
                  $slots['search-status'] ||
                  $slots['search-status-links']
              "
              class="bartoc-footer__search">
              <h2 class="bartoc-footer__heading">
                Search index
              </h2>
              <p
                v-if="searchStatus || $slots['search-status']"
                class="bartoc-footer__search-status">
                <slot name="search-status">
                  {{ searchStatus }}
                </slot>
              </p>

              <nav
                v-if="searchStatusLinks.length || $slots['search-status-links']"
                class="bartoc-footer__search-status-links"
                aria-label="Search status links">
                <slot name="search-status-links">
                  <ul class="bartoc-footer__link-list">
                    <li
                      v-for="link in searchStatusLinks"
                      :key="linkKey(link)"
                      class="bartoc-footer__link-item">
                      <a
                        class="bartoc-footer__link"
                        :href="link.href"
                        :target="link.target"
                        :rel="linkRel(link)">
                        {{ link.label }}
                      </a>
                    </li>
                  </ul>
                </slot>
              </nav>
            </section>

            <nav
              v-if="resourceFormatLinks.length || $slots['resource-format-links']"
              class="bartoc-footer__resource-format-links"
              aria-label="Resource formats">
              <h2 class="bartoc-footer__heading">
                Resource formats
              </h2>
              <slot name="resource-format-links">
                <ul class="bartoc-footer__link-list">
                  <li
                    v-for="link in resourceFormatLinks"
                    :key="linkKey(link)"
                    class="bartoc-footer__link-item">
                    <a
                      class="bartoc-footer__link"
                      :href="link.href"
                      :target="link.target"
                      :rel="linkRel(link)">
                      {{ link.label }}
                    </a>
                  </li>
                </ul>
              </slot>
            </nav>
          </div>
        </div>

        <p class="bartoc-footer__legal">
          <slot name="legal">
            <span>{{ siteName }} vocabulary metadata is </span>
            <a
              v-if="downloadLink"
              :href="downloadLink.href">made available</a>
            <span v-else>made available</span>
            <span> under the </span>
            <a :href="licenseUrl">{{ licenseLabel }}</a>
          </slot>
        </p>
      </div>
    </div>

    <p class="bartoc-footer__print printonly">
      <slot name="print">
        {{ printText || defaultPrintText }}
      </slot>
    </p>
  </footer>
</template>
