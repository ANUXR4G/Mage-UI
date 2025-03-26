'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Styles for the neon cursor
const styles = `
.neon-cursor-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

.cursor-trail {
  position: absolute;
  width: 0px;
  height: 0px;
  border: 2px solid rgb(236, 101, 23);
  border-radius: 50%;
  transform-origin: center;
  opacity: 0.5;
}
canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  pointer-events: none;
}
`;

// Define interfaces and classes at the top level to avoid recreation
interface SineWaveProps {
    phase?: number;
    offset?: number;
    frequency?: number;
    amplitude?: number;
}

interface LineProps {
    spring: number;
}

interface CanvasConfig {
    debug: boolean;
    friction: number;
    trails: number;
    size: number;
    dampening: number;
    tension: number;
}

interface NodeObject {
    x: number;
    y: number;
    vx: number;
    vy: number;
}

interface Position {
    x: number;
    y: number;
}

interface ExtendedCanvasRenderingContext2D extends CanvasRenderingContext2D {
    running: boolean;
    frame: number;
}

class SineWave {
    private phase: number;
    private offset: number;
    private frequency: number;
    private amplitude: number;
    private value: number = 0;

    constructor(props: SineWaveProps = {}) {
        this.phase = props.phase || 0;
        this.offset = props.offset || 0;
        this.frequency = props.frequency || 0.001;
        this.amplitude = props.amplitude || 1;
    }

    update(): number {
        this.phase += this.frequency;
        this.value = this.offset + Math.sin(this.phase) * this.amplitude;
        return this.value;
    }

    getValue(): number {
        return this.value;
    }
}

class Node implements NodeObject {
    x: number = 0;
    y: number = 0;
    vx: number = 0;
    vy: number = 0;
}

class Line {
    spring: number;
    friction: number;
    nodes: Node[];

    constructor(props: LineProps, position: Position, config: CanvasConfig) {
        this.spring = props.spring + 0.1 * Math.random() - 0.02;
        this.friction = config.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];

        for (let i = 0; i < config.size; i++) {
            const node = new Node();
            node.x = position.x;
            node.y = position.y;
            this.nodes.push(node);
        }
    }

    update(position: Position, config: CanvasConfig): void {
        let springFactor = this.spring;
        let node = this.nodes[0];

        node.vx += (position.x - node.x) * springFactor;
        node.vy += (position.y - node.y) * springFactor;

        for (let i = 0, len = this.nodes.length; i < len; i++) {
            node = this.nodes[i];

            if (i > 0) {
                const prevNode = this.nodes[i - 1];
                node.vx += (prevNode.x - node.x) * springFactor;
                node.vy += (prevNode.y - node.y) * springFactor;
                node.vx += prevNode.vx * config.dampening;
                node.vy += prevNode.vy * config.dampening;
            }

            node.vx *= this.friction;
            node.vy *= this.friction;
            node.x += node.vx;
            node.y += node.vy;

            springFactor *= config.tension;
        }
    }

    draw(context: CanvasRenderingContext2D): void {
        let x = this.nodes[0].x;
        let y = this.nodes[0].y;

        context.beginPath();
        context.moveTo(x, y);

        for (let i = 1, len = this.nodes.length - 2; i < len; i++) {
            const currentNode = this.nodes[i];
            const nextNode = this.nodes[i + 1];

            x = 0.5 * (currentNode.x + nextNode.x);
            y = 0.5 * (currentNode.y + nextNode.y);

            context.quadraticCurveTo(currentNode.x, currentNode.y, x, y);
        }

        const secondLastNode = this.nodes[this.nodes.length - 2];
        const lastNode = this.nodes[this.nodes.length - 1];

        context.quadraticCurveTo(secondLastNode.x, secondLastNode.y, lastNode.x, lastNode.y);
        context.stroke();
        context.closePath();
    }
}

