'use client';

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

// ✅ Export the projects array
export const projects = [
  {
    title: "Stripe",
    description: "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description: "A streaming service offering movies and TV shows.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description: "A multinational technology company specializing in Internet services.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description: "A technology company focused on social media and VR.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description: "A multinational company focusing on e-commerce and cloud computing.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description: "A company developing software, electronics, and cloud services.",
    link: "https://microsoft.com",
  },
];

export default function CardHoverEffectPage() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <HoverEffect items={projects} />
    </div>
  );
}

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div
    className={cn(
      "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
      className
    )}
  >
    <div className="relative z-50">
      <div className="p-4">{children}</div>
    </div>
  </div>
);

export const CardTitle = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>{children}</h4>
);

export const CardDescription = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <p className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>{children}</p>
);