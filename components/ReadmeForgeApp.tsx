"use client";

import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { ActionBar } from "@/components/ActionBar";
import { EditorPane } from "@/components/EditorPane";
import { PreviewPane } from "@/components/PreviewPane";
import { Toaster } from "@/components/ui/sonner";
import { useHydrated } from "@/hooks/useHydrated";
import { generateMarkdown } from "@/lib/markdown-generator";
import { useReadmeStore } from "@/store/readmeStore";

export function ReadmeForgeApp() {
  const hydrated = useHydrated();
  const readme = useReadmeStore(useShallow((state) => ({
    header: state.header,
    about: state.about,
    techStack: state.techStack,
    stats: state.stats,
    social: state.social,
    support: state.support,
    templateId: state.templateId
  })));
  const markdown = useMemo(() => generateMarkdown(readme), [readme]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="bottom-right" richColors />
      {hydrated ? (
        <>
          <ActionBar markdown={markdown} />
          <main className="mx-auto grid min-w-0 max-w-[1800px] grid-cols-1 items-start lg:grid-cols-2">
            <EditorPane />
            <PreviewPane markdown={markdown} />
          </main>
        </>
      ) : (
        <main className="mx-auto max-w-[1800px] px-4 py-16 sm:px-8" aria-busy="true" aria-label="Loading saved README">
          <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="h-[32rem] animate-pulse rounded-lg border border-border bg-muted/40" />
            <div className="h-[32rem] animate-pulse rounded-lg border border-border bg-muted/40" />
          </div>
        </main>
      )}
    </div>
  );
}