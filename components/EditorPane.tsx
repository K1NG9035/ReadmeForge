"use client";

import { BarChart3, Code2, HeartHandshake, Link2, UserRound, Wrench } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AboutEditor } from "@/components/sections/AboutEditor";
import { HeaderEditor } from "@/components/sections/HeaderEditor";
import { SocialEditor } from "@/components/sections/SocialEditor";
import { StatsEditor } from "@/components/sections/StatsEditor";
import { SupportEditor } from "@/components/sections/SupportEditor";
import { TechStackEditor } from "@/components/sections/TechStackEditor";

const editorSections = [
  { id: "header", title: "Header", icon: UserRound, component: HeaderEditor },
  { id: "about", title: "About me", icon: Code2, component: AboutEditor },
  { id: "tech", title: "Tech stack", icon: Wrench, component: TechStackEditor },
  { id: "stats", title: "GitHub stats", icon: BarChart3, component: StatsEditor },
  { id: "social", title: "Social links", icon: Link2, component: SocialEditor },
  { id: "support", title: "Support", icon: HeartHandshake, component: SupportEditor }
];

export function EditorPane() {
  return (
    <section aria-label="README editor" className="min-w-0 border-b border-border lg:border-b-0 lg:border-r">
      <div className="border-b border-border px-5 py-4 sm:px-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Compose</p>
        <h2 className="mt-1 text-lg font-semibold">Your profile</h2>
      </div>
      <Accordion type="multiple" defaultValue={["header", "about"]} className="px-5 sm:px-7">
        {editorSections.map(({ id, title, icon: Icon, component: SectionEditor }) => (
          <AccordionItem key={id} value={id} className="border-border">
            <AccordionTrigger className="py-4 no-underline hover:no-underline">
              <span className="flex items-center gap-3">
                <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                <span>{title}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-5 pt-1">
              <SectionEditor />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}