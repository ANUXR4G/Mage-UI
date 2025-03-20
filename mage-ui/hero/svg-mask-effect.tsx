"use client";

import React, { useState, useRef } from "react";
import maskSvg from "@/public/mask.svg";

// Utility function for combining classnames
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// MaskContainer Component
const MaskContainer = ({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className
}: {
  children?: React.ReactNode;
  revealText?: React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const updateMousePosition = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const maskSize = isHovered ? revealSize : size;

  return (
    <div
      ref={containerRef}
      className={cn("relative h-screen transition-colors duration-300", className)}
      style={{
        backgroundColor: isHovered ? "var(--slate-900)" : "var(--white)",
      }}
      onMouseMove={updateMousePosition}
    >
      <div
        className="absolute flex h-full w-full items-center justify-center bg-black text-6xl dark:bg-white"
        style={{
          maskImage: `url(${maskSvg.src})`,
          maskRepeat: "no-repeat",
          maskSize: `${maskSize}px`,
          WebkitMaskImage: `url(${maskSvg.src})`,
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: `${maskSize}px`,
          maskPosition: `${mousePosition.x - maskSize / 2}px ${mousePosition.y - maskSize / 2}px`,
          WebkitMaskPosition: `${mousePosition.x - maskSize / 2}px ${mousePosition.y - maskSize / 2}px`,
          transition: "mask-size 0.3s ease-in-out, -webkit-mask-size 0.3s ease-in-out",
        }}
      >
        <div className="absolute inset-0 z-0 h-full w-full bg-black opacity-50 dark:bg-white" />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-20 mx-auto max-w-4xl text-center text-4xl font-bold"
        >
          {children}
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-center">
        {revealText}
      </div>
    </div>
  );
};

// Main component that uses the MaskContainer
const SVGMaskEffectDemo = () => {
  return (
    <div className="flex h-[40rem] w-full items-center justify-center overflow-hidden">
      <MaskContainer
        revealText={
          <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-slate-800 dark:text-white">
            The first rule of MRR Club is you do not talk about MRR Club.
            The second rule of MRR Club is you DO NOT talk about MRR Club.
          </p>
        }
        className="h-[40rem] rounded-md border text-white dark:text-black"
      >
        Discover the power of{" "}
        <span className="text-blue-500">Tailwind CSS v4</span> with native CSS variables
        and container queries with{" "}
        <span className="text-blue-500">advanced animations</span>.
      </MaskContainer>
    </div>
  );
};

// Export the page component
export default function MaskEffectPage() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950">
      <SVGMaskEffectDemo />
    </div>
  );
}