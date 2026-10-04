import { badgeCatalog } from "@/lib/badges";
import type { ReadmeState, SocialPlatform, SupportSection, TechBadge } from "@/types/readme";

const socialBadgeDetails: Record<SocialPlatform, { label: string; color: string; logo: string }> = {
  twitter: { label: "X", color: "000000", logo: "x" },
  linkedin: { label: "LinkedIn", color: "0A66C2", logo: "linkedin" },
  youtube: { label: "YouTube", color: "FF0000", logo: "youtube" },
  discord: { label: "Discord", color: "5865F2", logo: "discord" },
  portfolio: { label: "Portfolio", color: "24292F", logo: "link" }
};

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function safeMarkdownUrl(value: string): string {
  return encodeURI(value).replaceAll("(", "%28").replaceAll(")", "%29").replaceAll(" ", "%20");
}

export function escapeBadgeLabel(label: string): string {
  return label.replaceAll("-", "--").replaceAll("_", "__").replaceAll(" ", "_");
}

function buildHeader(state: ReadmeState): string {
  const { header } = state;
  const content: string[] = [];

  if (header.name.trim()) content.push(`<h1 align="center">${escapeHtml(header.name.trim())}</h1>`);
  if (header.subtitle.trim()) content.push(`<p align="center">${escapeHtml(header.subtitle.trim())}</p>`);

  if (header.typingEnabled && header.typingLines.some((line) => line.trim())) {
    const lines = header.typingLines
      .filter((line) => line.trim())
      .map((line) => encodeURIComponent(line).replaceAll("%20", "+"))
      .join(";");
    const font = encodeURIComponent(header.typingFont || "Fira Code");
    const color = header.typingColor.replace(/^#/, "");
    const center = header.typingCenter ? "true" : "false";
    const imageUrl = `https://readme-typing-svg.demolab.com?font=${font}&color=${encodeURIComponent(color)}&center=${center}&vCenter=true&width=500&lines=${lines}`;
    content.push(`<p align="center"><img src="${imageUrl}" alt="Typing introduction" /></p>`);
  }

  if (header.bannerUrl.trim()) {
    content.push(`<img src="${escapeHtml(header.bannerUrl.trim())}" width="100%" alt="Profile banner" />`);
  }

  return content.length ? `<div align="center">\n${content.join("\n")}\n</div>` : "";
}

function buildAbout(state: ReadmeState): string {
  const items = state.about.items.map((item) => item.text.trim()).filter(Boolean);
  return items.length ? `## About Me\n\n${items.map((item) => `- ${item}`).join("\n")}` : "";
}

function buildBadge(badge: TechBadge, style: ReadmeState["techStack"]["style"]): string {
  const label = encodeURIComponent(escapeBadgeLabel(badge.label));
  const color = encodeURIComponent(badge.color.replace(/^#/, ""));
  const logo = encodeURIComponent(badge.logo);
  const logoColor = encodeURIComponent(badge.logoColor);
  const url = `https://img.shields.io/badge/${label}-${color}?style=${style}&logo=${logo}&logoColor=${logoColor}`;
  return `![${badge.label}](${url})`;
}

function buildTechStack(state: ReadmeState): string {
  const badges = state.techStack.selectedIds
    .map((id) => badgeCatalog.find((badge) => badge.id === id))
    .filter((badge): badge is TechBadge => badge !== undefined);
  return badges.length
    ? `## Tech Stack\n\n${badges.map((badge) => buildBadge(badge, state.techStack.style)).join(" ")}`
    : "";
}

function buildStats(state: ReadmeState): string {
  const { stats } = state;
  const username = stats.username.trim();
  if (!username) return "";

  const encodedUsername = encodeURIComponent(username);
  const cards: string[] = [];
  if (stats.showStats) {
    cards.push(`![GitHub stats](https://github-readme-stats.vercel.app/api?username=${encodedUsername}&show_icons=true&theme=${stats.theme})`);
  }
  if (stats.showStreak) {
    cards.push(`![GitHub streak](https://streak-stats.demolab.com?user=${encodedUsername}&theme=${stats.theme})`);
  }
  if (stats.showTopLangs) {
    cards.push(`![Top languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${encodedUsername}&layout=compact&theme=${stats.theme})`);
  }
  if (stats.showTrophies) {
    cards.push(`![GitHub trophies](https://github-profile-trophy.vercel.app/?username=${encodedUsername}&theme=${stats.theme})`);
  }

  return cards.length ? `## GitHub Stats\n\n${cards.join("\n")}` : "";
}

function buildSocials(state: ReadmeState): string {
  const links = state.social.links.filter((link) => link.enabled && link.url.trim());
  if (!links.length) return "";

  const badges = links.map((link) => {
    const details = socialBadgeDetails[link.platform];
    const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(details.label)}-${details.color}?style=for-the-badge&logo=${details.logo}&logoColor=white`;
    return `[![${details.label}](${badgeUrl})](${safeMarkdownUrl(link.url.trim())})`;
  });

  return `## Connect with me\n\n${badges.join(" ")}`;
}

function supportUrl(platform: "buyMeACoffee" | "patreon" | "kofi", value: string): string {
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return safeMarkdownUrl(trimmed);
  const username = encodeURIComponent(trimmed.replace(/^@/, ""));
  const baseUrls = {
    buyMeACoffee: "https://www.buymeacoffee.com/",
    patreon: "https://www.patreon.com/",
    kofi: "https://ko-fi.com/"
  };
  return `${baseUrls[platform]}${username}`;
}

function buildSupport(support: SupportSection): string {
  const items: string[] = [];
  if (support.buyMeACoffee.trim()) {
    items.push(`[![Buy Me a Coffee](https://img.shields.io/badge/Buy_Me_a_Coffee-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black)](${supportUrl("buyMeACoffee", support.buyMeACoffee)})`);
  }
  if (support.patreon.trim()) {
    items.push(`[![Patreon](https://img.shields.io/badge/Patreon-FF424D?style=for-the-badge&logo=patreon&logoColor=white)](${supportUrl("patreon", support.patreon)})`);
  }
  if (support.kofi.trim()) {
    items.push(`[![Ko-fi](https://img.shields.io/badge/Ko--fi-FF5E5B?style=for-the-badge&logo=kofi&logoColor=white)](${supportUrl("kofi", support.kofi)})`);
  }
  return items.length ? `## Support my work\n\n${items.join(" ")}` : "";
}

export function generateMarkdown(state: ReadmeState): string {
  const sections = [
    buildHeader(state),
    buildAbout(state),
    buildTechStack(state),
    buildStats(state),
    buildSocials(state),
    buildSupport(state.support)
  ].filter(Boolean);

  return sections.length ? `${sections.join("\n\n").trim()}\n` : "\n";
}