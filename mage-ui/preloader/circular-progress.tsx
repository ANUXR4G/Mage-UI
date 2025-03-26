"use client";
"use client";

import { useEffect, useState } from "react";

interface AnimatedCircularProgressBarProps {
  max: number;
  value: number;
  min: number;
  gaugePrimaryColor: string;
  gaugeSecondaryColor: string;
  className?: string;
}

export function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  className,
}: AnimatedCircularProgressBarProps) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const currentPercent = Math.round(((value - min) / (max - min)) * 100);

  return (
    <div
      className={`relative size-40 text-2xl font-semibold ${className}`}
      style={{
        "--circle-size": "100px",
        "--circumference": circumference,
        "--percent-to-px": `${percentPx}px`,
        "--gap-percent": "5",
        "--offset-factor": "0",
        "--transition-length": "1s",
        "--transition-step": "200ms",
        "--delay": "0s",
        "--percent-to-deg": "3.6deg",
        transform: "translateZ(0)",
      } as React.CSSProperties}
    >
      <svg fill="none" className="size-full" strokeWidth="2" viewBox="0 0 100 100">
        {currentPercent <= 90 && currentPercent >= 0 && (
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="10"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-100"
            style={{
              stroke: gaugeSecondaryColor,
              strokeDasharray: `calc(${90 - currentPercent} * var(--percent-to-px)) var(--circumference)`,
              transform:
                "rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg)))) scaleY(-1)",
              transition: "all var(--transition-length) ease var(--delay)",
              transformOrigin: "50% 50%",
            } as React.CSSProperties}
          />
        )}
        <circle
          cx="50"
          cy="50"
          r="45"
          strokeWidth="10"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-100"
          style={{
            stroke: gaugePrimaryColor,
            strokeDasharray: `calc(${currentPercent} * var(--percent-to-px)) var(--circumference)`,
            transition: "var(--transition-length) ease var(--delay)",
            transform:
              "rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))",
            transformOrigin: "50% 50%",
          } as React.CSSProperties}
        />
      </svg>
      <span className="absolute inset-0 m-auto size-fit text-center">
        {currentPercent}%
      </span>
    </div>
  );
}

export default function AnimatedCircularProgressBarPage() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const handleIncrement = (prev: number) => (prev === 100 ? 0 : prev + 10);
    setValue(handleIncrement);
    const interval = setInterval(() => setValue(handleIncrement), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen text-[#f59e0a]">
      <AnimatedCircularProgressBar
        max={100}
        min={0}
        value={value}
        gaugePrimaryColor="rgb(245,158,10)"
        gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
      />
    </div>
  );
}