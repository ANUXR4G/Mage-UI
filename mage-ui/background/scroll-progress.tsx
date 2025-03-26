"use client";

import React, { useRef } from "react";
import { motion, MotionProps, useScroll, useTransform, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// Scroll Progress Component
interface ScrollProgressProps extends Omit<HTMLMotionProps<"div">, "ref"> { }

const ScrollProgress = React.forwardRef<HTMLDivElement, ScrollProgressProps>(
  ({ className, ...props }, ref) => {
    const { scrollYProgress } = useScroll();

    return (
      <motion.div
        ref={ref}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
          className
        )}
        style={{
          scaleX: scrollYProgress,
        }}
        {...props}
      />
    );
  }
);

ScrollProgress.displayName = "ScrollProgress";

// Parallax Card Component
const ParallaxCard = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax effect for card and background
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-purple-100 to-pink-100"
      />

      {/* Parallax Card */}
      <motion.div
        style={{ y: cardY }}
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
        <div className="w-96 bg-white shadow-2xl rounded-xl p-6 transform transition-transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Parallax Scroll Experience
          </h2>
          <p className="text-gray-600">
            As you scroll, watch how this card and background move with a
            subtle parallax effect. The progress bar at the top tracks
            your scrolling journey.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// Main Page Component
export default function ParallaxScrollPage() {
  return (
    <div className="sticky min-h-screen">
      {/* Sticky Progress Bar */}
      <ScrollProgress className="sticky top-0" />

      {/* Long Scrollable Content */}
      <div className="space-y-8 pt-1">
        <div className="h-screen flex items-center justify-center bg-gray-50">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Parallax Scroll
          </h1>
        </div>


        <ParallaxCard />

        <div className="h-screen flex items-center justify-center bg-gray-100">
          <p className="text-2xl text-gray-700">
            Scroll to explore the parallax effect
          </p>
        </div>
      </div>
    </div >
  );
}