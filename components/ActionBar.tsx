"use client";

import { useState } from "react";
import { Check, ChevronDown, Download, FileCode2, RotateCcw, SunMoon } from "lucide-react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useReadmeStore } from "@/store/readmeStore";
import type { TemplateId } from "@/types/readme";

const templates: { id: TemplateId; label: string; description: string }[] = [
  { id: "minimal", label: "Minimal", description: "A name, short intro, and a few badges" },
  { id: "showcase", label: "Showcase", description: "A visual header, stats, and socials" },
  { id: "detailed", label: "Detailed", description: "Every section, ready to personalize" }
];

interface ActionBarProps {
  markdown: string;
}

export function ActionBar({ markdown }: ActionBarProps) {
  const currentTemplate = useReadmeStore((state) => state.templateId);
  const loadTemplate = useReadmeStore((state) => state.loadTemplate);
  const reset = useReadmeStore((state) => state.reset);
  const [pendingTemplate, setPendingTemplate] = useState<TemplateId | null>(null);

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast.success("Markdown copied to clipboard");
    } catch {
      toast.error("Clipboard access is unavailable");
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "README.md";
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("README.md downloaded");
  };

  const toggleTheme = () => {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDark);
    try {
      localStorage.setItem("readmeforge-theme", nextIsDark ? "dark" : "light");
    } catch {
      toast.error("Theme preference could not be saved");
    }
  };

  const confirmTemplate = () => {
    if (!pendingTemplate) return;
    loadTemplate(pendingTemplate);
    toast.success(`${templates.find((template) => template.id === pendingTemplate)?.label ?? "Template"} loaded`);
    setPendingTemplate(null);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground" aria-hidden="true">
              <FileCode2 className="size-5" />
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold leading-tight">ReadmeForge</h1>
              <p className="hidden text-xs text-muted-foreground sm:block">GitHub profile README builder</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" variant="outline" size="sm" className="gap-2">
                  <span>{templates.find((template) => template.id === currentTemplate)?.label ?? "Template"}</span>
                  <ChevronDown className="size-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Start from a template</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {templates.map((template) => (
                  <DropdownMenuItem key={template.id} onSelect={() => setPendingTemplate(template.id)} className="flex-col items-start gap-0.5 py-2">
                    <span className="flex w-full items-center justify-between font-medium">
                      {template.label}
                      {currentTemplate === template.id && <Check className="size-4 text-primary" />}
                    </span>
                    <span className="text-xs text-muted-foreground">{template.description}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button type="button" size="sm" onClick={copyMarkdown} className="gap-2">
              <FileCode2 className="size-4" /><span className="hidden sm:inline">Copy Markdown</span><span className="sm:hidden">Copy</span>
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={downloadMarkdown} className="gap-2">
              <Download className="size-4" /><span className="hidden sm:inline">Download</span>
            </Button>
            <Button type="button" variant="ghost" size="icon" aria-label="Reset README to the minimal template" title="Reset README" onClick={() => { reset(); toast.success("README reset"); }}>
              <RotateCcw className="size-4" />
            </Button>
            <Button type="button" variant="outline" size="icon" aria-label="Toggle light and dark mode" title="Toggle light and dark mode" onClick={toggleTheme}>
              <SunMoon className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      <AlertDialog open={pendingTemplate !== null} onOpenChange={(open) => { if (!open) setPendingTemplate(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Replace your current README?</AlertDialogTitle>
            <AlertDialogDescription>
              Loading the {templates.find((template) => template.id === pendingTemplate)?.label ?? "selected"} template replaces your current sections and links.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction onClick={confirmTemplate}>Load template</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}