"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useReadmeStore } from "@/store/readmeStore";

export function HeaderEditor() {
  const header = useReadmeStore((state) => state.header);
  const setHeader = useReadmeStore((state) => state.setHeader);
  const updateTypingLine = (index: number, value: string) => {
    setHeader({ typingLines: header.typingLines.map((line, lineIndex) => lineIndex === index ? value : line) });
  };
  const typingPreviewUrl = `https://readme-typing-svg.demolab.com?font=${encodeURIComponent(header.typingFont || "Fira Code")}&color=${encodeURIComponent(header.typingColor.replace(/^#/, ""))}&center=${header.typingCenter}&vCenter=true&width=500&lines=${header.typingLines.filter((line) => line.trim()).map((line) => encodeURIComponent(line).replaceAll("%20", "+")).join(";")}`;

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="header-name">Display name</Label>
        <Input id="header-name" value={header.name} onChange={(event) => setHeader({ name: event.currentTarget.value })} placeholder="Ada Lovelace" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="header-subtitle">Subtitle</Label>
        <Textarea id="header-subtitle" value={header.subtitle} onChange={(event) => setHeader({ subtitle: event.currentTarget.value })} placeholder="A short introduction" rows={2} />
      </div>

      <div className="flex items-center justify-between rounded-lg border bg-card px-3 py-3">
        <Label htmlFor="typing-enabled" className="cursor-pointer">Animated typing header</Label>
        <Switch id="typing-enabled" checked={header.typingEnabled} onCheckedChange={(typingEnabled) => setHeader({ typingEnabled })} />
      </div>

      {header.typingEnabled && (
        <div className="space-y-4 rounded-lg border bg-muted/30 p-3">
          <div className="space-y-2">
            <Label>Typing lines</Label>
            {header.typingLines.map((line, index) => (
              <div key={`typing-line-${index}`} className="flex gap-2">
                <Input aria-label={`Typing line ${index + 1}`} value={line} onChange={(event) => updateTypingLine(index, event.currentTarget.value)} placeholder="Building useful things" />
                <Button type="button" variant="ghost" size="icon" aria-label={`Remove typing line ${index + 1}`} onClick={() => setHeader({ typingLines: header.typingLines.filter((_, lineIndex) => lineIndex !== index) })}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => setHeader({ typingLines: [...header.typingLines, ""] })}>
              <Plus className="mr-2 size-4" /> Add line
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="typing-font">Font</Label>
              <select id="typing-font" value={header.typingFont} onChange={(event) => setHeader({ typingFont: event.currentTarget.value })} className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option>Fira Code</option><option>JetBrains Mono</option><option>Space Mono</option><option>Roboto Mono</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="typing-color">Text color</Label>
              <div className="flex gap-2">
                <input id="typing-color-picker" type="color" aria-label="Choose typing text color" value={`#${header.typingColor.replace(/^#/, "")}`} onChange={(event) => setHeader({ typingColor: event.currentTarget.value.slice(1).toUpperCase() })} className="h-9 w-10 cursor-pointer rounded-md border border-input bg-background p-1" />
                <Input id="typing-color" value={header.typingColor} onChange={(event) => setHeader({ typingColor: event.currentTarget.value.replace(/[^0-9a-f]/gi, "").slice(0, 6).toUpperCase() })} maxLength={6} aria-describedby="typing-color-help" />
              </div>
              <p id="typing-color-help" className="text-xs text-muted-foreground">Six-digit hex, without #.</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="typing-center" className="cursor-pointer">Center animation</Label>
            <Switch id="typing-center" checked={header.typingCenter} onCheckedChange={(typingCenter) => setHeader({ typingCenter })} />
          </div>
          {header.typingLines.some((line) => line.trim()) && (
            <div className="overflow-hidden rounded-md border bg-background p-2">
              <img src={typingPreviewUrl} alt="Live preview of the typing animation" className="mx-auto max-w-full" />
            </div>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="banner-url">Banner image URL</Label>
        <Input id="banner-url" type="url" value={header.bannerUrl} onChange={(event) => setHeader({ bannerUrl: event.currentTarget.value })} placeholder="https://example.com/banner.png" />
      </div>
    </div>
  );
}