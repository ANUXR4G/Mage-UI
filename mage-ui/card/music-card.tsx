"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, MotionStyle, Transition } from "framer-motion";
import React from "react";
import { Play, SkipBack, SkipForward } from "lucide-react";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  transition?: Transition;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
}

const BorderBeam: React.FC<BorderBeamProps> = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn(
          "absolute aspect-square",
          "bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
          className
        )}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          ...style,
        } as MotionStyle}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
};

const MusicPlayer: React.FC = () => {
  return (
    <Card className="relative w-[350px] overflow-hidden">
      <CardHeader>
        <CardTitle>Now Playing</CardTitle>
        <CardDescription>Stairway to Heaven - Led Zeppelin</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          <div className="h-48 w-48 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500" />
          <div className="h-1 w-full rounded-full bg-secondary">
            <div className="h-full w-1/3 rounded-full bg-primary" />
          </div>
          <div className="flex w-full justify-between text-sm text-muted-foreground">
            <span>2:45</span>
            <span>8:02</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full">
          <SkipBack className="size-4" />
        </Button>
        <Button size="icon" className="rounded-full">
          <Play className="size-4" />
        </Button>
        <Button variant="outline" size="icon" className="rounded-full">
          <SkipForward className="size-4" />
        </Button>
      </CardFooter>
      <BorderBeam duration={6} size={400} className="from-transparent via-red-500 to-transparent" />
      <BorderBeam duration={6} delay={3} size={400} className="from-transparent via-blue-500 to-transparent" />
    </Card>
  );
};

const Page: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <MusicPlayer />
    </div>
  );
};

export default Page;
