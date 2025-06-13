import React, { useRef, useEffect, useState, CSSProperties } from "react";
import { gsap } from "gsap";

interface PixelTransitionProps {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  gridSize?: number;
  pixelColor?: string;
  animationStepDuration?: number;
  className?: string;
  style?: CSSProperties;
  aspectRatio?: string;
}

const PixelTransition: React.FC<PixelTransitionProps> = ({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = "currentColor",
  animationStepDuration = 0.3,
  className = "",
  style = {},
  aspectRatio = "100%",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pixelGridRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef<HTMLDivElement | null>(null);
  const delayedCallRef = useRef<gsap.core.Tween | null>(null);

  const [isActive, setIsActive] = useState<boolean>(false);

  const isTouchDevice =
    typeof window !== 'undefined' && (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches
    );

  useEffect(() => {
    const pixelGridEl = pixelGridRef.current;
    if (!pixelGridEl) return;

    pixelGridEl.innerHTML = "";

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixelated-image-card__pixel");
        pixel.classList.add("absolute", "hidden");
        pixel.style.backgroundColor = pixelColor;

        const size = 100 / gridSize;
        pixel.style.width = `${size}%`;
        pixel.style.height = `${size}%`;
        pixel.style.left = `${col * size}%`;
        pixel.style.top = `${row * size}%`;

        pixelGridEl.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  const animatePixels = (activate: boolean): void => {
    setIsActive(activate);

    const pixelGridEl = pixelGridRef.current;
    const activeEl = activeRef.current;
    if (!pixelGridEl || !activeEl) return;

    const pixels = pixelGridEl.querySelectorAll<HTMLDivElement>(
      ".pixelated-image-card__pixel"
    );
    if (!pixels.length) return;

    gsap.killTweensOf(pixels);
    if (delayedCallRef.current) {
      delayedCallRef.current.kill();
    }

    gsap.set(pixels, { display: "none" });

    const totalPixels = pixels.length;
    const staggerDuration = animationStepDuration / totalPixels;

    gsap.to(pixels, {
      display: "block",
      duration: 0,
      stagger: {
        each: staggerDuration,
        from: "random",
      },
    });

    delayedCallRef.current = gsap.delayedCall(animationStepDuration, () => {
      activeEl.style.display = activate ? "block" : "none";
      activeEl.style.pointerEvents = activate ? "none" : "";
    });

    gsap.to(pixels, {
      display: "none",
      duration: 0,
      delay: animationStepDuration,
      stagger: {
        each: staggerDuration,
        from: "random",
      },
    });
  };

  const handleMouseEnter = (): void => {
    if (!isActive) animatePixels(true);
  };
  const handleMouseLeave = (): void => {
    if (isActive) animatePixels(false);
  };
  const handleClick = (): void => {
    animatePixels(!isActive);
  };

  return (
    <div
      ref={containerRef}
      className={`
        ${className}
        bg-[#222]
        text-white
        rounded-[15px]
        border-2
        border-white
        w-[300px]
        max-w-full
        relative
        overflow-hidden
      `}
      style={style}
      onMouseEnter={!isTouchDevice ? handleMouseEnter : undefined}
      onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
      onClick={isTouchDevice ? handleClick : undefined}
    >
      <div style={{ paddingTop: aspectRatio }} />

      <div className="absolute inset-0 w-full h-full">{firstContent}</div>

      <div
        ref={activeRef}
        className="absolute inset-0 w-full h-full z-[2]"
        style={{ display: "none" }}
      >
        {secondContent}
      </div>

      <div
        ref={pixelGridRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
      />
    </div>
  );
};

// Main Page Component
export default function PixelTransitionDemo() {
  return (
    <div className="h-screen w-screen flex items-start justify-center">
      <PixelTransition
        firstContent={
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
            alt="default pixel transition content, a cat!"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        }
        secondContent={
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              backgroundColor: "#111"
            }}
          >
            <p style={{ fontWeight: 900, fontSize: "3rem", color: "#ffffff" }}>Meow!</p>
          </div>
        }
        gridSize={12}
        pixelColor='#ffffff'
        animationStepDuration={0.4}
        className="custom-pixel-card"
      />
    </div>
  );
}