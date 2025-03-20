"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import AImage from "@/public/android-chrome-192x192.png";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  // Enhanced gradients with brighter colors for shine effect
  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(210, 100%, 70%) 0%, rgba(0, 0, 0, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(280, 100%, 70%) 0%, rgba(0, 0, 0, 0) 100%)",
    BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, hsl(140, 100%, 70%) 0%, rgba(0, 0, 0, 0) 100%)",
    RIGHT: "radial-gradient(16.2% 41.2% at 100% 50%, hsl(40, 100%, 70%) 0%, rgba(0, 0, 0, 0) 100%)",
  };

  // New shining gradient with multiple color stops for rainbow effect
  const shineHighlight =
    "linear-gradient(45deg, hsla(0, 100%, 70%, 1) 0%, hsla(60, 100%, 70%, 1) 25%, hsla(120, 100%, 70%, 1) 50%, hsla(240, 100%, 70%, 1) 75%, hsla(300, 100%, 70%, 1) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
        containerClassName
      )}
      {...props}
    >
      <div className={cn("w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]", className)}>
        {children}
      </div>
      <motion.div
        className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        style={{
          filter: hovered ? "blur(3px) brightness(1.5)" : "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered ? shineHighlight : movingMap[direction],
          backgroundSize: hovered ? "200% 200%" : "100% 100%",
        }}
        transition={{
          ease: "linear",
          duration: duration ?? 1,
          backgroundPosition: hovered ?
            ["0% 0%", "100% 100%"] :
            undefined,
          repeat: hovered ? Infinity : 0,
          repeatType: "reverse"
        }}
      />
      <div className="bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]" />
    </Tag>
  );
}

export default function HoverBorderGradientDemo() {
  return (
    <div className="m-40 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <Image
          src={AImage}
          alt="Logo"
          width={70}
          height={70}
          className="h-3 w-3"
        />
        <span>Mage UI</span>
      </HoverBorderGradient>
    </div>
  );
}