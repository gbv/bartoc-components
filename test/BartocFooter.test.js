import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

import BartocFooter from "../src/components/BartocFooter.vue"

describe("BartocFooter", () => {
  it("renders internal and external links", () => {
    const wrapper = mount(BartocFooter, {
      props: {
        internalLinks: [
          { href: "/api", label: "API" },
          { href: "/download", label: "download" },
        ],
        externalLinks: [
          {
            href: "https://example.org",
            label: "Example",
            target: "_blank",
          },
        ],
      },
    })

    const globalLinks = wrapper.findAll(".bartoc-footer__global-links a")

    expect(globalLinks.map((link) => link.text())).toEqual([
      "API",
      "download",
      "Example",
    ])
    expect(globalLinks.at(-1).attributes("rel")).toBe("noopener noreferrer")
  })

  it("uses the download link in the legal notice", () => {
    const wrapper = mount(BartocFooter, {
      props: {
        internalLinks: [{ href: "/download", label: "download" }],
      },
    })

    const legalLink = wrapper.get(".bartoc-footer__legal a")

    expect(legalLink.text()).toBe("made available")
    expect(legalLink.attributes("href")).toBe("/download")
  })

  it("renders plain legal text without a download link", () => {
    const wrapper = mount(BartocFooter)

    expect(wrapper.get(".bartoc-footer__legal").text()).toContain(
      "metadata is made available under the PDDL 1.0",
    )
    expect(wrapper.findAll(".bartoc-footer__legal a")).toHaveLength(1)
  })
})
