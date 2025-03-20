"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Icons } from "@/components/icons";
import { config } from "@/config";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  extractClassName?: boolean;
  extractedClassNames?: string;
  align?: "center" | "start" | "end";
  description?: string;
}

export function ComponentPreview({ name, className, ...props }: ComponentPreviewProps) {
  const [minHeight, setMinHeight] = React.useState<number>(350);
  const { resolvedTheme, systemTheme } = useTheme();

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "mage-ui-set-height") {
        setMinHeight(event.data.height);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const previewBaseUrl =
    process.env.NEXT_PUBLIC_STORYBOOK_URL || (config.isProduction ? "/preview" : "http://localhost:6006");

  const theme = resolvedTheme || (typeof window !== "undefined" ? localStorage.getItem("theme") || systemTheme : "light");

  return (
    <div className={cn("group relative", className)} {...props}>
      <div
        className="preview relative w-full max-w-full !overflow-hidden"
        style={{ height: `${Math.max(100, minHeight)}px` }}
      >
        <React.Suspense
          fallback={
            <div className="flex items-center text-sm text-muted-foreground">
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          }
        >
          <iframe
            src={`${previewBaseUrl}/iframe.html?globals=backgrounds.grid:!false;theme:${theme};backgrounds.value:!transparent&viewMode=docs&id=${name}&site:docs=true`}
            className="w-full"
            style={{ height: `${Math.max(100, minHeight)}px` }}
          />
        </React.Suspense>
      </div>
    </div>
  );
}