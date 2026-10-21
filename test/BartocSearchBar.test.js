import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

import BartocSearchBar from "../src/components/BartocSearchBar.vue"

describe("BartocSearchBar", () => {
  it("emits model updates and a normalized query", async () => {
    const wrapper = mount(BartocSearchBar)

    await wrapper.get("input[type=\"search\"]").setValue("  classification  ")
    await wrapper.get("select").setValue("title_search")
    await wrapper.get("form").trigger("submit")

    expect(wrapper.emitted("update:search")).toEqual([
      ["  classification  "],
    ])
    expect(wrapper.emitted("update:field")).toEqual([["title_search"]])
    expect(wrapper.emitted("submit")).toEqual([
      [{ search: "classification", field: "title_search" }],
    ])
  })

  it("synchronizes values owned by the host", async () => {
    const wrapper = mount(BartocSearchBar, {
      props: {
        field: "title_search",
        search: "initial",
      },
    })

    await wrapper.setProps({ field: "", search: "updated" })

    expect(wrapper.get("input[type=\"search\"]").element.value).toBe("updated")
    expect(wrapper.get("select").element.value).toBe("")
  })

  it("keeps custom labels, field options, and control order", () => {
    const fields = [
      { label: "Everywhere", value: "" },
      { label: "Name", value: "name" },
    ]
    const wrapper = mount(BartocSearchBar, {
      props: {
        fields,
        formLabel: "Catalogue search",
        inputLabel: "Search the catalogue",
        fieldLabel: "Choose a field",
        submitLabel: "Find",
      },
      slots: { summary: "Search all records" },
    })
    const inputId = wrapper.get("input").attributes("id")
    const fieldId = wrapper.get("select").attributes("id")

    expect(wrapper.get("form").attributes("aria-label")).toBe("Catalogue search")
    expect(wrapper.get(`label[for='${inputId}']`).text())
      .toBe("Search the catalogue")
    expect(wrapper.get(`label[for='${fieldId}']`).text())
      .toBe("Choose a field")
    expect(wrapper.findAll("input, select, button").map((control) => control.element.tagName))
      .toEqual(["INPUT", "SELECT", "BUTTON"])
    expect(wrapper.findAll("option").map((option) => [option.text(), option.element.value]))
      .toEqual([["Everywhere", ""], ["Name", "name"]])
    expect(wrapper.get("button").text()).toBe("Find")
    expect(wrapper.get("button").classes()).toContain("cc-button-primary")
    expect(wrapper.get("button").attributes("type")).toBe("submit")
    expect(wrapper.get(".bartoc-search-bar__summary").text()).toBe("Search all records")
  })

  it("submits from the button without an empty field parameter", () => {
    const wrapper = mount(BartocSearchBar, {
      props: { search: "  topics  " },
      attachTo: document.body,
    })

    wrapper.get("button[type='submit']").element.click()

    expect(wrapper.emitted("submit")).toEqual([[{ search: "topics" }]])
    wrapper.unmount()
  })
})
