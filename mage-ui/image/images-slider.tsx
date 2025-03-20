"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: {
  images: string[];
  children: React.ReactNode;
  overlay?: boolean;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    const loadPromises = images.map((image) =>
      new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.src = image;
        img.onload = () => resolve(image);
        img.onerror = reject;
      })
    );

    Promise.all(loadPromises)
      .then((loaded) => {
        setLoadedImages(loaded);
        setLoading(false);
      })
      .catch((error) => console.error("Failed to load images", error));
  }, [images]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % images.length);
      if (event.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    let interval: NodeJS.Timeout;
    if (autoplay) interval = setInterval(() => setCurrentIndex((prev) => (prev + 1) % images.length), 5000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [autoplay, images.length]);

  const slideVariants = {
    initial: { scale: 0, opacity: 0, rotateX: 45 },
    visible: { scale: 1, rotateX: 0, opacity: 1, transition: { duration: 0.5, ease: [0.645, 0.045, 0.355, 1.0] } },
    upExit: { opacity: 1, y: "-150%", transition: { duration: 1 } },
    downExit: { opacity: 1, y: "150%", transition: { duration: 1 } },
  };

  return (
    <div className={cn("overflow-hidden h-full w-full relative flex items-center justify-center", className)} style={{ perspective: "1000px" }}>
      {loadedImages.length > 0 && children}
      {loadedImages.length > 0 && overlay && <div className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)} />}
      {loadedImages.length > 0 && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            className="image h-full w-full absolute inset-0 object-cover object-center"
          />
        </AnimatePresence>
      )}
    </div>
  );
};

const ImagesSliderDemo = () => {
  const images = [
    "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop",
  ];
  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div initial={{ opacity: 0, y: -80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="z-50 flex flex-col justify-center items-center">
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          The hero section slideshow <br /> nobody asked for
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <span>Join now →</span>
          <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
};

export default ImagesSliderDemo;