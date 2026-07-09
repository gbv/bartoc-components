<template>
  <header class="bartoc-header">
    <div class="app-container bartoc-header__container noprint">
      <div>
        <slot name="logo">
          <a class="bartoc-header__logo-link" :href="homeUrl">
            <img
              v-if="logoUrl"
              :src="logoUrl"
              :alt="logoAltText"
              class="bartoc-header__logo-image"
            >
            <span v-else>{{ siteName }}</span>
          </a>
        </slot>
      </div>

      <div class="bartoc-header__nav">
        <nav
          v-if="navLinks.length || $slots['nav-left']"
          class="bartoc-header__nav-left"
          :aria-label="navLabel"
        >
          <slot name="nav-left">
            <ul class="bartoc-header__nav-list">
              <li v-for="link in navLinks" :key="linkKey(link)">
                <a
                  :class="linkClass(link)"
                  :href="link.href"
                  :target="link.target"
                  :rel="linkRel(link)"
                  :aria-current="ariaCurrent(link)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </slot>
        </nav>

        <div
          v-if="
            utilityLinks.length ||
            userCanAdd ||
            $slots['nav-right'] ||
            $slots['user-status'] ||
            $slots.actions
          "
          class="bartoc-header__nav-right"
        >
          <slot name="nav-right">
            <nav v-if="utilityLinks.length" :aria-label="utilityNavLabel">
              <ul class="bartoc-header__nav-list">
                <li v-for="link in utilityLinks" :key="linkKey(link)">
                  <a
                    :class="linkClass(link)"
                    :href="link.href"
                    :target="link.target"
                    :rel="linkRel(link)"
                    :aria-current="ariaCurrent(link)"
                  >
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </nav>

            <div v-if="$slots['user-status']" class="bartoc-header__user-status">
              <slot name="user-status"></slot>
            </div>

            <a
              v-if="userCanAdd"
              class="cc-button cc-button-on-primary cc-button-sm"
              :href="editUrl"
            >
              {{ addLabel }}
            </a>

            <slot name="actions"></slot>
          </slot>
        </div>
      </div>
    </div>

    <div class="bartoc-header__print printonly" aria-hidden="true">
      <img
        v-if="printLogoUrl"
        :src="printLogoUrl"
        alt=""
        class="bartoc-header__print-logo"
      >
      <slot name="print">{{ printText }}</slot>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  siteName: {
    type: String,
    default: "BARTOC.org",
  },
  homeUrl: {
    type: String,
    default: "/",
  },
  logoUrl: {
    type: String,
    default: "",
  },
  logoAlt: {
    type: String,
    default: "",
  },
  navLinks: {
    type: Array,
    default: () => [],
  },
  utilityLinks: {
    type: Array,
    default: () => [],
  },
  activePath: {
    type: String,
    default: "",
  },
  navLabel: {
    type: String,
    default: "Main navigation",
  },
  utilityNavLabel: {
    type: String,
    default: "User navigation",
  },
  userCanAdd: {
    type: Boolean,
    default: false,
  },
  editUrl: {
    type: String,
    default: "/edit",
  },
  addLabel: {
    type: String,
    default: "Add",
  },
  printLogoUrl: {
    type: String,
    default: "",
  },
  printText: {
    type: String,
    default:
      "Basic Register of Thesauri, Ontologies & Classifications (BARTOC.org)",
  },
})

const logoAltText = computed(() => props.logoAlt || props.siteName)

function linkKey(link) {
  return `${link.label}-${link.href}`
}

function linkRel(link) {
  if (link.rel) {
    return link.rel
  }

  return link.target === "_blank" ? "noopener noreferrer" : undefined
}

function isActiveLink(link) {
  if (typeof link.active === "boolean") {
    return link.active
  }

  return Boolean(props.activePath && link.href === props.activePath)
}

function linkClass(link) {
  return [
    "bartoc-header__nav-link",
    { "bartoc-header__nav-link--active": isActiveLink(link) },
  ]
}

function ariaCurrent(link) {
  return isActiveLink(link) ? "page" : undefined
}
</script>
