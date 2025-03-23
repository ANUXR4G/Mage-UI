// @ts-nocheck
'use client';

import React, { useState, useEffect, useCallback } from 'react';
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

.cursor-main {
  position: absolute;
  width: 0px;
  height: 0px;
  background-color: rgb(255, 80, 0);
  border-radius: 50%;
  transform-origin: center;
  box-shadow: 0 0 10px rgba(255, 80, 0, 0.7);
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

.cursor-glow {
  position: absolute;
  width: 0px;
  height: 0px;
  background: radial-gradient(circle, rgba(255, 105, 0, 0.4) 0%, rgba(255, 105, 0, 0) 70%);
  border-radius: 50%;
  transform-origin: center;
  opacity: 0.4;
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
  pointer-events: none;
}
`;

// Canvas cursor hook
const useCanvasCursor = () => {
    function n(e) {
        this.init(e || {});
    }
    n.prototype = {
        init: function (e) {
            this.phase = e.phase || 0;
            this.offset = e.offset || 0;
            this.frequency = e.frequency || 0.001;
            this.amplitude = e.amplitude || 1;
        },
        update: function () {
            return (
                (this.phase += this.frequency),
                (e = this.offset + Math.sin(this.phase) * this.amplitude)
            );
        },
        value: function () {
            return e;
        },
    };

    function Line(e) {
        this.init(e || {});
    }

    Line.prototype = {
        init: function (e) {
            this.spring = e.spring + 0.1 * Math.random() - 0.02;
            this.friction = E.friction + 0.01 * Math.random() - 0.002;
            this.nodes = [];
            for (var t, n = 0; n < E.size; n++) {
                t = new Node();
                t.x = pos.x;
                t.y = pos.y;
                this.nodes.push(t);
            }
        },
        update: function () {
            var e = this.spring,
                t = this.nodes[0];
            t.vx += (pos.x - t.x) * e;
            t.vy += (pos.y - t.y) * e;
            for (var n, i = 0, a = this.nodes.length; i < a; i++)
                (t = this.nodes[i]),
                    0 < i &&
                    ((n = this.nodes[i - 1]),
                        (t.vx += (n.x - t.x) * e),
                        (t.vy += (n.y - t.y) * e),
                        (t.vx += n.vx * E.dampening),
                        (t.vy += n.vy * E.dampening)),
                    (t.vx *= this.friction),
                    (t.vy *= this.friction),
                    (t.x += t.vx),
                    (t.y += t.vy),
                    (e *= E.tension);
        },
        draw: function () {
            var e,
                t,
                n = this.nodes[0].x,
                i = this.nodes[0].y;
            ctx.beginPath();
            ctx.moveTo(n, i);
            for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
                e = this.nodes[a];
                t = this.nodes[a + 1];
                n = 0.5 * (e.x + t.x);
                i = 0.5 * (e.y + t.y);
                ctx.quadraticCurveTo(e.x, e.y, n, i);
            }
            e = this.nodes[a];
            t = this.nodes[a + 1];
            ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
            ctx.stroke();
            ctx.closePath();
        },
    };

    function onMousemove(e) {
        function o() {
            lines = [];
            for (var e = 0; e < E.trails; e++)
                lines.push(new Line({ spring: 0.4 + (e / E.trails) * 0.025 }));
        }
        function c(e) {
            e.touches
                ? ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
                : ((pos.x = e.clientX), (pos.y = e.clientY)),
                e.preventDefault();
        }
        function l(e) {
            1 == e.touches.length &&
                ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY));
        }
        document.removeEventListener('mousemove', onMousemove),
            document.removeEventListener('touchstart', onMousemove),
            document.addEventListener('mousemove', c),
            document.addEventListener('touchmove', c),
            document.addEventListener('touchstart', l),
            c(e),
            o(),
            render();
    }

    function render() {
        if (ctx.running) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.globalCompositeOperation = 'lighter';
            ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',50%,50%,0.2)';
            ctx.lineWidth = 1;
            for (var e, t = 0; t < E.trails; t++) {
                (e = lines[t]).update();
                e.draw();
            }
            ctx.frame++;
            window.requestAnimationFrame(render);
        }
    }

    function resizeCanvas() {
        ctx.canvas.width = window.innerWidth - 20;
        ctx.canvas.height = window.innerHeight;
    }

    var ctx,
        f,
        e = 0,
        pos = {},
        lines = [],
        E = {
            debug: true,
            friction: 0.5,
            trails: 20,
            size: 50,
            dampening: 0.25,
            tension: 0.98,
        };
    function Node() {
        this.x = 0;
        this.y = 0;
        this.vy = 0;
        this.vx = 0;
    }

    const renderCanvas = function () {
        ctx = document.getElementById('canvas').getContext('2d');
        ctx.running = true;
        ctx.frame = 1;
        f = new n({
            phase: Math.random() * 2 * Math.PI,
            amplitude: 85,
            frequency: 0.0015,
            offset: 285,
        });
        document.addEventListener('mousemove', onMousemove);
        document.addEventListener('touchstart', onMousemove);
        document.body.addEventListener('orientationchange', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('focus', () => {
            if (!ctx.running) {
                ctx.running = true;
                render();
            }
        });
        window.addEventListener('blur', () => {
            ctx.running = true;
        });
        resizeCanvas();
    };

    useEffect(() => {
        renderCanvas();

        return () => {
            ctx.running = false;
            document.removeEventListener('mousemove', onMousemove);
            document.removeEventListener('touchstart', onMousemove);
            document.body.removeEventListener('orientationchange', resizeCanvas);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('focus', () => {
                if (!ctx.running) {
                    ctx.running = true;
                    render();
                }
            });
            window.removeEventListener('blur', () => {
                ctx.running = true;
            });
        };
    }, []);
};

// Neon cursor component
const NeonCursor = () => {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
    });
    const [isClicking, setIsClicking] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const trailControls = useAnimation();
    const glowControls = useAnimation();

    const handleMouseMove = useCallback((e) => {
        setPosition((prev) => ({
            ...prev,
            x: e.clientX,
            y: e.clientY,
        }));
    }, []);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = useCallback(
        (e) => {
            const target = e.target;
            if (target.matches('a, button, input, [data-hover="true"]')) {
                setIsHovering(true);
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
        setIsHovering(false);
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
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, [handleMouseMove, handleMouseOver, handleMouseOut]);

    return (
        <div className='neon-cursor-container'>
            {/* Main cursor dot */}
            <motion.div
                className='cursor-main'
                animate={{
                    x: position.x - 10,
                    y: position.y - 10,
                    scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
                }}
                transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 400,
                    mass: 0.5,
                }}
            />
            {/* Trailing circle */}
            <motion.div
                className='cursor-trail'
                animate={{
                    x: position.x - 0,
                    y: position.y - 0,
                }}
                transition={{
                    type: 'spring',
                    damping: 30,
                    stiffness: 200,
                    mass: 0.8,
                }}
                initial={false}
            />
            {/* Outer glow */}
            <motion.div
                className='cursor-glow'
                animate={{
                    x: position.x - 30,
                    y: position.y - 30,
                }}
                transition={{
                    type: 'spring',
                    damping: 40,
                    stiffness: 150,
                    mass: 1,
                }}
                initial={false}
            />
        </div>
    );
};

// Combined cursor page
const CustomCursorPage = () => {
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

