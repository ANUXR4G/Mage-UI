"use client";

import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  return (
    <li
      ref={slideRef}
      className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10"
      onClick={() => handleSlideClick(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: current !== index ? "scale(0.98) rotateX(8deg)" : "scale(1) rotateX(0deg)",
        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        transformOrigin: "bottom",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out">
        <img
          className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
          alt={slide.title}
          src={slide.src}
          loading="eager"
          decoding="sync"
          style={{ opacity: current === index ? 1 : 0.5 }}
        />
        {current === index && <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />}
      </div>
      <article className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${current === index ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold relative">{slide.title}</h2>
        <button className="mt-6 px-4 py-2 text-black bg-white h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200">
          {slide.button}
        </button>
      </article>
    </li>
  );
};

const Carousel = ({ slides }: { slides: SlideData[] }) => {
  const [current, setCurrent] = useState(0);
  const id = useId();

  return (
    <div className="relative w-[70vmin] h-[70vmin] mx-auto" aria-labelledby={`carousel-heading-${id}`}>
      <ul className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${current * (100 / slides.length)}%)` }}>
        {slides.map((slide, index) => (
          <Slide key={index} slide={slide} index={index} current={current} handleSlideClick={setCurrent} />
        ))}
      </ul>
      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <button className="w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 rotate-180" onClick={() => setCurrent(current - 1 < 0 ? slides.length - 1 : current - 1)}>
          <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
        </button>
        <button className="w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200" onClick={() => setCurrent((current + 1) % slides.length)}>
          <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
        </button>
      </div>
    </div>
  );
};

export default function CarouselDemo() {
  const slideData: SlideData[] = [
    { title: "Mystic Mountains", button: "Explore", src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534" },
    { title: "Urban Dreams", button: "Explore", src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387" },
    { title: "Neon Nights", button: "Explore", src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456" },
    { title: "Desert Whispers", button: "Explore", src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540" },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
