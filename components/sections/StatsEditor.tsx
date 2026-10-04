"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useReadmeStore } from "@/store/readmeStore";

const statOptions = [
  { key: "showStats", label: "GitHub stats card" },
  { key: "showStreak", label: "Contribution streak" },
  { key: "showTopLangs", label: "Top languages" },
  { key: "showTrophies", label: "Profile trophies" }
] as const;

export function StatsEditor() {
  const stats = useReadmeStore((state) => state.stats);
  const setStats = useReadmeStore((state) => state.setStats);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="github-username">GitHub username</Label>
        <Input id="github-username" autoComplete="off" value={stats.username} onChange={(event) => setStats({ username: event.currentTarget.value })} placeholder="octocat" />
      </div>
      <div className="space-y-2">
        {statOptions.map((option) => (
          <div key={option.key} className="flex items-center justify-between gap-3 rounded-md border px-3 py-2.5">
            <Label htmlFor={option.key} className="cursor-pointer text-sm">{option.label}</Label>
            <Switch id={option.key} checked={stats[option.key]} onCheckedChange={(checked) => setStats({ [option.key]: checked })} />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="stats-theme">Widget theme</Label>
        <Select value={stats.theme} onValueChange={(theme) => setStats({ theme: theme as typeof stats.theme })}>
          <SelectTrigger id="stats-theme"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="nord">Nord</SelectItem>
            <SelectItem value="dracula">Dracula</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}