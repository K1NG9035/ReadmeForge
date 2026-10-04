"use client";

import { useState } from "react";
import { Copy, Eye, FileCode2 } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const previewSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div ?? []), "align"],
    h1: [...(defaultSchema.attributes?.h1 ?? []), "align"],
    p: [...(defaultSchema.attributes?.p ?? []), "align"],
    img: [...(defaultSchema.attributes?.img ?? []), "src", "alt", "width", "height"]
  }
};

const markdownComponents: Components = {
  img: (props) => {
    const { node, ...imageProps } = props;
    void node;
    return (
      <img
        {...imageProps}
        alt={imageProps.alt ?? ""}
        loading="lazy"
        className={`mx-auto h-auto max-w-full ${imageProps.className ?? ""}`}
        onError={(event) => event.currentTarget.classList.add("hidden")}
      />
    );
  }
};

interface PreviewPaneProps {
  markdown: string;
}

export function PreviewPane({ markdown }: PreviewPaneProps) {
  const [tab, setTab] = useState("preview");

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast.success("Markdown copied");
    } catch {
      toast.error("Clipboard access is unavailable");
    }
  };

  return (
    <section aria-label="README preview" className="flex min-w-0 flex-col">
      <Tabs value={tab} onValueChange={setTab} className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Output</p>
            <h2 className="mt-1 text-lg font-semibold">README.md</h2>
          </div>
          <TabsList className="h-9">
            <TabsTrigger value="preview" className="gap-2 px-3"><Eye className="size-3.5" /> Preview</TabsTrigger>
            <TabsTrigger value="raw" className="gap-2 px-3"><FileCode2 className="size-3.5" /> Raw Markdown</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="mt-0 min-w-0 p-4 sm:p-7">
          <article className="markdown-body prose prose-sm mx-auto min-h-[34rem] max-w-4xl overflow-hidden rounded-lg border border-border bg-card px-5 py-7 text-card-foreground shadow-sm sm:px-9 sm:py-10 dark:prose-invert [&_a]:break-words [&_code]:break-words [&_img]:max-w-full [&_pre]:max-w-full [&_pre]:overflow-x-auto">
            {markdown.trim() ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, [rehypeSanitize, previewSchema]]} components={markdownComponents}>
                {markdown}
              </ReactMarkdown>
            ) : <p className="text-muted-foreground">Your preview will appear here.</p>}
          </article>
        </TabsContent>
        <TabsContent value="raw" className="mt-0 min-w-0 p-4 sm:p-7">
          <div className="min-h-[34rem] overflow-hidden rounded-lg border border-border bg-[#fafafa] shadow-sm dark:bg-[#151515]">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <span className="text-xs font-medium text-muted-foreground">Markdown source</span>
              <Button type="button" variant="ghost" size="icon" aria-label="Copy raw Markdown" onClick={copyMarkdown}>
                <Copy className="size-4" />
              </Button>
            </div>
            <div className="max-h-[70vh] overflow-auto p-4">
              <SyntaxHighlighter language="markdown" useInlineStyles={false} wrapLongLines PreTag="div" className="readme-source">
                {markdown}
              </SyntaxHighlighter>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}