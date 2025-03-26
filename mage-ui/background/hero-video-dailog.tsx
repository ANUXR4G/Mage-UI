"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

const animationVariants = {
  "from-bottom": { initial: { y: "100%", opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: "100%", opacity: 0 } },
  "from-center": { initial: { scale: 0.5, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.5, opacity: 0 } },
  "from-top": { initial: { y: "-100%", opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: "-100%", opacity: 0 } },
  "from-left": { initial: { x: "-100%", opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: "-100%", opacity: 0 } },
  "from-right": { initial: { x: "100%", opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: "100%", opacity: 0 } },
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  "top-in-bottom-out": { initial: { y: "-100%", opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: "100%", opacity: 0 } },
  "left-in-right-out": { initial: { x: "-100%", opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: "100%", opacity: 0 } },
};

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];

  return (
    <div className={cn("relative", className)}>
      <div className="group relative cursor-pointer" onClick={() => setIsVideoOpen(true)}>
        <img src={thumbnailSrc} alt={thumbnailAlt} className="w-full rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-28 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md">
            <div className="relative flex size-20 items-center justify-center rounded-full bg-gradient-to-b from-primary/30 to-primary shadow-md group-hover:scale-105">
              <Play className="size-8 text-white" />
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsVideoOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
            <motion.div {...selectedAnimation} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="relative mx-4 aspect-video w-full max-w-4xl">
              <button className="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-xl text-white" onClick={() => setIsVideoOpen(false)}>
                <X className="size-5" />
              </button>
              <div className="relative size-full overflow-hidden rounded-2xl border-2 border-white">
                <iframe src={videoSrc} className="size-full rounded-2xl" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HeroVideoDialogDemo() {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/2FhgKp_lfJQ"
        thumbnailSrc="https://i.ytimg.com/vi/2FhgKp_lfJQ/hqdefault.jpg"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/2FhgKp_lfJQ"
        thumbnailSrc="https://i.ytimg.com/vi/2FhgKp_lfJQ/hqdefault.jpg"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
