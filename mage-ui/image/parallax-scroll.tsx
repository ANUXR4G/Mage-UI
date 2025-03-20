"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxScrollProps {
  images: string[];
  className?: string;
}

const ParallaxScroll: React.FC<ParallaxScrollProps> = ({ images, className }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove if container is not fixed height
    offset: ["start start", "end start"], // remove if container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div className={cn("h-[40rem] items-start overflow-y-auto w-full", className)} ref={gridRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10">
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div style={{ y: translateFirst }} key={`grid-1-${idx}`}>
              <Image
                src={el}
                className="h-80 w-full object-cover object-left-top rounded-lg"
                height={400}
                width={400}
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={`grid-2-${idx}`}>
              <Image
                src={el}
                className="h-80 w-full object-cover object-left-top rounded-lg"
                height={400}
                width={400}
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div style={{ y: translateThird }} key={`grid-3-${idx}`}>
              <Image
                src={el}
                className="h-80 w-full object-cover object-left-top rounded-lg"
                height={400}
                width={400}
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const images: string[] = [
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=3387&q=80",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&w=3070&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=3540&q=80",
  "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=2640&q=80",
];

const ParallaxScrollPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ParallaxScroll images={images} />
    </div>
  );
};

export default ParallaxScrollPage;
