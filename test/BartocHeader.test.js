import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

import BartocHeader from "../src/components/BartocHeader.vue"

describe("BartocHeader", () => {
  it("marks the active navigation link", () => {
    const wrapper = mount(BartocHeader, {
      props: {
        activePath: "/registries",
        navLinks: [
          { href: "/vocabularies", label: "Terminologies" },
          { href: "/registries", label: "Registries" },
        ],
      },
    })

    const links = wrapper.findAll(".bartoc-header__nav-link")

    expect(links[0].attributes("aria-current")).toBeUndefined()
    expect(links[1].classes()).toContain("bartoc-header__nav-link--active")
    expect(links[1].attributes("aria-current")).toBe("page")
  })

  it("secures links that open a new tab", () => {
    const wrapper = mount(BartocHeader, {
      props: {
        navLinks: [
          {
            href: "https://example.org",
            label: "Example",
            target: "_blank",
          },
        ],
      },
    })

    expect(wrapper.get(".bartoc-header__nav-link").attributes("rel")).toBe(
      "noopener noreferrer",
    )
  })
})
