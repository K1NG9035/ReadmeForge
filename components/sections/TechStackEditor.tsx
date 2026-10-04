"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { badgeCatalog } from "@/lib/badges";
import type { TechCategory } from "@/types/readme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useReadmeStore } from "@/store/readmeStore";

const categories: { id: TechCategory; label: string }[] = [
  { id: "languages", label: "Languages" },
  { id: "frameworks", label: "Frameworks" },
  { id: "cloud", label: "Cloud" },
  { id: "databases", label: "Databases" },
  { id: "tools", label: "Tools" }
];

function badgeUrl(label: string, color: string, logo: string, logoColor: string, style: string): string {
  const escapedLabel = label.replaceAll("-", "--").replaceAll("_", "__").replaceAll(" ", "_");
  return `https://img.shields.io/badge/${encodeURIComponent(escapedLabel)}-${color}?style=${style}&logo=${encodeURIComponent(logo)}&logoColor=${encodeURIComponent(logoColor)}`;
}

export function TechStackEditor() {
  const selectedIds = useReadmeStore((state) => state.techStack.selectedIds);
  const style = useReadmeStore((state) => state.techStack.style);
  const toggleTech = useReadmeStore((state) => state.toggleTech);
  const setTechStyle = useReadmeStore((state) => state.setTechStyle);
  const [query, setQuery] = useState("");
  const matchingBadges = (category: TechCategory) => badgeCatalog.filter((badge) =>
    badge.category === category && badge.label.toLowerCase().includes(query.trim().toLowerCase())
  );
  const selectedBadges = selectedIds.map((id) => badgeCatalog.find((badge) => badge.id === id)).filter((badge) => badge !== undefined);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="badge-search">Search badges</Label>
        <Input id="badge-search" value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Search 85 technologies" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="badge-style">Badge style</Label>
        <Select value={style} onValueChange={(value) => setTechStyle(value as typeof style)}>
          <SelectTrigger id="badge-style"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="flat">Flat</SelectItem>
            <SelectItem value="flat-square">Flat square</SelectItem>
            <SelectItem value="for-the-badge">For the badge</SelectItem>
            <SelectItem value="plastic">Plastic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="languages">
        <TabsList className="grid h-auto w-full grid-cols-5 bg-muted/70 p-1">
          {categories.map((category) => <TabsTrigger key={category.id} value={category.id} className="px-1.5 text-xs">{category.label}</TabsTrigger>)}
        </TabsList>
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-3">
            <div className="grid grid-cols-2 gap-2">
              {matchingBadges(category.id).map((badge) => {
                const selected = selectedIds.includes(badge.id);
                return (
                  <button key={badge.id} type="button" aria-pressed={selected} onClick={() => toggleTech(badge.id)} className={`flex min-h-12 min-w-0 flex-col items-start justify-center gap-1 rounded-md border px-2 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected ? "border-primary/60 bg-primary/5" : "border-border bg-background hover:bg-muted/60"}`}>
                    <img src={badgeUrl(badge.label, badge.color, badge.logo, badge.logoColor, style)} alt={`${badge.label} badge preview`} loading="lazy" className="h-5 max-w-full object-contain" />
                    <span className="max-w-full truncate text-xs text-muted-foreground">{badge.label}</span>
                  </button>
                );
              })}
              {matchingBadges(category.id).length === 0 && <p className="col-span-2 py-4 text-center text-sm text-muted-foreground">No badges match that search.</p>}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="space-y-2 border-t pt-4">
        <div className="flex items-center justify-between">
          <Label>Selected badges</Label>
          <span className="text-xs text-muted-foreground">{selectedBadges.length}</span>
        </div>
        {selectedBadges.length ? (
          <ul className="space-y-1">
            {selectedBadges.map((badge) => (
              <li key={badge.id} className="flex min-w-0 items-center justify-between gap-2 rounded-md bg-muted/50 px-2 py-1.5">
                <span className="truncate text-sm">{badge.label}</span>
                <Button type="button" variant="ghost" size="icon" aria-label={`Remove ${badge.label}`} onClick={() => toggleTech(badge.id)}>
                  <X className="size-4" />
                </Button>
              </li>
            ))}
          </ul>
        ) : <p className="text-sm text-muted-foreground">Choose technologies to add badge previews.</p>}
      </div>
    </div>
  );
}