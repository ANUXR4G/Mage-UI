"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration || 1,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black text-2xl leading-snug tracking-wide">
          <motion.div ref={scope}>
            {wordsArray.map((word, idx) => (
              <motion.span
                key={word + idx}
                className="dark:text-white text-black opacity-0"
                style={{ filter: filter ? "blur(10px)" : "none" }}
              >
                {word} {" "}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const words = `MageUI is a powerful and flexible UI library designed to streamline frontend development with a rich collection of pre-built, customizable components. It emphasizes performance, accessibility, and seamless integration with modern frameworks like React and Vue. With a focus on clean design and developer-friendly APIs, MageUI enables faster UI development while maintaining high-quality aesthetics. Its modular architecture ensures lightweight and efficient rendering, making it ideal for building scalable applications.`;

export default function TextGenerateEffectPage() {
  return <TextGenerateEffect words={words} />;
}
