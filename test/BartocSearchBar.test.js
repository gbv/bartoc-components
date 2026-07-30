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
})
