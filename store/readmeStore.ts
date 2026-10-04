import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { templatePresets } from "@/lib/templates";
import type {
  HeaderSection,
  ReadmeState,
  SocialLink,
  SocialPlatform,
  StatsSection,
  SupportSection,
  TemplateId
} from "@/types/readme";

export interface ReadmeActions {
  setHeader: (partial: Partial<HeaderSection>) => void;
  addAboutItem: () => void;
  updateAboutItem: (id: string, text: string) => void;
  removeAboutItem: (id: string) => void;
  toggleTech: (id: string) => void;
  setTechStyle: (style: ReadmeState["techStack"]["style"]) => void;
  setStats: (partial: Partial<StatsSection>) => void;
  upsertSocial: (platform: SocialPlatform, patch: Partial<Omit<SocialLink, "platform">>) => void;
  setSupport: (partial: Partial<SupportSection>) => void;
  loadTemplate: (templateId: TemplateId) => void;
  reset: () => void;
}

const initialState = structuredClone(templatePresets.minimal);

export const useReadmeStore = create<ReadmeState & ReadmeActions>()(
  persist(
    (set) => ({
      ...initialState,
      setHeader: (partial) => set((state) => ({ header: { ...state.header, ...partial } })),
      addAboutItem: () =>
        set((state) => ({
          about: { items: [...state.about.items, { id: crypto.randomUUID(), text: "" }] }
        })),
      updateAboutItem: (id, text) =>
        set((state) => ({
          about: {
            items: state.about.items.map((item) => (item.id === id ? { ...item, text } : item))
          }
        })),
      removeAboutItem: (id) =>
        set((state) => ({ about: { items: state.about.items.filter((item) => item.id !== id) } })),
      toggleTech: (id) =>
        set((state) => ({
          techStack: {
            ...state.techStack,
            selectedIds: state.techStack.selectedIds.includes(id)
              ? state.techStack.selectedIds.filter((selectedId) => selectedId !== id)
              : [...state.techStack.selectedIds, id]
          }
        })),
      setTechStyle: (style) =>
        set((state) => ({ techStack: { ...state.techStack, style } })),
      setStats: (partial) => set((state) => ({ stats: { ...state.stats, ...partial } })),
      upsertSocial: (platform, patch) =>
        set((state) => {
          const existing = state.social.links.find((link) => link.platform === platform);
          const nextLink: SocialLink = {
            platform,
            url: "",
            enabled: false,
            ...existing,
            ...patch
          };
          return {
            social: {
              links: existing
                ? state.social.links.map((link) => (link.platform === platform ? nextLink : link))
                : [...state.social.links, nextLink]
            }
          };
        }),
      setSupport: (partial) => set((state) => ({ support: { ...state.support, ...partial } })),
      loadTemplate: (templateId) => set(structuredClone(templatePresets[templateId])),
      reset: () => set(structuredClone(initialState))
    }),
    {
      name: "readmeforge-state",
      storage: createJSONStorage(() => ({
        getItem: (name) => typeof window === "undefined" ? null : window.localStorage.getItem(name),
        setItem: (name, value) => {
          if (typeof window !== "undefined") window.localStorage.setItem(name, value);
        },
        removeItem: (name) => {
          if (typeof window !== "undefined") window.localStorage.removeItem(name);
        }
      })),
      skipHydration: true,
      partialize: (state): ReadmeState => ({
        header: state.header,
        about: state.about,
        techStack: state.techStack,
        stats: state.stats,
        social: state.social,
        support: state.support,
        templateId: state.templateId
      })
    }
  )
);