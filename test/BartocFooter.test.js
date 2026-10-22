import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"

import BartocFooter from "../src/components/BartocFooter.vue"

describe("BartocFooter", () => {
  it("groups internal and external links under visible navigation headings", () => {
    const externalLinks = [
      { href: "https://www.gbv.de/impressum", label: "Imprint" },
      { href: "https://www.gbv.de/datenschutz", label: "Privacy Policy" },
      { href: "https://code4lib.social/@bartoc", label: "Mastodon", rel: "me" },
      { href: "https://github.com/gbv/bartoc.org", label: "BARTOC sources", target: "_blank" },
      { href: "https://github.com/gbv/bartoc.org/issues", label: "issues" },
    ]
    const wrapper = mount(BartocFooter, {
      props: {
        siteName: "BARTOC.org (dev)",
        internalLinks: [
          { href: "/api", label: "API" },
          { href: "/download", label: "download" },
        ],
        externalLinks,
      },
    })

    const internal = wrapper.get("nav[aria-label=\"Data & tools\"]")
    const external = wrapper.get("nav[aria-label=\"Information & community\"]")

    expect(wrapper.get(".bartoc-footer__brand").text()).toBe("BARTOC.org (dev)")
    expect(internal.get("h2").text()).toBe("Data & tools")
    expect(external.get("h2").text()).toBe("Information & community")
    expect(internal.findAll("a").map((link) => link.text())).toEqual(["API", "download"])
    expect(external.findAll("a").map((link) => ({ href: link.attributes("href"), label: link.text() }))).toEqual(
      externalLinks.map(({ href, label }) => ({ href, label })),
    )
    expect(external.get("a[rel=\"me\"]").text()).toBe("Mastodon")
    expect(external.get("a[target=\"_blank\"]").attributes("rel")).toBe("noopener noreferrer")
    expect(wrapper.find(".bartoc-footer__context").exists()).toBe(false)
    expect(wrapper.find(".bartoc-footer__main .bartoc-footer__legal").exists()).toBe(false)
  })

  it.each([
    ["internalLinks", "Data & tools"],
    ["externalLinks", "Information & community"],
  ])("omits empty groups when only %s are supplied", (prop, heading) => {
    const wrapper = mount(BartocFooter, {
      props: { [prop]: [{ href: "/example", label: "Example" }] },
    })

    expect(wrapper.findAll("nav")).toHaveLength(1)
    expect(wrapper.get("nav").attributes("aria-label")).toBe(heading)
    expect(wrapper.find(".bartoc-footer__context").exists()).toBe(false)
  })

  it("omits all optional sections when no links or context are supplied", () => {
    const wrapper = mount(BartocFooter)

    expect(wrapper.find("nav").exists()).toBe(false)
    expect(wrapper.find(".bartoc-footer__context").exists()).toBe(false)
    expect(wrapper.find(".bartoc-footer__description").exists()).toBe(false)
  })

  it("renders an optional site description within the branding column", () => {
    const wrapper = mount(BartocFooter, {
      slots: { "site-description": "Basic Register of Thesauri, Ontologies &amp; Classifications" },
    })

    expect(wrapper.get(".bartoc-footer__branding .bartoc-footer__description").text()).toBe(
      "Basic Register of Thesauri, Ontologies & Classifications",
    )
    expect(wrapper.get(".bartoc-footer__branding .bartoc-footer__brand").text()).toBe("BARTOC.org")
    expect(wrapper.get(".bartoc-footer__print").text()).toBe(
      "BARTOC.org vocabulary metadata is made available under the PDDL 1.0.",
    )
  })

  it("updates search context without keeping an empty column", async () => {
    const wrapper = mount(BartocFooter, {
      props: {
        searchStatus: "Search index not available!",
        searchStatusLinks: [{ href: "/api/status", label: "Search API" }],
      },
    })

    expect(wrapper.get(".bartoc-footer__search-status").text()).toBe("Search index not available!")
    expect(wrapper.get("nav[aria-label=\"Search status links\"] a").attributes("href")).toBe("/api/status")
    expect(wrapper.find(".bartoc-footer__resource-format-links").exists()).toBe(false)

    await wrapper.setProps({ searchStatus: "" })
    expect(wrapper.find(".bartoc-footer__search-status").exists()).toBe(false)
    expect(wrapper.find(".bartoc-footer__context").exists()).toBe(true)

    await wrapper.setProps({ searchStatusLinks: [] })
    expect(wrapper.find(".bartoc-footer__context").exists()).toBe(false)
  })

  it("keeps resource URLs from the host unchanged", () => {
    const resourceFormatLinks = [
      { href: "/api/data?uri=https%3A%2F%2Fbartoc.org%2Fen%2Fnode%2F18785", label: "JSON" },
      { href: "/en/node/18785?format=nt&inline=1", label: "RDF" },
      { href: "/en/node/18785?format=rdfxml", label: "XML" },
    ]
    const wrapper = mount(BartocFooter, { props: { resourceFormatLinks } })
    const links = wrapper.findAll("nav[aria-label=\"Resource formats\"] a")

    expect(links.map((link) => ({ href: link.attributes("href"), label: link.text() }))).toEqual(resourceFormatLinks)
    expect(wrapper.find(".bartoc-footer__search").exists()).toBe(false)
  })

  it("removes contextual sections independently without leaving an empty column", async () => {
    const wrapper = mount(BartocFooter, {
      props: {
        searchStatus: "search in 123 terminologies",
        resourceFormatLinks: [{ href: "/api/data", label: "JSON" }],
      },
    })

    expect(wrapper.findAll(".bartoc-footer__context")).toHaveLength(1)
    expect(wrapper.get(".bartoc-footer__context").findAll("h2").map((heading) => heading.text())).toEqual([
      "Search index",
      "Resource formats",
    ])

    await wrapper.setProps({ resourceFormatLinks: [] })
    expect(wrapper.find(".bartoc-footer__resource-format-links").exists()).toBe(false)
    expect(wrapper.get(".bartoc-footer__context").findAll("h2").map((heading) => heading.text())).toEqual(["Search index"])

    await wrapper.setProps({ resourceFormatLinks: [{ href: "/api/data", label: "JSON" }], searchStatus: "" })
    expect(wrapper.find(".bartoc-footer__search").exists()).toBe(false)
    expect(wrapper.get(".bartoc-footer__context").findAll("h2").map((heading) => heading.text())).toEqual(["Resource formats"])

    await wrapper.setProps({ resourceFormatLinks: [] })
    expect(wrapper.find(".bartoc-footer__context").exists()).toBe(false)
  })

  it("preserves contextual slots and uses them instead of fallback content", () => {
    const wrapper = mount(BartocFooter, {
      props: {
        searchStatus: "Fallback status",
        searchStatusLinks: [{ href: "/fallback-status", label: "Fallback status link" }],
        resourceFormatLinks: [{ href: "/fallback-format", label: "Fallback format link" }],
      },
      slots: {
        "search-status": "search in <b>123</b> terminologies",
        "search-status-links": "<a href=\"/api/status\">Search API</a>",
        "resource-format-links": "<a href=\"/resource.json\">JSON</a>",
      },
    })

    expect(wrapper.get(".bartoc-footer__search-status b").text()).toBe("123")
    expect(wrapper.get("nav[aria-label=\"Search status links\"] a").attributes("href")).toBe("/api/status")
    expect(wrapper.get("nav[aria-label=\"Resource formats\"] a").attributes("href")).toBe("/resource.json")
    expect(wrapper.text()).not.toContain("Fallback")
  })

  it.each([
    ["search-status", "<b>Index status</b>", "Index status"],
    ["search-status-links", "<a href=\"/api/status\">Search API</a>", "Search API"],
    ["resource-format-links", "<a href=\"/resource.json\">JSON</a>", "JSON"],
  ])("shows the context column with only the %s slot", (name, content, expected) => {
    const wrapper = mount(BartocFooter, { slots: { [name]: content } })

    expect(wrapper.get(".bartoc-footer__context").text()).toContain(expected)
  })

  it("uses global-links once in place of the default navigation groups", () => {
    const wrapper = mount(BartocFooter, {
      props: {
        internalLinks: [{ href: "/api", label: "API" }],
        externalLinks: [{ href: "https://example.org", label: "Example" }],
      },
      slots: { "global-links": "<a href=\"/custom\">Custom links</a>" },
    })

    expect(wrapper.findAll("nav")).toHaveLength(1)
    expect(wrapper.get("nav[aria-label=\"Footer\"]").text()).toBe("Custom links")
    expect(wrapper.find("a[href=\"/api\"]").exists()).toBe(false)
    expect(wrapper.find("a[href=\"https://example.org\"]").exists()).toBe(false)
  })

  it.each(["download", "Download"])("uses the %s link in the legal notice", (label) => {
    const wrapper = mount(BartocFooter, {
      props: {
        internalLinks: [{ href: "/download", label }],
      },
    })

    const legalLink = wrapper.get(".bartoc-footer__legal a")

    expect(legalLink.text()).toBe("made available")
    expect(legalLink.attributes("href")).toBe("/download")
    expect(wrapper.get(".bartoc-footer__global-links a").text()).toBe(label)
  })

  it("renders plain legal text without a download link", () => {
    const wrapper = mount(BartocFooter)

    expect(wrapper.get(".bartoc-footer__legal").text()).toContain(
      "metadata is made available under the PDDL 1.0",
    )
    expect(wrapper.findAll(".bartoc-footer__legal a")).toHaveLength(1)
  })

  it("preserves custom licensing and the default print text", async () => {
    const wrapper = mount(BartocFooter, {
      props: { siteName: "BARTOC.org (dev)", licenseLabel: "Custom license", licenseUrl: "/license" },
    })

    expect(wrapper.get(".bartoc-footer__legal a").attributes("href")).toBe("/license")
    expect(wrapper.get(".bartoc-footer__legal a").text()).toBe("Custom license")
    expect(wrapper.get(".bartoc-footer__print.printonly").text()).toBe(
      "BARTOC.org (dev) vocabulary metadata is made available under the Custom license.",
    )
    expect(wrapper.find(".bartoc-footer__screen.noprint").exists()).toBe(true)

    await wrapper.setProps({ printText: "Custom print text." })
    expect(wrapper.get(".bartoc-footer__print").text()).toBe("Custom print text.")
  })

  it("preserves legal and print slot overrides", () => {
    const wrapper = mount(BartocFooter, {
      props: { printText: "Fallback print text" },
      slots: {
        legal: "<a href=\"/custom-license\">Custom licensing</a>",
        print: "Custom print slot",
      },
    })

    expect(wrapper.get(".bartoc-footer__legal").text()).toBe("Custom licensing")
    expect(wrapper.get(".bartoc-footer__legal a").attributes("href")).toBe("/custom-license")
    expect(wrapper.get(".bartoc-footer__print").text()).toBe("Custom print slot")
  })
})
