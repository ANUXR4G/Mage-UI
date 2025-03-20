'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';

interface TextFlagOptions {
  text?: string;
  color?: string;
  font?: string;
  textSize?: number;
  gap?: number;
}

const TextFlagCursor: React.FC<TextFlagOptions> = ({
  text = 'Hello World',
  color = '#000000',
  font = 'monospace',
  textSize = 12,
  gap = textSize + 2,
}) => {
  const cursorRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    const element = document.body;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let cursor = { x: width / 2, y: height / 2 };
    let charArray = text.split('').map((letter) => ({ letter, x: width / 2, y: height / 2 }));
    let angle = 0;
    let radiusX = 2;
    let radiusY = 5;

    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    if (!context) return;

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    canvas.width = width;
    canvas.height = height;

    const onMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    const onWindowResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const updateParticles = () => {
      context.clearRect(0, 0, width, height);
      angle += 0.15;
      let locX = radiusX * Math.cos(angle);
      let locY = radiusY * Math.sin(angle);

      for (let i = charArray.length - 1; i > 0; i--) {
        charArray[i].x = charArray[i - 1].x + gap;
        charArray[i].y = charArray[i - 1].y;
        context.fillStyle = color;
        context.font = `${textSize}px ${font}`;
        context.fillText(charArray[i].letter, charArray[i].x, charArray[i].y);
      }

      charArray[0].x += (cursor.x - charArray[0].x) / 5 + locX + 2;
      charArray[0].y += (cursor.y - charArray[0].y) / 5 + locY;
    };

    const loop = () => {
      updateParticles();
      requestAnimationFrame(loop);
    };

    element.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
    loop();

    cursorRef.current = {
      destroy: () => {
        canvas.remove();
        element.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onWindowResize);
      },
    };

    return () => cursorRef.current?.destroy();
  }, [text, color, font, textSize, gap]);

  return null;
};

const Page = () => {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#000000' : '#FFFFFF';

  return (
    <div className="h-screen">
      <TextFlagCursor text="IMage UI" color={textColor} font="monospace" textSize={12} />
    </div>
  );
};

export default Page;
