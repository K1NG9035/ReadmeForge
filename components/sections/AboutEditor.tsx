"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useReadmeStore } from "@/store/readmeStore";

export function AboutEditor() {
  const items = useReadmeStore((state) => state.about.items);
  const addAboutItem = useReadmeStore((state) => state.addAboutItem);
  const updateAboutItem = useReadmeStore((state) => state.updateAboutItem);
  const removeAboutItem = useReadmeStore((state) => state.removeAboutItem);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <Label htmlFor={`about-${item.id}`}>About line {index + 1}</Label>
            <Button type="button" variant="ghost" size="icon" aria-label={`Remove about line ${index + 1}`} onClick={() => removeAboutItem(item.id)}>
              <Trash2 className="size-4" />
            </Button>
          </div>
          <Textarea id={`about-${item.id}`} value={item.text} onChange={(event) => updateAboutItem(item.id, event.currentTarget.value)} placeholder="🌱 I'm currently learning..." rows={2} />
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addAboutItem}>
        <Plus className="mr-2 size-4" /> Add about line
      </Button>
    </div>
  );
}