// Canvas cursor hook
const useCanvasCursor = (): void => {
    // Use refs for values that need to persist between renders but don't trigger re-renders
    const ctxRef = useRef<ExtendedCanvasRenderingContext2D | null>(null);
    const sineWaveRef = useRef<SineWave | null>(null);
    const positionRef = useRef<Position>({ x: 0, y: 0 });
    const linesRef = useRef<Line[]>([]);

    // Memoize config to prevent unnecessary re-renders
    const config = useMemo<CanvasConfig>(() => ({
        debug: true,
        friction: 0.5,
        trails: 20,
        size: 50,
        dampening: 0.25,
        tension: 0.98,
    }), []);

    // Memoize the functions to avoid unnecessary recreation
    const initLines = useCallback((lines: Line[], position: Position, config: CanvasConfig) => {
        lines.length = 0; // Clear the existing lines
        for (let i = 0; i < config.trails; i++) {
            lines.push(new Line(
                { spring: 0.4 + (i / config.trails) * 0.025 },
                position,
                config
            ));
        }
    }, []); // Remove config from dependency array

    const updatePosition = useCallback((event: MouseEvent | TouchEvent): void => {
        if ('touches' in event) {
            positionRef.current.x = event.touches[0].pageX;
            positionRef.current.y = event.touches[0].pageY;
        } else {
            positionRef.current.x = (event as MouseEvent).clientX;
            positionRef.current.y = (event as MouseEvent).clientY;
        }
        event.preventDefault();
    }, []);

    const handleTouchStart = useCallback((event: TouchEvent): void => {
        if (event.touches.length === 1) {
            positionRef.current.x = event.touches[0].pageX;
            positionRef.current.y = event.touches[0].pageY;
        }
    }, []);

    const renderFrame = useCallback(() => {
        const ctx = ctxRef.current;
        if (ctx && ctx.running) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.globalCompositeOperation = 'lighter';

            const sineWave = sineWaveRef.current;
            if (sineWave) {
                ctx.strokeStyle = `hsla(${Math.round(sineWave.update())},50%,50%,0.2)`;
            }

            ctx.lineWidth = 1;

            const lines = linesRef.current;
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                line.update(positionRef.current, config);
                line.draw(ctx);
            }

            ctx.frame++;
            window.requestAnimationFrame(renderFrame);
        }
    }, [config]);

    const handleMouseMove = useCallback((e: MouseEvent | TouchEvent): void => {
        document.removeEventListener('mousemove', handleMouseMove as EventListener);
        document.removeEventListener('touchstart', handleMouseMove as unknown as EventListener);
        document.addEventListener('mousemove', updatePosition as EventListener);
        document.addEventListener('touchmove', updatePosition as EventListener);
        document.addEventListener('touchstart', handleTouchStart as EventListener);

        updatePosition(e);
        initLines(linesRef.current, positionRef.current, config);
        renderFrame();
    }, [initLines, updatePosition, handleTouchStart, renderFrame, config]);

    const resizeCanvas = useCallback(() => {
        const ctx = ctxRef.current;
        if (ctx && ctx.canvas) {
            ctx.canvas.width = window.innerWidth - 20;
            ctx.canvas.height = window.innerHeight;
        }
    }, []);

    const renderCanvas = useCallback(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        ctxRef.current = context as ExtendedCanvasRenderingContext2D;
        ctxRef.current.running = true;
        ctxRef.current.frame = 1;

        sineWaveRef.current = new SineWave({
            phase: Math.random() * 2 * Math.PI,
            amplitude: 85,
            frequency: 0.0015,
            offset: 285,
        });

        document.addEventListener('mousemove', handleMouseMove as EventListener);
        document.addEventListener('touchstart', handleMouseMove as unknown as EventListener);
        document.body.addEventListener('orientationchange', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('focus', () => {
            const ctx = ctxRef.current;
            if (ctx && !ctx.running) {
                ctx.running = true;
                renderFrame();
            }
        });

        window.addEventListener('blur', () => {
            const ctx = ctxRef.current;
            if (ctx) ctx.running = true;
        });

        resizeCanvas();
    }, [handleMouseMove, resizeCanvas, renderFrame]);

    useEffect(() => {
        renderCanvas();

        return () => {
            const ctx = ctxRef.current;
            if (ctx) ctx.running = false;

            document.removeEventListener('mousemove', handleMouseMove as EventListener);
            document.removeEventListener('touchstart', handleMouseMove as unknown as EventListener);
            document.body.removeEventListener('orientationchange', resizeCanvas);
            window.removeEventListener('resize', resizeCanvas);

            window.removeEventListener('focus', () => {
                const ctx = ctxRef.current;
                if (ctx && !ctx.running) {
                    ctx.running = true;
                    renderFrame();
                }
            });

            window.removeEventListener('blur', () => {
                const ctx = ctxRef.current;
                if (ctx) ctx.running = true;
            });
        };
    }, [handleMouseMove, renderCanvas, resizeCanvas, renderFrame]);
};

// Neon cursor component
const NeonCursor: React.FC = () => {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
    });
    const trailControls = useAnimation();
    const glowControls = useAnimation();

    const handleMouseMove = useCallback((e: MouseEvent) => {
        setPosition((prev) => ({
            ...prev,
            x: e.clientX,
            y: e.clientY,
        }));
    }, []);

    const handleMouseOver = useCallback(
        (e: MouseEvent) => {
            const target = e.target as Element;
            if (target.matches('a, button, input, [data-hover="true"]')) {
                void trailControls.start({
                    scale: 1.5,
                    borderColor: 'rgb(255, 150, 50)',
                    borderWidth: '3px',
                });
                void glowControls.start({
                    scale: 2,
                    opacity: 0.8,
                });
            }
        },
        [trailControls, glowControls]
    );

    const handleMouseOut = useCallback(() => {
        void trailControls.start({
            scale: 1,
            borderColor: 'rgb(236, 101, 23)',
            borderWidth: '2px',
        });
        void glowControls.start({
            scale: 1,
            opacity: 0.4,
        });
    }, [trailControls, glowControls]);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove as EventListener);
        window.addEventListener('mouseover', handleMouseOver as EventListener);
        window.addEventListener('mouseout', handleMouseOut as EventListener);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove as EventListener);
            window.removeEventListener('mouseover', handleMouseOver as EventListener);
            window.removeEventListener('mouseout', handleMouseOut as EventListener);
        };
    }, [handleMouseMove, handleMouseOver, handleMouseOut]);

    return (
        <div className='neon-cursor-container'>
            {/* Trailing circle */}
            <motion.div
                className='cursor-trail'
                animate={{
                    x: position.x,
                    y: position.y,
                }}
                transition={{
                    type: 'spring',
                    damping: 30,
                    stiffness: 200,
                    mass: 0.8,
                }}
                initial={false}
            />
        </div>
    );
};

// Combined cursor page
const CustomCursorPage: React.FC = () => {
    // Apply the canvas cursor hook
    useCanvasCursor();

    // Inject the CSS
    useEffect(() => {
        // Create a style element
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.appendChild(document.createTextNode(styles));
        document.head.appendChild(styleElement);

        return () => {
            // Remove the style element on unmount
            document.head.removeChild(styleElement);
        };
    }, []);

    return (
        <>
            <canvas id="canvas"></canvas>
            <NeonCursor />
        </>
    );
};

export default CustomCursorPage;