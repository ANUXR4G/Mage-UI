'use client';

import { useEffect, useRef } from 'react';

const useCanvasCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Skip if canvas ref not available
    if (!canvasRef.current) return;

    // Create a proper type for the context with running property
    type ExtendedCanvasContext = CanvasRenderingContext2D & {
      running?: boolean;
      frame?: number;
    };

    let ctx: ExtendedCanvasContext | null = null;
    let f: any;
    let e = 0;
    let pos: { x: number; y: number } = { x: 0, y: 0 };
    let lines: any[] = [];
    const E = {
      debug: true,
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
    };

    // Use a constructor function pattern that works with TypeScript
    function Oscillator(this: any, options: any = {}) {
      this.phase = options.phase || 0;
      this.offset = options.offset || 0;
      this.frequency = options.frequency || 0.001;
      this.amplitude = options.amplitude || 1;
    }

    Oscillator.prototype.update = function () {
      this.phase += this.frequency;
      e = this.offset + Math.sin(this.phase) * this.amplitude;
      return e;
    };

    Oscillator.prototype.value = function () {
      return e;
    };

    function Node(this: any) {
      this.x = 0;
      this.y = 0;
      this.vy = 0;
      this.vx = 0;
    }

    function Line(this: any, options: any = {}) {
      this.spring = (options.spring || 0.45) + (0.1 * Math.random() - 0.02);
      this.friction = E.friction + (0.01 * Math.random() - 0.002);
      this.nodes = [];
      for (let i = 0; i < E.size; i++) {
        const node = new (Node as any)();
        node.x = pos.x;
        node.y = pos.y;
        this.nodes.push(node);
      }
    }

    Line.prototype.update = function () {
      let spring = this.spring;
      let node = this.nodes[0];

      node.vx += (pos.x - node.x) * spring;
      node.vy += (pos.y - node.y) * spring;

      for (let i = 0, len = this.nodes.length; i < len; i++) {
        node = this.nodes[i];

        if (i > 0) {
          const prev = this.nodes[i - 1];
          node.vx += (prev.x - node.x) * spring;
          node.vy += (prev.y - node.y) * spring;
          node.vx += prev.vx * E.dampening;
          node.vy += prev.vy * E.dampening;
        }

        node.vx *= this.friction;
        node.vy *= this.friction;
        node.x += node.vx;
        node.y += node.vy;

        spring *= E.tension;
      }
    };

    Line.prototype.draw = function () {
      if (!ctx) return;

      let x = this.nodes[0].x;
      let y = this.nodes[0].y;
      let curNode, nextNode;

      ctx.beginPath();
      ctx.moveTo(x, y);

      for (let i = 1, len = this.nodes.length - 2; i < len; i++) {
        curNode = this.nodes[i];
        nextNode = this.nodes[i + 1];
        x = 0.5 * (curNode.x + nextNode.x);
        y = 0.5 * (curNode.y + nextNode.y);
        ctx.quadraticCurveTo(curNode.x, curNode.y, x, y);
      }

      // Make sure we have at least 2 nodes before trying to draw the last segment
      if (this.nodes.length > 2) {
        const i = this.nodes.length - 2;
        curNode = this.nodes[i];
        nextNode = this.nodes[i + 1];
        ctx.quadraticCurveTo(curNode.x, curNode.y, nextNode.x, nextNode.y);
      }

      ctx.stroke();
      ctx.closePath();
    };

    function createLines() {
      lines = [];
      for (let i = 0; i < E.trails; i++) {
        lines.push(new (Line as any)({ spring: 0.4 + (i / E.trails) * 0.025 }));
      }
    }

    function handlePointerMove(e: MouseEvent | TouchEvent) {
      if ('touches' in e && e.touches.length > 0) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      } else if (!('touches' in e)) {
        pos.x = e.clientX;
        pos.y = e.clientY;
      }

      // Only prevent default if it's safe to do so (not passive)
      if (e.cancelable) {
        e.preventDefault();
      }
    }

    function handleTouchStart(e: TouchEvent) {
      if (e.touches.length === 1) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      }
    }

    function render() {
      if (!ctx || ctx.running === false) return;

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      try {
        const hue = Math.round(f.update());
        ctx.strokeStyle = `hsla(${hue},50%,50%,0.2)`;
        ctx.lineWidth = 1;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          line.update();
          line.draw();
        }

        if (ctx.frame !== undefined) {
          ctx.frame++;
        }

        window.requestAnimationFrame(render);
      } catch (error) {
        console.error("Error in render loop:", error);
        // Attempt to recover
        if (ctx) ctx.running = false;
      }
    }

    function resizeCanvas() {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }

    function onMousemove(e: MouseEvent | TouchEvent) {
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);

      document.addEventListener('mousemove', handlePointerMove);
      document.addEventListener('touchmove', handlePointerMove, { passive: true });
      document.addEventListener('touchstart', handleTouchStart);

      handlePointerMove(e);
      createLines();
      render();
    }

    function initCanvas() {
      const canvas = canvasRef.current;
      if (!canvas) return;

      ctx = canvas.getContext('2d') as ExtendedCanvasContext;
      if (!ctx) return;

      ctx.running = true;
      ctx.frame = 1;

      // Create oscillator
      const OscillatorConstructor = Oscillator as unknown as new (options: any) => any;
      f = new OscillatorConstructor({
        phase: Math.random() * 2 * Math.PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285,
      });

      // Set up event listeners
      document.addEventListener('mousemove', onMousemove);
      document.addEventListener('touchstart', onMousemove);
      window.addEventListener('resize', resizeCanvas);

      window.addEventListener('focus', handleFocus);
      window.addEventListener('blur', handleBlur);

      resizeCanvas();

      // Initial position
      pos = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };

      // Start right away
      createLines();
      render();
    }

    // Separate functions for event listeners to allow proper cleanup
    const handleFocus = () => {
      if (ctx && ctx.running === false) {
        ctx.running = true;
        render();
      }
    };

    const handleBlur = () => {
      if (ctx) ctx.running = true;
    };

    // Initialize the canvas
    initCanvas();

    // Cleanup function
    return () => {
      if (ctx) ctx.running = false;

      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);
      document.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('touchmove', handlePointerMove);
      document.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return canvasRef;
};

const CanvasCursor = () => {
  const canvasRef = useCanvasCursor();

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className=" pointer-events-none inset-0 w-full h-screen z-50"
    />
  );
};

export default CanvasCursor;