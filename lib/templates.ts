import type { ReadmeState, TemplateId } from "@/types/readme";

export const templatePresets: Record<TemplateId, ReadmeState> = {
  minimal: {
    header: {
      name: "Alex Morgan",
      subtitle: "Software developer building useful things.",
      typingEnabled: false,
      typingLines: [],
      typingFont: "Fira Code",
      typingColor: "2F6FEB",
      typingCenter: true,
      bannerUrl: ""
    },
    about: { items: [{ id: "minimal-about", text: "🌱 Currently learning something new every day." }] },
    techStack: { selectedIds: ["javascript", "typescript", "react"], style: "flat" },
    stats: {
      username: "alexmorgan",
      showStats: false,
      showStreak: false,
      showTopLangs: false,
      showTrophies: false,
      theme: "dark"
    },
    social: { links: [] },
    support: { buyMeACoffee: "", patreon: "", kofi: "" },
    templateId: "minimal"
  },
  showcase: {
    header: {
      name: "Alex Morgan",
      subtitle: "Full-stack developer turning ideas into useful products.",
      typingEnabled: true,
      typingLines: ["Building for the web", "Learning in the open", "Making things that matter"],
      typingFont: "Fira Code",
      typingColor: "2F6FEB",
      typingCenter: true,
      bannerUrl: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80"
    },
    about: {
      items: [
        { id: "showcase-about-1", text: "🔭 Building accessible tools for the open web." },
        { id: "showcase-about-2", text: "🌱 Exploring distributed systems and thoughtful design." },
        { id: "showcase-about-3", text: "💬 Always happy to talk about TypeScript and product craft." }
      ]
    },
    techStack: {
      selectedIds: ["typescript", "react", "nextjs", "nodejs", "postgresql", "vercel", "git", "docker"],
      style: "for-the-badge"
    },
    stats: {
      username: "alexmorgan",
      showStats: true,
      showStreak: true,
      showTopLangs: true,
      showTrophies: false,
      theme: "nord"
    },
    social: {
      links: [
        { platform: "linkedin", url: "https://www.linkedin.com/in/alexmorgan", enabled: true },
        { platform: "portfolio", url: "https://alexmorgan.dev", enabled: true }
      ]
    },
    support: { buyMeACoffee: "", patreon: "", kofi: "" },
    templateId: "showcase"
  },
  detailed: {
    header: {
      name: "Alex Morgan",
      subtitle: "Full-stack engineer · open-source contributor · lifelong learner",
      typingEnabled: true,
      typingLines: ["Shipping thoughtful software", "Open-source advocate", "Coffee-powered problem solver"],
      typingFont: "Fira Code",
      typingColor: "2F6FEB",
      typingCenter: true,
      bannerUrl: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=80"
    },
    about: {
      items: [
        { id: "detailed-about-1", text: "🔭 I'm currently working on developer tools that make everyday work calmer." },
        { id: "detailed-about-2", text: "🌱 I'm currently learning more about distributed systems and Rust." },
        { id: "detailed-about-3", text: "👯 I'm looking to collaborate on accessible open-source projects." },
        { id: "detailed-about-4", text: "💬 Ask me about TypeScript, React, and building for the web." },
        { id: "detailed-about-5", text: "📫 Reach me at hello@alexmorgan.dev." },
        { id: "detailed-about-6", text: "⚡ Fun fact: my best debugging ideas arrive on long walks." }
      ]
    },
    techStack: {
      selectedIds: [
        "javascript", "typescript", "python", "rust", "react", "nextjs", "nodejs", "nestjs",
        "aws", "vercel", "postgresql", "redis", "docker", "kubernetes", "git", "figma"
      ],
      style: "flat-square"
    },
    stats: {
      username: "alexmorgan",
      showStats: true,
      showStreak: true,
      showTopLangs: true,
      showTrophies: true,
      theme: "dracula"
    },
    social: {
      links: [
        { platform: "twitter", url: "https://twitter.com/alexmorgan", enabled: true },
        { platform: "linkedin", url: "https://www.linkedin.com/in/alexmorgan", enabled: true },
        { platform: "youtube", url: "https://www.youtube.com/@alexmorgan", enabled: true },
        { platform: "discord", url: "https://discord.com/users/alexmorgan", enabled: true },
        { platform: "portfolio", url: "https://alexmorgan.dev", enabled: true }
      ]
    },
    support: { buyMeACoffee: "alexmorgan", patreon: "alexmorgan", kofi: "alexmorgan" },
    templateId: "detailed"
  }
};