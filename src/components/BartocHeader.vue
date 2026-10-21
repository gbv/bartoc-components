<template>
  <header
    class="bartoc-header"
    @keydown.esc="handleEscape">
    <div class="app-container bartoc-header__container noprint">
      <div class="bartoc-header__brand">
        <slot name="logo">
          <a
            class="bartoc-header__logo-link"
            :href="homeUrl">
            <img
              v-if="logoUrl"
              :src="logoUrl"
              :alt="logoAltText"
              class="bartoc-header__logo-image">
            <span v-else>{{ siteName }}</span>
          </a>
        </slot>
      </div>

      <button
        v-if="hasNavigation"
        ref="menuButton"
        class="bartoc-header__menu-button"
        type="button"
        :aria-controls="menuId"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen">
        <span
          class="bartoc-header__menu-icon"
          :class="{ 'bartoc-header__menu-icon--open': menuOpen }"
          aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        {{ menuOpen ? closeLabel : menuLabel }}
      </button>

      <div
        v-if="hasNavigation"
        :id="menuId"
        class="bartoc-header__nav"
        :class="{ 'bartoc-header__nav--open': menuOpen }">
        <nav
          v-if="hasPrimaryNavigation"
          class="bartoc-header__nav-left"
          :aria-label="navLabel">
          <h2 class="bartoc-header__section-title">
            {{ navigationHeading }}
          </h2>
          <slot name="nav-left">
            <ul class="bartoc-header__nav-list">
              <li
                v-for="link in navLinks"
                :key="linkKey(link)">
                <a
                  :class="linkClass(link)"
                  :href="link.href"
                  :target="link.target"
                  :rel="linkRel(link)"
                  :aria-current="ariaCurrent(link)">
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </slot>
        </nav>

        <div
          v-if="hasAccountSupport"
          class="bartoc-header__nav-right">
          <h2 class="bartoc-header__section-title">
            {{ accountSupportHeading }}
          </h2>
          <slot name="nav-right">
            <nav
              v-if="utilityLinks.length"
              :aria-label="utilityNavLabel">
              <ul class="bartoc-header__nav-list">
                <li
                  v-for="link in utilityLinks"
                  :key="linkKey(link)">
                  <a
                    :class="linkClass(link)"
                    :href="link.href"
                    :target="link.target"
                    :rel="linkRel(link)"
                    :aria-current="ariaCurrent(link)">
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </nav>

            <div
              v-if="$slots['user-status']"
              class="bartoc-header__user-status">
              <slot name="user-status" />
            </div>

            <a
              v-if="userCanAdd"
              class="cc-button cc-button-on-primary cc-button-sm bartoc-header__add-link"
              :href="editUrl">
              {{ addLabel }}
            </a>

            <slot name="actions" />
          </slot>
        </div>
      </div>
    </div>

    <div
      class="bartoc-header__print printonly"
      aria-hidden="true">
      <img
        v-if="printLogoUrl"
        :src="printLogoUrl"
        alt=""
        class="bartoc-header__print-logo">
      <slot name="print">
        {{ printText }}
      </slot>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, useId, useSlots } from "vue"

// The host provides links, active state, and add permissions; this component
// only presents them in the desktop and mobile layouts.
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
  menuLabel: {
    type: String,
    default: "Menu",
  },
  closeLabel: {
    type: String,
    default: "Close",
  },
  navigationHeading: {
    type: String,
    default: "Navigation",
  },
  accountSupportHeading: {
    type: String,
    default: "Account & Support",
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
const slots = useSlots()
// Host applications can supply either section through slots instead of props.
const hasPrimaryNavigation = computed(() => Boolean(
  props.navLinks.length || slots["nav-left"],
))
const hasAccountSupport = computed(() => Boolean(
  props.utilityLinks.length ||
  props.userCanAdd ||
  slots["nav-right"] ||
  slots["user-status"] ||
  slots.actions,
))
// Show the mobile toggle only when at least one section has content.
const hasNavigation = computed(() =>
  hasPrimaryNavigation.value || hasAccountSupport.value,
)

// The generated ID connects the toggle to its panel without colliding with
// another BartocHeader instance on the same page.
const menuId = useId()
const menuOpen = ref(false)
const menuButton = ref(null)

function handleEscape(event) {
  // Leave Escape handling to a nested control if it already used the key.
  if (!menuOpen.value || event.defaultPrevented) {
    return
  }

  event.preventDefault()
  menuOpen.value = false
  // Return keyboard users to the control that opened the menu.
  menuButton.value?.focus()
}

function linkKey(link) {
  return `${link.label}-${link.href}`
}

function linkRel(link) {
  if (link.rel) {
    return link.rel
  }

  // Protect links that open a new browsing context unless the host sets rel.
  return link.target === "_blank" ? "noopener noreferrer" : undefined
}

function isActiveLink(link) {
  // An explicit active flag takes precedence over the exact path comparison.
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
  // Use the same active check for the visible style and assistive technology.
  return isActiveLink(link) ? "page" : undefined
}
</script>
