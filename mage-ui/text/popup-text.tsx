// mage-ui/text/PopupText.stories.tsx
import React, { useRef, useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

// ============= COMPONENT DEFINITION =============
export interface PopupTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
  };
  to?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotation?: number;
  };
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  onLetterAnimationComplete?: () => void;
}

const PopupTextComponent = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}: PopupTextProps) => {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;

      const el = ref.current as HTMLElement & {
        _rbsplitInstance?: any;
      };

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch (_) { }
        el._rbsplitInstance = undefined;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets: Element[] = [];

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char'
      });

      // Assign targets based on splitType
      if (splitType.includes('chars') && splitInstance.chars && splitInstance.chars.length) {
        targets = splitInstance.chars;
      } else if (splitType.includes('words') && splitInstance.words && splitInstance.words.length) {
        targets = splitInstance.words;
      } else if (splitType.includes('lines') && splitInstance.lines && splitInstance.lines.length) {
        targets = splitInstance.lines;
      }

      if (targets.length > 0) {
        gsap.fromTo(
          targets,
          from,
          {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            scrollTrigger: {
              trigger: el,
              start,
              once: true
            },
            onComplete: () => {
              animationCompletedRef.current = true;
              if (onLetterAnimationComplete) {
                onLetterAnimationComplete();
              }
            }
          }
        );
      }

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          if (splitInstance && splitInstance.revert) {
            splitInstance.revert();
          }
        } catch (_) { }
        el._rbsplitInstance = undefined;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded
      ],
      scope: ref
    }
  );

  const style: React.CSSProperties = {
    textAlign,
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  };

  const classes = `split-parent ${className}`;

  switch (tag) {
    case 'h1':
      return <h1 ref={ref as any} style={style} className={classes}>{text}</h1>;
    case 'h2':
      return <h2 ref={ref as any} style={style} className={classes}>{text}</h2>;
    case 'h3':
      return <h3 ref={ref as any} style={style} className={classes}>{text}</h3>;
    case 'h4':
      return <h4 ref={ref as any} style={style} className={classes}>{text}</h4>;
    case 'h5':
      return <h5 ref={ref as any} style={style} className={classes}>{text}</h5>;
    case 'h6':
      return <h6 ref={ref as any} style={style} className={classes}>{text}</h6>;
    case 'span':
      return <span ref={ref as any} style={style} className={classes}>{text}</span>;
    default:
      return <p ref={ref as any} style={style} className={classes}>{text}</p>;
  }
};

// Export with proper name
export const PopupText = PopupTextComponent;

// ============= STORYBOOK META =============
const meta: Meta<typeof PopupText> = {
  title: 'Text/PopupText',
  component: PopupText,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'The text content to animate'
    },
    delay: {
      control: { type: 'number', min: 0, max: 500, step: 10 },
      description: 'Delay between each character/word animation (ms)'
    },
    duration: {
      control: { type: 'number', min: 0.1, max: 3, step: 0.1 },
      description: 'Duration of each character/word animation'
    },
    ease: {
      control: 'text',
      description: 'GSAP easing function'
    },
    splitType: {
      control: 'select',
      options: ['chars', 'words', 'lines', 'words, chars'],
      description: 'Type of text splitting'
    },
    tag: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
      description: 'HTML tag to render'
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment'
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============= STORIES =============
export const Default: Story = {
  args: {
    text: 'Hello, MAGE UI!',
    className: 'text-2xl font-semibold text-center text-white',
    delay: 100,
    duration: 0.6,
    ease: 'power3.out',
    splitType: 'chars',
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    threshold: 0.1,
    rootMargin: '-100px',
    textAlign: 'center',
    tag: 'p',
  },
};

export const WordAnimation: Story = {
  args: {
    text: 'The quick brown fox jumps over the lazy dog',
    className: 'text-xl font-medium text-white',
    splitType: 'words',
    delay: 80,
    duration: 0.8,
    ease: 'power3.out',
    tag: 'h2',
    textAlign: 'left',
  },
};

export const SlowReveal: Story = {
  args: {
    text: 'Beautiful Animations',
    className: 'text-3xl font-bold text-white',
    delay: 150,
    duration: 1.0,
    ease: 'power2.inOut',
    from: { opacity: 0, y: 60, scale: 0.8 },
    to: { opacity: 1, y: 0, scale: 1 },
    tag: 'h1',
    splitType: 'chars',
  },
};

export const FastPop: Story = {
  args: {
    text: 'Quick Pop!',
    className: 'text-4xl font-black text-white',
    delay: 50,
    duration: 0.4,
    ease: 'back.out(1.7)',
    from: { opacity: 0, scale: 0 },
    to: { opacity: 1, scale: 1 },
    splitType: 'chars',
    tag: 'h1',
  },
};
