"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";


interface BoxRevealProps {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  boxColor?: string;
  duration?: number;
}

export const BoxReveal = ({
  children,
  width = "fit-content",
  boxColor = "#f59e0a",
  duration,
}: BoxRevealProps) => {
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
      mainControls.start("visible");
    } else {
      slideControls.start("hidden");
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: duration ? duration : 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: duration ? duration : 0.5, ease: "easeIn" }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor,
        }}
      />
    </div>
  );
};


export function BoxRevealDemo() {
  return (
    <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={"#f59e0a"} duration={0.5}>
        <p className="text-[3.5rem] font-semibold text-black dark:text-white">
          Magic UI<span className="text-[#f59e0a]">.</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#f59e0a"} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1rem] text-black dark:text-white">
          UI library for{" "}
          <span className="text-[#f59e0a]">Design Engineers</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#f59e0a"} duration={0.5}>
        <div className="mt-6">
          <p>
            <p className="text-black dark:text-white">-&gt; 20+ free and open-source animated components built with </p>
            <span className="font-semibold text-[#f59e0a]">React</span>,
            <span className="font-semibold text-[#f59e0a]">Typescript</span>,
            <span className="font-semibold text-[#f59e0a]">Tailwind CSS</span>,
            and
            <span className="font-semibold text-[#f59e0a]">Motion</span>
            . <br />
            <p className="text-black dark:text-white">-&gt; 100% open-source, and customizable.</p> <br />
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#f59e0a"} duration={0.5}>
        <Button className="mt-[1.6rem] bg-[#f59e0a]">Explore</Button>
      </BoxReveal>
    </div>
  );
}
