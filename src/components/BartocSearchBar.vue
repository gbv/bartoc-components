<template>
  <div class="bartoc-search-bar">
    <!-- Host applications can use this for page context such as result counts. -->
    <div v-if="$slots.summary" class="bartoc-search-bar__summary">
      <slot name="summary"></slot>
    </div>

    <form
      class="bartoc-search-bar__form"
      :aria-label="formLabel"
      @submit.prevent="submitSearch"
    >
      <div class="bartoc-search-bar__controls">
        <label class="cc-visually-hidden" :for="searchInputId">
          {{ inputLabel }}
        </label>
        <input
          :id="searchInputId"
          :value="searchValue"
          type="search"
          class="cc-form-control bartoc-search-bar__input"
          :placeholder="placeholder"
          @input="updateSearch"
        >

        <label class="cc-visually-hidden" :for="fieldInputId">
          {{ fieldLabel }}
        </label>
        <select
          :id="fieldInputId"
          :value="fieldValue"
          class="cc-form-control bartoc-search-bar__field"
          @change="updateField"
        >
          <option
            v-for="searchField in fields"
            :key="`${searchField.value}-${searchField.label}`"
            :value="searchField.value"
          >
            {{ searchField.label }}
          </option>
        </select>

        <button
          type="submit"
          class="cc-button cc-button-primary bartoc-search-bar__submit noprint"
        >
          {{ submitLabel }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, useId, watch } from "vue"

const props = defineProps({
  search: {
    type: String,
    default: "",
  },
  field: {
    type: String,
    default: "",
  },
  fields: {
    type: Array,
    default: () => [
      { label: "All fields", value: "" },
      { label: "Title", value: "title_search" },
      { label: "Publisher", value: "publisher_en" },
      { label: "Subject notation", value: "subject_notation" },
      { label: "Subject URI", value: "subject_uri" },
    ],
  },
  placeholder: {
    type: String,
    default: "Search terminology...",
  },
  submitLabel: {
    type: String,
    default: "Search",
  },
  formLabel: {
    type: String,
    default: "Terminology search",
  },
  inputLabel: {
    type: String,
    default: "Search terminology",
  },
  fieldLabel: {
    type: String,
    default: "Search field",
  },
})

const emit = defineEmits(["submit", "update:search", "update:field"])

const searchValue = ref(props.search || "")
const fieldValue = ref(props.field || "")
const componentId = useId()
const searchInputId = `bartoc-search-bar-search-${componentId}`
const fieldInputId = `bartoc-search-bar-field-${componentId}`

// Keep local input state in sync with host-owned values such as route queries.
watch(
  () => props.search,
  (value) => {
    if (value !== searchValue.value) {
      searchValue.value = value || ""
    }
  },
)

watch(
  () => props.field,
  (value) => {
    if (value !== fieldValue.value) {
      fieldValue.value = value || ""
    }
  },
)

function updateSearch(event) {
  searchValue.value = event.target.value
  emit("update:search", searchValue.value)
}

function updateField(event) {
  fieldValue.value = event.target.value
  emit("update:field", fieldValue.value)
}

function submitSearch() {
  const query = { search: searchValue.value.trim() }

  if (fieldValue.value) {
    query.field = fieldValue.value
  }

  // Navigation, search limits, and URI lookup stay in the host application.
  emit("submit", query)
}
</script>
