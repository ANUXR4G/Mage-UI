"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Card {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
}

interface LayoutGridProps {
  cards: Card[];
}

export const LayoutGrid: React.FC<LayoutGridProps> = ({ cards }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full min-h-screen p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-6 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "h-96")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden",
              selected?.id === card.id
                ? "rounded-lg cursor-pointer absolute inset-0 h-3/4 w-full md:w-3/4 m-auto z-50 flex justify-start items-start flex-wrap flex-col"
                : lastSelected?.id === card.id
                  ? "z-40 bg-white rounded-xl h-full w-full"
                  : "bg-white rounded-xl h-full w-full"
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id ? (
              <SelectedCard selected={selected} />
            ) : (
              <ImageComponent card={card} />
            )}
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const ImageComponent: React.FC<{ card: Card }> = ({ card }) => {
  return (
    <div className="relative h-full w-full">
      <motion.img
        layoutId={`image-${card.id}-image`}
        src={card.thumbnail}
        alt="thumbnail"
        className="object-cover object-top absolute inset-0 h-full w-full transition duration-200"
      />
    </div>
  );
};

const SelectedCard: React.FC<{ selected: Card }> = ({ selected }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      {/* Image component inside the selected card */}
      <motion.img
        layoutId={`image-${selected.id}-image`}
        src={selected.thumbnail}
        alt="thumbnail"
        className="object-cover object-top absolute inset-0 h-full w-full"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.div
        layoutId={`content-${selected.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected.content}
      </motion.div>
    </div>
  );
};

export function LayoutGridDemo() {
  return (
    <div className="min-h-[260vh] py-20 min-w-[220vh]">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">House in the woods</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      A serene and tranquil retreat, this house in the woods offers a peaceful escape from the hustle and bustle of city life.
    </p>
  </div>
);

const SkeletonTwo = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">House above the clouds</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Perched high above the world, this house offers breathtaking views and a unique living experience.
    </p>
  </div>
);

const SkeletonThree = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">Greens all over</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      A house surrounded by greenery and nature's beauty. It's the perfect place to relax, unwind, and enjoy life.
    </p>
  </div>
);

const SkeletonFour = () => (
  <div>
    <p className="font-bold md:text-4xl text-xl text-white">Rivers are serene</p>
    <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      A house by the river is a place of peace and tranquility. It's the perfect place to relax and enjoy life.
    </p>
  </div>
);

const cards: Card[] = [
  { id: 1, content: <SkeletonOne />, className: "md:col-span-2", thumbnail: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop" },
  { id: 2, content: <SkeletonTwo />, className: "col-span-1", thumbnail: "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop" },
  { id: 3, content: <SkeletonThree />, className: "col-span-1", thumbnail: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop" },
  { id: 4, content: <SkeletonFour />, className: "md:col-span-2", thumbnail: "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop" }
];