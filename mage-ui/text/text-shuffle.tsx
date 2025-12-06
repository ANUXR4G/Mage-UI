import React, { useRef, useEffect, useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { JSX } from 'react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

// ============= COMPONENT DEFINITION =============
export interface TextShuffleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  shuffleDirection?: 'left' | 'right';
  duration?: number;
  maxDelay?: number;
  ease?: string | ((t: number) => number);
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  animationMode?: 'random' | 'evenodd';
  loop?: boolean;
  loopDelay?: number;
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  triggerOnce?: boolean;
  respectReducedMotion?: boolean;
  triggerOnHover?: boolean;
}

const TextShuffleComponent: React.FC<TextShuffleProps> = ({
  text,
  className = '',
  style = {},
  shuffleDirection = 'right',
  duration = 0.35,
  maxDelay = 0,
  ease = 'power3.out',
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = 'evenodd',
  loop = false,
  loopDelay = 0,
  stagger = 0.03,
  scrambleCharset = '',
  colorFrom,
  colorTo,
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = true
}) => {
  const ref = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const splitRef = useRef<GSAPSplitText | null>(null);
  const wrappersRef = useRef<HTMLElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const playingRef = useRef(false);
  const hoverHandlerRef = useRef<((e: Event) => void) | null>(null);

  useEffect(() => {
    if ('fonts' in document) {
      if (document.fonts.status === 'loaded') setFontsLoaded(true);
      else document.fonts.ready.then(() => setFontsLoaded(true));
    } else setFontsLoaded(true);
  }, []);

  const scrollTriggerStart = useMemo(() => {
    const startPct = (1 - threshold) * 100;
    const mm = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || '');
    const mv = mm ? parseFloat(mm[1]) : 0;
    const mu = mm ? mm[2] || 'px' : 'px';
    const sign = mv === 0 ? '' : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`;
    return `top ${startPct}%${sign}`;
  }, [threshold, rootMargin]);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      if (respectReducedMotion && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        onShuffleComplete?.();
        return;
      }

      const el = ref.current as HTMLElement;
      const start = scrollTriggerStart;

      const removeHover = () => {
        if (hoverHandlerRef.current && ref.current) {
          ref.current.removeEventListener('mouseenter', hoverHandlerRef.current);
          hoverHandlerRef.current = null;
        }
      };

      const teardown = () => {
        if (tlRef.current) {
          tlRef.current.kill();
          tlRef.current = null;
        }
        if (wrappersRef.current.length) {
          wrappersRef.current.forEach(wrap => {
            const inner = wrap.firstElementChild as HTMLElement | null;
            const orig = inner?.querySelector('[data-orig="1"]') as HTMLElement | null;
            if (orig && wrap.parentNode) wrap.parentNode.replaceChild(orig, wrap);
          });
          wrappersRef.current = [];
        }
        try {
          splitRef.current?.revert();
        } catch { }
        splitRef.current = null;
        playingRef.current = false;
      };

      const build = () => {
        teardown();

        const computedFont = getComputedStyle(el).fontFamily;

        splitRef.current = new GSAPSplitText(el, {
          type: 'chars',
          charsClass: 'shuffle-char',
          wordsClass: 'shuffle-word',
          linesClass: 'shuffle-line',
          smartWrap: true,
          reduceWhiteSpace: false
        });

        const chars = (splitRef.current.chars || []) as HTMLElement[];
        wrappersRef.current = [];

        const rolls = Math.max(1, Math.floor(shuffleTimes));
        const rand = (set: string) => set.charAt(Math.floor(Math.random() * set.length)) || '';

        chars.forEach(ch => {
          const parent = ch.parentElement;
          if (!parent) return;

          const w = ch.getBoundingClientRect().width;
          if (!w) return;

          const wrap = document.createElement('span');
          wrap.className = 'inline-block overflow-hidden align-baseline text-left';
          Object.assign(wrap.style, { width: w + 'px' });

          const inner = document.createElement('span');
          inner.className = 'inline-block whitespace-nowrap will-change-transform origin-left transform-gpu';

          parent.insertBefore(wrap, ch);
          wrap.appendChild(inner);

          const firstOrig = ch.cloneNode(true) as HTMLElement;
          firstOrig.className = 'inline-block text-left';
          Object.assign(firstOrig.style, { width: w + 'px', fontFamily: computedFont });

          ch.setAttribute('data-orig', '1');
          ch.className = 'inline-block text-left';
          Object.assign(ch.style, { width: w + 'px', fontFamily: computedFont });

          inner.appendChild(firstOrig);
          for (let k = 0; k < rolls; k++) {
            const c = ch.cloneNode(true) as HTMLElement;
            if (scrambleCharset) c.textContent = rand(scrambleCharset);
            c.className = 'inline-block text-left';
            Object.assign(c.style, { width: w + 'px', fontFamily: computedFont });
            inner.appendChild(c);
          }
          inner.appendChild(ch);

          const steps = rolls + 1;
          let startX = 0;
          let finalX = -steps * w;
          if (shuffleDirection === 'right') {
            const firstCopy = inner.firstElementChild as HTMLElement | null;
            const real = inner.lastElementChild as HTMLElement | null;
            if (real) inner.insertBefore(real, inner.firstChild);
            if (firstCopy) inner.appendChild(firstCopy);
            startX = -steps * w;
            finalX = 0;
          }

          gsap.set(inner, { x: startX, force3D: true });
          if (colorFrom) (inner.style as any).color = colorFrom;

          inner.setAttribute('data-final-x', String(finalX));
          inner.setAttribute('data-start-x', String(startX));

          wrappersRef.current.push(wrap);
        });
      };

      const inners = () => wrappersRef.current.map(w => w.firstElementChild as HTMLElement);

      const randomizeScrambles = () => {
        if (!scrambleCharset) return;
        wrappersRef.current.forEach(w => {
          const strip = w.firstElementChild as HTMLElement;
          if (!strip) return;
          const kids = Array.from(strip.children) as HTMLElement[];
          for (let i = 1; i < kids.length - 1; i++) {
            kids[i].textContent = scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length));
          }
        });
      };

      const cleanupToStill = () => {
        wrappersRef.current.forEach(w => {
          const strip = w.firstElementChild as HTMLElement;
          if (!strip) return;
          const real = strip.querySelector('[data-orig="1"]') as HTMLElement | null;
          if (!real) return;
          strip.replaceChildren(real);
          strip.style.transform = 'none';
          strip.style.willChange = 'auto';
        });
      };

      const play = () => {
        const strips = inners();
        if (!strips.length) return;

        playingRef.current = true;

        const tl = gsap.timeline({
          smoothChildTiming: true,
          repeat: loop ? -1 : 0,
          repeatDelay: loop ? loopDelay : 0,
          onRepeat: () => {
            if (scrambleCharset) randomizeScrambles();
            gsap.set(strips, { x: (i, t: HTMLElement) => parseFloat(t.getAttribute('data-start-x') || '0') });
            onShuffleComplete?.();
          },
          onComplete: () => {
            playingRef.current = false;
            if (!loop) {
              cleanupToStill();
              if (colorTo) gsap.set(strips, { color: colorTo });
              onShuffleComplete?.();
              armHover();
            }
          }
        });

        const addTween = (targets: HTMLElement[], at: number) => {
          tl.to(
            targets,
            {
              x: (i, t: HTMLElement) => parseFloat(t.getAttribute('data-final-x') || '0'),
              duration,
              ease,
              force3D: true,
              stagger: animationMode === 'evenodd' ? stagger : 0
            },
            at
          );
          if (colorFrom && colorTo) tl.to(targets, { color: colorTo, duration, ease }, at);
        };

        if (animationMode === 'evenodd') {
          const odd = strips.filter((_, i) => i % 2 === 1);
          const even = strips.filter((_, i) => i % 2 === 0);
          const oddTotal = duration + Math.max(0, odd.length - 1) * stagger;
          const evenStart = odd.length ? oddTotal * 0.7 : 0;
          if (odd.length) addTween(odd, 0);
          if (even.length) addTween(even, evenStart);
        } else {
          strips.forEach(strip => {
            const d = Math.random() * maxDelay;
            tl.to(
              strip,
              {
                x: parseFloat(strip.getAttribute('data-final-x') || '0'),
                duration,
                ease,
                force3D: true
              },
              d
            );
            if (colorFrom && colorTo) tl.fromTo(strip, { color: colorFrom }, { color: colorTo, duration, ease }, d);
          });
        }

        tlRef.current = tl;
      };

      const armHover = () => {
        if (!triggerOnHover || !ref.current) return;
        removeHover();
        const handler = () => {
          if (playingRef.current) return;
          build();
          if (scrambleCharset) randomizeScrambles();
          play();
        };
        hoverHandlerRef.current = handler;
        ref.current.addEventListener('mouseenter', handler);
      };

      const create = () => {
        build();
        if (scrambleCharset) randomizeScrambles();
        play();
        armHover();
        setReady(true);
      };

      const st = ScrollTrigger.create({
        trigger: el,
        start,
        once: triggerOnce,
        onEnter: create
      });

      return () => {
        st.kill();
        removeHover();
        teardown();
        setReady(false);
      };
    },
    {
      dependencies: [
        text,
        duration,
        maxDelay,
        ease,
        scrollTriggerStart,
        fontsLoaded,
        shuffleDirection,
        shuffleTimes,
        animationMode,
        loop,
        loopDelay,
        stagger,
        scrambleCharset,
        colorFrom,
        colorTo,
        triggerOnce,
        respectReducedMotion,
        triggerOnHover,
        onShuffleComplete
      ],
      scope: ref
    }
  );

  const baseTw = 'inline-block whitespace-normal break-words will-change-transform uppercase text-2xl leading-none';
  const userHasFont = useMemo(() => className && /font[-[]/i.test(className), [className]);

  const fallbackFont = useMemo(
    () => (userHasFont ? {} : { fontFamily: `'Press Start 2P', sans-serif` }),
    [userHasFont]
  );

  const commonStyle = useMemo(
    () => ({
      textAlign,
      ...fallbackFont,
      ...style
    }),
    [textAlign, fallbackFont, style]
  );

  const classes = useMemo(
    () => `${baseTw} ${ready ? 'visible' : 'invisible'} ${className}`.trim(),
    [baseTw, ready, className]
  );
  const Tag = (tag || 'p') as keyof JSX.IntrinsicElements;

  return React.createElement(Tag, { ref: ref as any, className: classes, style: commonStyle }, text);
};

export const TextShuffle = TextShuffleComponent;

// ============= STORYBOOK META =============
const meta: Meta<typeof TextShuffle> = {
  title: 'Text/TextShuffle',
  component: TextShuffle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Text to shuffle and reveal'
    },
    shuffleDirection: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Direction of shuffle animation'
    },
    duration: {
      control: { type: 'number', min: 0.1, max: 2, step: 0.05 },
      description: 'Duration of animation'
    },
    animationMode: {
      control: 'select',
      options: ['evenodd', 'random'],
      description: 'Animation mode for characters'
    },
    shuffleTimes: {
      control: { type: 'number', min: 1, max: 10, step: 1 },
      description: 'Number of shuffles before revealing'
    },
    ease: {
      control: 'text',
      description: 'GSAP easing function'
    },
    stagger: {
      control: { type: 'number', min: 0, max: 0.2, step: 0.01 },
      description: 'Stagger delay between characters'
    },
    threshold: {
      control: { type: 'number', min: 0, max: 1, step: 0.1 },
      description: 'Scroll trigger threshold'
    },
    triggerOnce: {
      control: 'boolean',
      description: 'Trigger animation only once'
    },
    triggerOnHover: {
      control: 'boolean',
      description: 'Trigger on hover'
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============= STORIES =============
export const Default: Story = {
  args: {
    text: 'HELLO WORLD',
    shuffleDirection: 'right',
    duration: 0.35,
    animationMode: 'evenodd',
    shuffleTimes: 1,
    ease: 'power3.out',
    stagger: 0.03,
    threshold: 0.1,
    triggerOnce: true,
    triggerOnHover: true,
    respectReducedMotion: true,
    className: ' text-black dark:text-white ',
  },
};

export const LeftShuffle: Story = {
  args: {
    text: 'SHUFFLE LEFT',
    shuffleDirection: 'left',
    duration: 0.4,
    animationMode: 'evenodd',
    shuffleTimes: 2,
    ease: 'power2.out',
    stagger: 0.04,
    triggerOnHover: true,
    className: 'text-white text-3xl',
  },
};

export const RandomMode: Story = {
  args: {
    text: 'RANDOM SHUFFLE',
    shuffleDirection: 'right',
    duration: 0.45,
    animationMode: 'random',
    shuffleTimes: 3,
    maxDelay: 0.5,
    ease: 'elastic.out(1, 0.5)',
    triggerOnHover: true,
    className: 'text-white text-xl',
  },
};

export const FastShuffle: Story = {
  args: {
    text: 'QUICK!',
    shuffleDirection: 'right',
    duration: 0.2,
    animationMode: 'evenodd',
    shuffleTimes: 1,
    ease: 'power4.out',
    stagger: 0.015,
    triggerOnHover: true,
    className: 'text-white text-4xl font-black',
  },
};

export const SlowShuffle: Story = {
  args: {
    text: 'SLOW MOTION',
    shuffleDirection: 'left',
    duration: 0.8,
    animationMode: 'evenodd',
    shuffleTimes: 2,
    ease: 'power1.inOut',
    stagger: 0.08,
    triggerOnHover: true,
    className: 'text-white text-2xl',
  },
};

export const MultiShuffle: Story = {
  args: {
    text: 'MULTIPLE SHUFFLES',
    shuffleDirection: 'right',
    duration: 0.35,
    animationMode: 'evenodd',
    shuffleTimes: 5,
    ease: 'power3.out',
    stagger: 0.03,
    triggerOnHover: true,
    className: 'text-white text-2xl',
  },
};

export const ColorTransition: Story = {
  args: {
    text: 'COLOR CHANGE',
    shuffleDirection: 'right',
    duration: 0.4,
    animationMode: 'evenodd',
    shuffleTimes: 2,
    ease: 'power3.out',
    stagger: 0.03,
    colorFrom: '#ef4444',
    colorTo: '#22c55e',
    triggerOnHover: true,
    className: 'text-3xl font-bold',
  },
};

export const ScrambleCharset: Story = {
  args: {
    text: 'SCRAMBLED TEXT',
    shuffleDirection: 'right',
    duration: 0.35,
    animationMode: 'evenodd',
    shuffleTimes: 3,
    ease: 'power3.out',
    stagger: 0.03,
    scrambleCharset: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    triggerOnHover: true,
    className: 'text-white text-2xl',
  },
};

export const LoopingAnimation: Story = {
  args: {
    text: 'INFINITE LOOP',
    shuffleDirection: 'right',
    duration: 0.3,
    animationMode: 'evenodd',
    shuffleTimes: 1,
    ease: 'power3.out',
    stagger: 0.025,
    loop: true,
    loopDelay: 2,
    triggerOnHover: false,
    className: 'text-white text-2xl',
  },
};

export const HoverOnly: Story = {
  args: {
    text: 'HOVER ME',
    shuffleDirection: 'right',
    duration: 0.3,
    animationMode: 'evenodd',
    shuffleTimes: 1,
    ease: 'power2.out',
    stagger: 0.025,
    triggerOnce: false,
    triggerOnHover: true,
    className: 'text-white text-3xl cursor-pointer',
  },
};
