"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ContentItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

interface StickyScrollProps {
  content: ContentItem[];
  contentClassName?: string;
}

export const StickyScroll: React.FC<StickyScrollProps> = ({
  content,
  contentClassName,
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = ["#0f172a", "#000000", "#171717"];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex h-[30rem] w-full flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-10 overflow-y-auto rounded-md p-6 md:p-10"
      ref={ref}
    >
      <div className="relative flex items-start px-2 md:px-4 w-full md:w-1/2">
        <div className="max-w-4xl w-full">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-16 md:my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-xl md:text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-sm md:text-base mt-4 md:mt-10 max-w-lg text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 h-60 w-full md:w-96 overflow-hidden rounded-md",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};

const content: ContentItem[] = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white bg-gradient-to-br from-cyan-500 to-emerald-500">
        Collaborative Editing
      </div>
    ),
  },
  {
    title: "Real time changes",
    description: "See changes as they happen.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Version control",
    description: "Experience real-time updates and never stress about version control again.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white bg-gradient-to-br from-orange-500 to-yellow-500">
        Version control
      </div>
    ),
  },
  {
    title: "Running out of content",
    description: "Stay in the loop, keep your team aligned, and maintain the flow of your work.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white bg-gradient-to-br from-cyan-500 to-emerald-500">
        Running out of content
      </div>
    ),
  },
];

const StickyScrollRevealDemo: React.FC = () => {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
};

export default StickyScrollRevealDemo;