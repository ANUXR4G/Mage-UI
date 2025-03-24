"use client";

import React, { useState, useEffect } from "react";

const CutOut: React.FC = () => {
  return (
    <div className="h-screen w-[90vw]"> {/* Added h-screen and w-[90vw] */}
      <CutoutTextLoader
        height="100%"  // Changed to 100% to fill the parent
        background="white"
        imgUrl="https://images.unsplash.com/photo-1635373670332-43ea883bb081?q=80&w=2781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  );
};

interface CutoutTextLoaderProps {
  height: string;
  background: string;
  imgUrl: string;
}

const CutoutTextLoader: React.FC<CutoutTextLoaderProps> = ({
  height,
  background,
  imgUrl,
}) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false); // State to track image loading

  useEffect(() => {
    const img = new Image();
    img.src = imgUrl;

    img.onload = () => {
      setImageLoaded(true);
    };

    img.onerror = () => {
      console.error("Error loading image:", imgUrl);
      // Handle the error appropriately (e.g., display a fallback image)
    };

    return () => {
      // Cleanup: Remove the event listeners when the component unmounts
      img.onload = null;
      img.onerror = null;
    };
  }, [imgUrl]);

  return (
    <div className="relative h-full" style={{ height }}> {/* h-full to take the full height of its parent */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          opacity: imageLoaded ? 1 : 0, // Initially hide the image
          transition: "opacity 0.5s ease-in-out", // Fade in when loaded
        }}
      />
      <div
        style={{ background }}
        className={`absolute inset-0 z-10 ${!imageLoaded ? "animate-pulse" : "animate-pulse"}`} // Conditionally apply animation
      />
      <span
        className="font-black absolute inset-0 z-20 text-center bg-clip-text text-transparent pointer-events-none items-center flex justify-center"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          fontSize: "clamp(3rem, 12vw, 10rem)",
          lineHeight: height,
        }}
      >
        Loading...
      </span>
    </div>
  );
};

export default CutOut;
