"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useReadmeStore } from "@/store/readmeStore";

const providers = [
  { key: "buyMeACoffee", label: "Buy Me a Coffee", placeholder: "username or profile URL" },
  { key: "patreon", label: "Patreon", placeholder: "username or profile URL" },
  { key: "kofi", label: "Ko-fi", placeholder: "username or profile URL" }
] as const;

export function SupportEditor() {
  const support = useReadmeStore((state) => state.support);
  const setSupport = useReadmeStore((state) => state.setSupport);

  return (
    <div className="space-y-4">
      {providers.map((provider) => (
        <div key={provider.key} className="space-y-2">
          <Label htmlFor={`support-${provider.key}`}>{provider.label}</Label>
          <Input id={`support-${provider.key}`} value={support[provider.key]} onChange={(event) => setSupport({ [provider.key]: event.currentTarget.value })} placeholder={provider.placeholder} />
        </div>
      ))}
    </div>
  );
}