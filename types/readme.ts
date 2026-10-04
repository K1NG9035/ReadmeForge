export interface HeaderSection {
  name: string;
  subtitle: string;
  typingEnabled: boolean;
  typingLines: string[];
  typingFont: string;
  typingColor: string;
  typingCenter: boolean;
  bannerUrl: string;
}

export interface AboutItem {
  id: string;
  text: string;
}

export interface AboutSection {
  items: AboutItem[];
}

export type TechCategory = "languages" | "frameworks" | "cloud" | "databases" | "tools";

export interface TechBadge {
  id: string;
  label: string;
  category: TechCategory;
  color: string;
  logo: string;
  logoColor: string;
}

export interface TechStackSection {
  selectedIds: string[];
  style: "flat" | "flat-square" | "for-the-badge" | "plastic";
}

export type StatsTheme = "dark" | "light" | "nord" | "dracula";

export interface StatsSection {
  username: string;
  showStats: boolean;
  showStreak: boolean;
  showTopLangs: boolean;
  showTrophies: boolean;
  theme: StatsTheme;
}

export type SocialPlatform = "twitter" | "linkedin" | "youtube" | "discord" | "portfolio";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  enabled: boolean;
}

export interface SocialSection {
  links: SocialLink[];
}

export interface SupportSection {
  buyMeACoffee: string;
  patreon: string;
  kofi: string;
}

export type TemplateId = "minimal" | "showcase" | "detailed";

export interface ReadmeState {
  header: HeaderSection;
  about: AboutSection;
  techStack: TechStackSection;
  stats: StatsSection;
  social: SocialSection;
  support: SupportSection;
  templateId: TemplateId;
}