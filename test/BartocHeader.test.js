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

  it("opens one accessible menu with both link sections", async () => {
    const wrapper = mount(BartocHeader, {
      props: {
        logoUrl: "/img/bartoc-logo.svg",
        activePath: "/registries",
        navLinks: [
          { href: "/about", label: "About" },
          { href: "/registries", label: "Registries" },
        ],
        utilityLinks: [{ href: "/contact", label: "Contact & Editors" }],
      },
    })

    const button = wrapper.get(".bartoc-header__menu-button")
    const panel = wrapper.get(".bartoc-header__nav")

    expect(wrapper.get(".bartoc-header__logo-image").attributes("src"))
      .toBe("/img/bartoc-logo.svg")
    expect(button.text()).toBe("Menu")
    expect(button.attributes("aria-expanded")).toBe("false")
    expect(button.attributes("aria-controls")).toBe(panel.attributes("id"))
    expect(panel.classes()).not.toContain("bartoc-header__nav--open")

    await button.trigger("click")

    expect(button.text()).toBe("Close")
    expect(button.attributes("aria-expanded")).toBe("true")
    expect(panel.classes()).toContain("bartoc-header__nav--open")
    expect(wrapper.findAll(".bartoc-header__section-title").map(title => title.text()))
      .toEqual(["Navigation", "Account & Support"])
    expect(wrapper.findAll("a[href='/registries']")).toHaveLength(1)
    expect(wrapper.get("a[href='/registries']").attributes("aria-current"))
      .toBe("page")
    expect(wrapper.get("a[href='/contact']").text()).toBe("Contact & Editors")

    await button.trigger("click")

    expect(button.text()).toBe("Menu")
    expect(button.attributes("aria-expanded")).toBe("false")
    expect(panel.classes()).not.toContain("bartoc-header__nav--open")
  })

  it("uses host labels and shows only sections with content", async () => {
    const wrapper = mount(BartocHeader, {
      props: {
        utilityLinks: [{ href: "/contact", label: "Contact" }],
        navLabel: "Navigazione principale",
        utilityNavLabel: "Navigazione utente",
        menuLabel: "Apri menu",
        closeLabel: "Chiudi menu",
        navigationHeading: "Navigazione",
        accountSupportHeading: "Account e supporto",
      },
    })

    const button = wrapper.get(".bartoc-header__menu-button")
    expect(button.text()).toBe("Apri menu")
    expect(wrapper.find(".bartoc-header__nav-left").exists()).toBe(false)
    expect(wrapper.findAll(".bartoc-header__section-title").map(title => title.text()))
      .toEqual(["Account e supporto"])
    expect(wrapper.get(".bartoc-header__nav-right nav").attributes("aria-label"))
      .toBe("Navigazione utente")

    await button.trigger("click")
    expect(button.text()).toBe("Chiudi menu")

    await wrapper.setProps({ navLinks: [{ href: "/about", label: "About" }] })
    expect(wrapper.findAll(".bartoc-header__section-title").map(title => title.text()))
      .toEqual(["Navigazione", "Account e supporto"])
    expect(wrapper.get(".bartoc-header__nav-left").attributes("aria-label"))
      .toBe("Navigazione principale")

    const emptyHeader = mount(BartocHeader)
    expect(emptyHeader.find(".bartoc-header__menu-button").exists()).toBe(false)
    expect(emptyHeader.find(".bartoc-header__nav").exists()).toBe(false)
  })

  it("closes on Escape and returns focus to the menu button", async () => {
    const wrapper = mount(BartocHeader, {
      attachTo: document.body,
      props: { navLinks: [{ href: "/about", label: "About" }] },
    })

    const button = wrapper.get(".bartoc-header__menu-button")
    await button.trigger("click")

    const link = wrapper.get("a[href='/about']")
    link.element.focus()
    expect(document.activeElement).toBe(link.element)

    await link.trigger("keydown", { key: "Escape" })

    expect(button.attributes("aria-expanded")).toBe("false")
    expect(document.activeElement).toBe(button.element)
    wrapper.unmount()
  })

  it("keeps account controls and Add tied to host authorization", async () => {
    const wrapper = mount(BartocHeader, {
      props: {
        editUrl: "/edit",
        printLogoUrl: "/img/bartoc-print.svg",
      },
      slots: {
        "user-status": "<button type='button' class='login-control'>Log in</button>",
        actions: "<a href='/help'>Help</a>",
        print: "Print title",
      },
    })

    expect(wrapper.findAll(".login-control")).toHaveLength(1)
    expect(wrapper.find(".bartoc-header__nav-left").exists()).toBe(false)
    expect(wrapper.get(".bartoc-header__menu-button").exists()).toBe(true)
    expect(wrapper.get("a[href='/help']").text()).toBe("Help")
    expect(wrapper.find("a[href='/edit']").exists()).toBe(false)
    expect(wrapper.get(".bartoc-header__print-logo").attributes("src"))
      .toBe("/img/bartoc-print.svg")
    expect(wrapper.get(".bartoc-header__print").text()).toBe("Print title")

    await wrapper.setProps({ userCanAdd: true })
    expect(wrapper.get("a[href='/edit']").text()).toBe("Add")

    await wrapper.setProps({ userCanAdd: false })
    expect(wrapper.find("a[href='/edit']").exists()).toBe(false)
  })

  it("preserves custom navigation slots", () => {
    const wrapper = mount(BartocHeader, {
      slots: {
        "nav-left": "<a href='/custom'>Custom navigation</a>",
        "nav-right": "<button type='button'>Account</button>",
      },
    })

    expect(wrapper.get(".bartoc-header__nav-left a").attributes("href"))
      .toBe("/custom")
    expect(wrapper.get(".bartoc-header__nav-right button").text()).toBe("Account")
    expect(wrapper.get(".bartoc-header__menu-button").exists()).toBe(true)
  })
})
