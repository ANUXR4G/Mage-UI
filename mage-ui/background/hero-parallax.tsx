"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroParallaxPage() {
  return <HeroParallax products={products} />;
}

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  // Properly distribute products across the three rows
  const firstRow = products.slice(0, Math.ceil(products.length / 3));
  const secondRow = products.slice(Math.ceil(products.length / 3), Math.ceil(products.length / 3) * 2);
  const thirdRow = products.slice(Math.ceil(products.length / 3) * 2);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Enhanced spring configuration for ultra-smooth animations
  const ultraSmoothSpringConfig = {
    stiffness: 100,  // Reduced from 300 for smoother motion
    damping: 50,     // Increased from 30 for less oscillation
    bounce: 0,       // Removed bounce for more professional movement
    mass: 1.2,       // Added mass for more inertia and natural feel
    restDelta: 0.001 // Small threshold for stopping the animation
  };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 800]),
    ultraSmoothSpringConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -800]),
    ultraSmoothSpringConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    ultraSmoothSpringConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    { ...ultraSmoothSpringConfig, stiffness: 80 } // Slower opacity changes feel smoother
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    ultraSmoothSpringConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.3], [-500, 300]), // Adjusted for smoother vertical movement
    ultraSmoothSpringConfig
  );

  return (
    <div
      ref={ref}
      className="h-[620vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="container mx-auto"
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20 justify-center">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title + product.link}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20 justify-center">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title + product.link}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 justify-center">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title + product.link}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        The Ultimate <br /> development studio
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        We build beautiful products with the latest technologies and frameworks.
        We are a team of passionate developers and designers that love to build
        amazing products.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  // Enhanced hover animation for ultra-smooth card movement
  const hoverTransition = {
    type: "spring",
    stiffness: 200,
    damping: 20,
    mass: 1.1
  };

  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{
        y: -20,
        scale: 1.02,
        transition: hoverTransition
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <Link href={product.link} className="block group-hover/product:shadow-2xl">
        <Image
          src={product.thumbnail}
          height={600}
          width={600}
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <motion.div
        className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.8 }}
        transition={{ duration: 0.3 }}
      />
      <motion.h2
        className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white"
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {product.title}
      </motion.h2>
    </motion.div>
  );
};



export const products = [
  { title: "Eiffel Tower", link: "https://www.toureiffel.paris/en", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg" },
  { title: "Colosseum", link: "https://www.coopculture.it/en/colosseo-e-shop.cfm", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg" },
  { title: "Machu Picchu", link: "https://www.peru.travel/en/attractions/machu-picchu", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg" },
  { title: "Colosseum", link: "https://www.coopculture.it/en/colosseo-e-shop.cfm", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg" },
  { title: "Statue of Liberty", link: "https://www.nps.gov/stli/index.htm", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg" },
  { title: "Eiffel Tower", link: "https://www.toureiffel.paris/en", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg" },
  { title: "Statue of Liberty", link: "https://www.nps.gov/stli/index.htm", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg" },
  { title: "Machu Picchu", link: "https://www.peru.travel/en/attractions/machu-picchu", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg" },
  { title: "Colosseum", link: "https://www.coopculture.it/en/colosseo-e-shop.cfm", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg" },
  { title: "Machu Picchu", link: "https://www.peru.travel/en/attractions/machu-picchu", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg" },
];
