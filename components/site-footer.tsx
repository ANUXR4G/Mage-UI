"use client";

import { usePathname } from "next/navigation";

import NewsletterSection from "@/app/_landing/newsletter";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const pathname = usePathname();
  return (
    <footer
      className={cn("container mb-36 flex flex-col justify-between py-4 md:py-6", {
        "border-t border-t-border": pathname === "/",
      })}
    >
      <NewsletterSection />
      <div className="group mx-auto mt-16 w-fit items-center text-center">
        <div className="flex gap-1 flex-wrap justify-center">
          <div className="flex gap-1">
            <Icons.logo className="h-6 w-6 origin-[top_center] animate-[swing] transition-all duration-1000 ease-in-out direction-alternate repeat-infinite" />
            <span>age-UI</span>
          </div>
          <p className="text-muted-foreground">by</p>
          <div className="block sm:inline w-full sm:w-auto">
            <span>ANUXR4G & JUST_ARVINDRA</span>
          </div>
        </div>
      </div>

    </footer>
  );
}

