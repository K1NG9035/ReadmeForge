"use client";

import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useReadmeStore } from "@/store/readmeStore";
import type { SocialPlatform } from "@/types/readme";

const platforms: { id: SocialPlatform; label: string; placeholder: string }[] = [
  { id: "twitter", label: "X / Twitter", placeholder: "https://x.com/username" },
  { id: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
  { id: "youtube", label: "YouTube", placeholder: "https://youtube.com/@username" },
  { id: "discord", label: "Discord", placeholder: "https://discord.com/users/username" },
  { id: "portfolio", label: "Portfolio", placeholder: "https://example.com" }
];

function isValidWebUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function SocialEditor() {
  const links = useReadmeStore((state) => state.social.links);
  const upsertSocial = useReadmeStore((state) => state.upsertSocial);

  return (
    <div className="space-y-4">
      {platforms.map((platform) => {
        const link = links.find((item) => item.platform === platform.id);
        const url = link?.url ?? "";
        const enabled = link?.enabled ?? false;
        const invalid = url.trim().length > 0 && !isValidWebUrl(url.trim());
        const inputId = `social-${platform.id}`;

        return (
          <div key={platform.id} className="space-y-2 rounded-lg border p-3">
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor={`${inputId}-enabled`} className="cursor-pointer">{platform.label}</Label>
              <Switch id={`${inputId}-enabled`} checked={enabled} onCheckedChange={(checked) => upsertSocial(platform.id, { enabled: checked })} />
            </div>
            <Input id={inputId} type="url" inputMode="url" autoComplete="url" aria-invalid={invalid} aria-describedby={invalid ? `${inputId}-error` : undefined} value={url} onChange={(event) => upsertSocial(platform.id, { url: event.currentTarget.value })} placeholder={platform.placeholder} />
            {invalid && <p id={`${inputId}-error`} className="flex items-center gap-1.5 text-xs text-destructive"><AlertCircle className="size-3.5" /> Enter a valid http or https URL.</p>}
          </div>
        );
      })}
    </div>
  );
}