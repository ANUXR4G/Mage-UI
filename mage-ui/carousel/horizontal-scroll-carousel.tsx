"use client";
import { motion, useTransform, useScroll, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const HorizontalScrollCarouselComponent = () => {
  return (
    <div className="bg-neutral-800">
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll down
        </span>
      </div>
      <HorizontalScrollCarousel />
      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span>
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const scrollX = useMotionValue(0);
  const [isScrolling, setIsScrolling] = useState(true); // State to manage scrolling

  const totalWidth = cards.length * 450; // 450px per card
  const maxScroll = -(totalWidth - window.innerWidth); // Max scroll distance

  // Handle wheel scroll for horizontal movement
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (targetRef.current && targetRef.current.contains(event.target as Node)) {
        event.preventDefault(); // Prevent vertical scroll while in carousel
        if (isScrolling) {
          const delta = event.deltaY * -0.5; // Adjust scroll speed
          const newX = Math.min(0, Math.max(maxScroll, scrollX.get() + delta));
          scrollX.set(newX);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [scrollX, maxScroll, isScrolling]);

  // Determine if scroll has reached the end
  const isScrollComplete = scrollX.get() <= maxScroll + 10; // Small buffer

  // Update scrolling state based on completion
  useEffect(() => {
    setIsScrolling(!isScrollComplete);
  }, [isScrollComplete]);

  return (
    <section ref={targetRef} className="relative h-screen bg-neutral-900">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <motion.div
          ref={carouselRef}
          style={{ x: scrollX }}
          className="flex gap-4"
        >
          {cards.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </motion.div>
        <motion.div
          className="mt-4 text-neutral-500 font-semibold uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrollComplete ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isScrollComplete ? "End of Carousel - Scroll Down to Continue" : "Keep Scrolling Right"}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[350px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className="bg-gradient-to-br from-white/20 to-white/0 p-8 text-6xl font-black uppercase text-white backdrop-blur-lg">
          {card.title}
        </p>
      </div>
    </div>
  );
};

export default HorizontalScrollCarouselComponent;

type CardType = {
  url: string;
  title: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: "https://images.unsplash.com/photo-1635373670332-43ea883bb081?q=80&w=2781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Title 1",
    id: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Title 2",
    id: 2,
  },
  {
    url: "https://images.unsplash.com/photo-1503751071777-d2918b21bbd9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Title 3",
    id: 3,
  },
  {
    url: "https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=2609&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Title 4",
    id: 4,
  },
  {
    url: "https://images.unsplash.com/photo-1602212096437-d0af1ce0553e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Title 5",
    id: 5,
  },
  {
    url: "https://images.unsplash.com/photo-1622313762347-3c09fe5f2719?q=80&w=2640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Title 6",
    id: 6,
  },
];
