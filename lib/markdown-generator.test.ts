import { describe, expect, it } from "vitest";
import { badgeCatalog } from "@/lib/badges";
import { generateMarkdown, escapeBadgeLabel } from "@/lib/markdown-generator";
import { templatePresets } from "@/lib/templates";
import type { ReadmeState } from "@/types/readme";

const emptyState: ReadmeState = {
  header: {
    name: "",
    subtitle: "",
    typingEnabled: false,
    typingLines: [],
    typingFont: "Fira Code",
    typingColor: "2F6FEB",
    typingCenter: true,
    bannerUrl: ""
  },
  about: { items: [] },
  techStack: { selectedIds: [], style: "flat" },
  stats: {
    username: "",
    showStats: false,
    showStreak: false,
    showTopLangs: false,
    showTrophies: false,
    theme: "dark"
  },
  social: { links: [] },
  support: { buyMeACoffee: "", patreon: "", kofi: "" },
  templateId: "minimal"
};

describe("generateMarkdown", () => {
  it("provides a substantial catalog across all five technology categories", () => {
    expect(badgeCatalog.length).toBeGreaterThanOrEqual(60);
    expect(new Set(badgeCatalog.map((badge) => badge.category)).size).toBe(5);
  });

  it("returns only the required newline for an empty README", () => {
    expect(generateMarkdown(emptyState)).toBe("\n");
  });

  it("builds a centered header and encodes typing lines", () => {
    const state: ReadmeState = {
      ...emptyState,
      header: {
        ...emptyState.header,
        name: "Ada Lovelace",
        subtitle: "Engineer & mathematician",
        typingEnabled: true,
        typingLines: ["Line one & two", "C++ in action"]
      }
    };
    const markdown = generateMarkdown(state);
    expect(markdown).toContain('<h1 align="center">Ada Lovelace</h1>');
    expect(markdown).toContain("lines=Line+one+%26+two;C%2B%2B+in+action");
  });

  it("includes non-empty about items and omits blank items", () => {
    const state: ReadmeState = {
      ...emptyState,
      about: { items: [{ id: "a", text: "🌱 Learning Rust" }, { id: "b", text: "  " }] }
    };
    expect(generateMarkdown(state)).toContain("## About Me\n\n- 🌱 Learning Rust");
  });

  it("escapes shields label separators and renders selected badges", () => {
    expect(escapeBadgeLabel("C#-Tools_Pro Lab")).toBe("C#--Tools__Pro_Lab");
    const state: ReadmeState = {
      ...emptyState,
      techStack: { selectedIds: ["javascript"], style: "flat-square" }
    };
    expect(generateMarkdown(state)).toContain("JavaScript-F7DF1E?style=flat-square");
  });

  it("builds all stats widgets and encodes usernames", () => {
    const state: ReadmeState = {
      ...emptyState,
      stats: {
        username: "octo cat",
        showStats: true,
        showStreak: true,
        showTopLangs: true,
        showTrophies: true,
        theme: "dracula"
      }
    };
    const markdown = generateMarkdown(state);
    expect(markdown).toContain("api?username=octo%20cat&show_icons=true&theme=dracula");
    expect(markdown).toContain("streak-stats.demolab.com?user=octo%20cat&theme=dracula");
    expect(markdown).toContain("api/top-langs/?username=octo%20cat&layout=compact&theme=dracula");
    expect(markdown).toContain("github-profile-trophy.vercel.app/?username=octo%20cat&theme=dracula");
  });

  it("links enabled social badges and omits disabled or empty links", () => {
    const state: ReadmeState = {
      ...emptyState,
      social: {
        links: [
          { platform: "linkedin", url: "https://linkedin.com/in/ada", enabled: true },
          { platform: "twitter", url: "https://x.com/ada", enabled: false },
          { platform: "youtube", url: "", enabled: true }
        ]
      }
    };
    const markdown = generateMarkdown(state);
    expect(markdown).toContain("[![LinkedIn]");
    expect(markdown).not.toContain("YouTube");
    expect(markdown).not.toContain("X-");
  });

  it("adds support links only when a provider is configured", () => {
    const state: ReadmeState = {
      ...emptyState,
      support: { ...emptyState.support, kofi: "@ada-lovelace" }
    };
    const markdown = generateMarkdown(state);
    expect(markdown).toContain("https://ko-fi.com/ada-lovelace");
    expect(markdown).not.toContain("Patreon");
    expect(markdown).not.toContain("Buy_Me_a_Coffee");
  });

  it("omits all empty sections without leaving extra blank lines", () => {
    const markdown = generateMarkdown(emptyState);
    expect(markdown).not.toContain("## ");
    expect(markdown.trim()).toBe("");
    expect(markdown).toBe("\n");
  });

  it("keeps section spacing clean and ends with exactly one newline", () => {
    const state: ReadmeState = {
      ...emptyState,
      header: { ...emptyState.header, name: "Ada" },
      about: { items: [{ id: "about", text: "Building useful tools" }] }
    };
    const markdown = generateMarkdown(state);
    expect(markdown.endsWith("\n")).toBe(true);
    expect(markdown.endsWith("\n\n")).toBe(false);
    expect(markdown).not.toMatch(/[ \t]+\n/);
    expect(markdown).not.toMatch(/\n{3,}/);
  });

  it("matches the detailed template snapshot", () => {
    expect(generateMarkdown(templatePresets.detailed)).toMatchSnapshot();
  });
});