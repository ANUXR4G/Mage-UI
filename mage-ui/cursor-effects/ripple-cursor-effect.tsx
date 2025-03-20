'use client';
import React, { useReducer, useEffect, useRef } from 'react';

// Define the shape of a ripple object
interface Ripple {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

// Props for the RippleCursor component
interface RippleCursorProps {
  maxSize?: number; // Maximum size of the ripple
  duration?: number; // Duration of the ripple animation in milliseconds
  blur?: boolean; // Whether the ripple has a blur effect
  color?: string; // Ripple color
}

// Type for the reducer's state
type RippleState = Ripple[];

// Type for the reducer's actions
type RippleAction =
  | { type: 'ADD_RIPPLE'; payload: Ripple }
  | { type: 'REMOVE_RIPPLE'; payload: string }
  | { type: 'UPDATE_RIPPLE'; payload: Ripple };

// Reducer function
const rippleReducer = (
  state: RippleState,
  action: RippleAction
): RippleState => {
  switch (action.type) {
    case 'ADD_RIPPLE':
      return [...state, action.payload].slice(-20); // Limit ripple count for performance
    case 'REMOVE_RIPPLE':
      return state.filter((ripple) => ripple.id !== action.payload);
    case 'UPDATE_RIPPLE':
      return state.map((ripple) =>
        ripple.id === action.payload.id ? action.payload : ripple
      );
    default:
      return state;
  }
};

// Component definition
const RippleCursor: React.FC<RippleCursorProps> = ({
  maxSize = 50,
  duration = 1000,
  blur = true,
  color = 'rgba(0, 150, 255, 0.5)',
}) => {
  const [ripples, dispatch] = useReducer(rippleReducer, []);
  const animationFrameRef = useRef<number | null>(null);

  // Event handler for mouse movements with throttling
  useEffect(() => {
    let lastCallTime = 0;
    const throttleInterval = 16; // Approximately 60fps

    const handleMouseMove = (e: MouseEvent): void => {
      const now = Date.now();
      if (now - lastCallTime < throttleInterval) return;

      lastCallTime = now;
      const id = `${now}-${Math.random()}`;

      // Create ripple at initial size 0
      const ripple: Ripple = {
        id,
        x: e.clientX,
        y: e.clientY,
        size: 0,
        opacity: 1
      };

      dispatch({ type: 'ADD_RIPPLE', payload: ripple });

      // Animate ripple expansion
      let startTime: number | null = null;

      const animateRipple = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;

        if (progress < 1) {
          // Update ripple size and opacity based on progress
          const updatedRipple = {
            ...ripple,
            size: maxSize * progress,
            opacity: 1 - progress
          };

          dispatch({ type: 'UPDATE_RIPPLE', payload: updatedRipple });
          animationFrameRef.current = requestAnimationFrame(animateRipple);
        } else {
          // Remove ripple when animation completes
          dispatch({ type: 'REMOVE_RIPPLE', payload: id });
        }
      };

      animationFrameRef.current = requestAnimationFrame(animateRipple);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [duration, maxSize]);

  return (
    <div className="top-0 left-0 w-full h-screen pointer-events-none overflow-hidden z-[9999]">
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            transform: 'translate(-50%, -50%)',
            backgroundColor: color,
            boxShadow: blur ? '0 0 10px rgba(0,150,255,0.7), 0 0 20px rgba(0,150,255,0.4)' : 'none',
            filter: blur ? 'blur(4px)' : 'none',
            opacity: ripple.opacity,
            willChange: 'width, height, opacity'
          }}
        />
      ))}
    </div>
  );
};

export default RippleCursor;