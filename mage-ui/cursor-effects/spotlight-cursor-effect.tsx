'use client';
import { useEffect, useRef, useState, HTMLAttributes } from 'react';

// Define interfaces for TypeScript that match the actual parameters
interface SpotlightConfig {
  spotlightSize?: number;
  spotlightIntensity?: number;
  fadeSpeed?: number;
  glowColor?: string;
  pulseSpeed?: number;
}

// Spotlight Effect Hook
const useSpotlightEffect = (config: SpotlightConfig = {}) => {
  const {
    spotlightSize = 200,
    spotlightIntensity = 0.8,
    fadeSpeed = 0.1,
    glowColor = '255, 255, 255',
    pulseSpeed = 2000,
  } = config;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const spotlightPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctxRef.current = ctx;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const render = () => {
      if (!canvas || !ctx) return;

      // Smooth position transition
      spotlightPos.current.x = lerp(
        spotlightPos.current.x,
        targetPos.current.x,
        fadeSpeed
      );
      spotlightPos.current.y = lerp(
        spotlightPos.current.y,
        targetPos.current.y,
        fadeSpeed
      );

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create dark overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate pulse effect
      const pulseScale =
        1 + 0.1 * Math.sin((Date.now() / pulseSpeed) * Math.PI * 2);
      const currentSpotlightSize = spotlightSize * pulseScale;

      // Create spotlight gradient
      const gradient = ctx.createRadialGradient(
        spotlightPos.current.x,
        spotlightPos.current.y,
        0,
        spotlightPos.current.x,
        spotlightPos.current.y,
        currentSpotlightSize
      );

      // Add multiple color stops for smoother transition
      gradient.addColorStop(0, `rgba(${glowColor}, ${spotlightIntensity})`);
      gradient.addColorStop(
        0.5,
        `rgba(${glowColor}, ${spotlightIntensity * 0.5})`
      );
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      // Apply spotlight effect
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(
        spotlightPos.current.x,
        spotlightPos.current.y,
        currentSpotlightSize,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Add glow effect
      ctx.globalCompositeOperation = 'source-over';
      const glowGradient = ctx.createRadialGradient(
        spotlightPos.current.x,
        spotlightPos.current.y,
        0,
        spotlightPos.current.x,
        spotlightPos.current.y,
        currentSpotlightSize * 1.2
      );
      glowGradient.addColorStop(0, `rgba(${glowColor}, 0.2)`);
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(
        spotlightPos.current.x,
        spotlightPos.current.y,
        currentSpotlightSize * 1.2,
        0,
        Math.PI * 2
      );
      ctx.fill();

      animationFrame.current = requestAnimationFrame(render);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [spotlightSize, spotlightIntensity, fadeSpeed, glowColor, pulseSpeed]);

  return canvasRef;
};

interface SpotlightCursorProps extends HTMLAttributes<HTMLCanvasElement> {
  config?: SpotlightConfig;
}

// SpotlightCursor Component
const SpotlightCursor = ({
  config = {},
  className = '',
  ...rest
}: SpotlightCursorProps) => {
  const canvasRef = useSpotlightEffect(config);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] w-full h-full ${className}`}
      {...rest}
    />
  );
};

// Main Page Component
interface PageProps {
  title?: string;
  subtitle?: string;
}

const SpotlightPage: React.FC<PageProps> = ({
  title = "Interactive Spotlight",
  subtitle = "Move your cursor to explore the spotlight effect"
}) => {
  return (
    <div className="relative h-screen bg-black text-white flex flex-col items-center justify-center">
      {/* Spotlight cursor overlay */}
      <SpotlightCursor
        config={{
          spotlightSize: 250,
          spotlightIntensity: 0.7,
          glowColor: '255, 255, 255',
          fadeSpeed: 0.08,
          pulseSpeed: 2500
        }}
      />

      {/* Content */}
      <div className="text-center z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        {subtitle && <p className="text-xl md:text-2xl opacity-80">{subtitle}</p>}

        <div className="mt-12">
          <button className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-opacity-90 transition-all">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpotlightPage;