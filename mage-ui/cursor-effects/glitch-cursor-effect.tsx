'use client';

import React, { useState, useEffect, useRef, useLayoutEffect, type RefObject } from 'react';

// Mouse hook interface
interface MouseState {
  x: number | null;
  y: number | null;
  elementX: number | null;
  elementY: number | null;
  elementPositionX: number | null;
  elementPositionY: number | null;
}

// useMouse hook implementation
function useMouse(): [MouseState, RefObject<HTMLDivElement>] {
  const [state, setState] = useState<MouseState>({
    x: null,
    y: null,
    elementX: null,
    elementY: null,
    elementPositionX: null,
    elementPositionY: null,
  });

  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newState: Partial<MouseState> = {
        x: event.pageX,
        y: event.pageY,
      };

      if (ref.current instanceof Element) {
        const { left, top } = ref.current.getBoundingClientRect();
        const elementPositionX = left + window.scrollX;
        const elementPositionY = top + window.scrollY;
        const elementX = event.pageX - elementPositionX;
        const elementY = event.pageY - elementPositionY;

        newState.elementX = elementX;
        newState.elementY = elementY;
        newState.elementPositionX = elementPositionX;
        newState.elementPositionY = elementPositionY;
      }

      setState((s) => ({
        ...s,
        ...newState,
      }));
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return [state, ref];
}

// Interface for glitch offset
interface GlitchOffset {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
  hue: number;
}

// GlitchCursor component
const GlitchCursor: React.FC = () => {
  const [mouseState, ref] = useMouse();
  const [glitchActive, setGlitchActive] = useState<boolean>(false);
  const [glitchOffsets, setGlitchOffsets] = useState<GlitchOffset[]>([]);
  const [intensity, setIntensity] = useState<number>(1);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (glitchActive) {
      interval = setInterval(() => {
        const newOffsets: GlitchOffset[] = Array(5)
          .fill(0)
          .map(() => ({
            x: (Math.random() - 0.5) * 20 * intensity,
            y: (Math.random() - 0.5) * 20 * intensity,
            scale: 0.8 + Math.random() * 0.4,
            rotation: (Math.random() - 0.5) * 45 * intensity,
            opacity: 0.5 + Math.random() * 0.5,
            hue: Math.random() * 360,
          }));
        setGlitchOffsets(newOffsets);
      }, 50);
    } else {
      setGlitchOffsets([]);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [glitchActive, intensity]);

  const handleMouseSpeed = (e: React.MouseEvent): void => {
    const speed = Math.sqrt(
      Math.pow(e.movementX, 2) + Math.pow(e.movementY, 2)
    );
    setIntensity(Math.min(Math.max(speed / 10, 1), 3));
  };

  // Extract mouse position with null safety
  const mouseX = mouseState.x !== null ? mouseState.x : 0;
  const mouseY = mouseState.y !== null ? mouseState.y : 0;

  return (
    <div
      className="relative w-full h-full"
      ref={ref}
      onMouseMove={handleMouseSpeed}
    >
      {mouseState.x !== null && mouseState.y !== null && (
        <>
          {/* Glitch layers */}
          {glitchOffsets.map((offset, index) => (
            <div
              key={index}
              className="fixed pointer-events-none mix-blend-screen"
              style={{
                left: `${mouseX + offset.x}px`,
                top: `${mouseY + offset.y}px`,
                transform: `translate(-50%, -50%) 
                           scale(${offset.scale}) 
                           rotate(${offset.rotation}deg)`,
                opacity: offset.opacity,
              }}
            >
              <div
                className="w-8 h-8 rounded-full"
                style={{
                  background: `hsl(${offset.hue}, 100%, 50%)`,
                  filter: 'blur(2px)',
                }}
              />
            </div>
          ))}

          {/* Main cursor */}
          <div
            className="fixed pointer-events-none z-50"
            style={{
              left: `${mouseX}px`,
              top: `${mouseY}px`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="w-8 h-8 bg-white rounded-full mix-blend-screen" />
          </div>

          {/* Static effect overlay */}
          {glitchActive && (
            <div
              className="fixed pointer-events-none mix-blend-screen"
              style={{
                left: `${mouseX}px`,
                top: `${mouseY}px`,
                transform: 'translate(-50%, -50%)',
                width: '100px',
                height: '100px',
                background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                opacity: 0.3,
              }}
            />
          )}
        </>
      )}

      <div className="flex flex-col items-center justify-center h-full gap-8">
        <button
          className={`px-8 py-4 bg-red-600/30 text-white rounded-lg transition-all duration-300 relative overflow-hidden
            ${glitchActive ? 'animate-pulse' : ''}`}
          onMouseEnter={() => setGlitchActive(true)}
          onMouseLeave={() => setGlitchActive(false)}
        >
          Trigger Glitch
          {glitchActive && (
            <div
              className="absolute inset-0 bg-red-500/20"
              style={{
                animation: 'glitchOverlay 0.3s infinite'
              }}
            />
          )}
        </button>
      </div>

      <style jsx global>{`
        @keyframes glitchOverlay {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-2px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

// Page component
const GlitchCursorPage: React.FC = () => {
  return (
    <div className="w-screen h-screen">
      <GlitchCursor />
    </div>
  );
};

export default GlitchCursorPage;