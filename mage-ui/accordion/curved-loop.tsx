import { useRef, useEffect, useState, useMemo, useId, FC, PointerEvent } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// ============= COMPONENT DEFINITION =============
export interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
}

const CurvedLoopComponent: FC<CurvedLoopProps> = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 400,
  direction = 'left',
  interactive = true
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [offset, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef<'left' | 'right'>(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const totalText = textLength
    ? Array(Math.ceil(1800 / textLength) + 2)
      .fill(text)
      .join('')
    : text;
  const ready = spacing > 0;

  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute('startOffset', initial + 'px');
      setOffset(initial);
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
        let newOffset = currentOffset + delta;
        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset > 0) newOffset -= wrapPoint;
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
        setOffset(newOffset);
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = (e: PointerEvent) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;
    const currentOffset = parseFloat(textPathRef.current.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + dx;
    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (dragRef.current ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="select-none w-full overflow-visible block aspect-[100/12] text-7xl font-bold uppercase leading-none"
        viewBox="0 0 1440 120"
      >
        <text ref={measureRef} xmlSpace="preserve" style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}>
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text xmlSpace="preserve" className={`fill-white ${className ?? ''}`}>
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={offset + 'px'} xmlSpace="preserve">
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

export const CurvedLoop = CurvedLoopComponent;

// ============= STORYBOOK META =============
const meta: Meta<typeof CurvedLoop> = {
  title: 'Accordion/CurvedLoop',
  component: CurvedLoop,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'An interactive curved text marquee component with drag support. The text follows a curved path and can be dragged to change direction.',
      },
    },
  },
  argTypes: {
    marqueeText: {
      control: 'text',
      description: 'Text to display in the curved marquee'
    },
    speed: {
      control: { type: 'number', min: 0.5, max: 10, step: 0.5 },
      description: 'Animation speed'
    },
    curveAmount: {
      control: { type: 'number', min: 100, max: 800, step: 50 },
      description: 'Amount of curve in the path'
    },
    direction: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Initial animation direction'
    },
    interactive: {
      control: 'boolean',
      description: 'Enable drag interaction'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for text styling'
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============= STORIES =============
export const Primary: Story = {
  args: {
    marqueeText: 'Welcome to Mage UI ✦',
    speed: 2,
    curveAmount: 400,
    direction: 'left',
    interactive: true,
  },
};

export const Creative: Story = {
  args: {
    marqueeText: 'Be ✦ Creative ✦ With ✦ React ✦ Bits ✦',
    speed: 3,
    curveAmount: 500,
    direction: 'right',
    interactive: true,
  },
};

export const SmoothSlow: Story = {
  args: {
    marqueeText: 'Smooth Curved Animation',
    speed: 1,
    curveAmount: 300,
    interactive: false,
  },
};

export const FastMoving: Story = {
  args: {
    marqueeText: 'Fast Moving Text ✦ High Speed ✦',
    speed: 5,
    curveAmount: 400,
    direction: 'left',
    interactive: true,
  },
};

export const SubtleCurve: Story = {
  args: {
    marqueeText: 'Subtle Curve Effect ✦',
    speed: 2.5,
    curveAmount: 200,
    direction: 'right',
    interactive: true,
  },
};

export const DeepCurve: Story = {
  args: {
    marqueeText: 'Deep Curve Animation ✦',
    speed: 2,
    curveAmount: 700,
    direction: 'left',
    interactive: true,
  },
};

export const NonInteractive: Story = {
  args: {
    marqueeText: 'Non-Interactive Mode ✦ No Dragging ✦',
    speed: 2,
    curveAmount: 400,
    direction: 'left',
    interactive: false,
  },
};

export const RightDirection: Story = {
  args: {
    marqueeText: 'Moving Right ✦ Direction ✦',
    speed: 3,
    curveAmount: 450,
    direction: 'right',
    interactive: true,
  },
};

export const SlowMotion: Story = {
  args: {
    marqueeText: 'Slow Motion Effect ✦',
    speed: 0.8,
    curveAmount: 350,
    direction: 'left',
    interactive: true,
  },
};

export const SymbolsOnly: Story = {
  args: {
    marqueeText: '★ ✦ ◆ ● ■ ▲ ✦ ★',
    speed: 2.5,
    curveAmount: 400,
    direction: 'left',
    interactive: true,
  },
};

export const LongText: Story = {
  args: {
    marqueeText: 'This is a longer text demonstration ✦ Showing how curved loop handles extended content ✦',
    speed: 2,
    curveAmount: 500,
    direction: 'right',
    interactive: true,
  },
};

export const CustomStyled: Story = {
  args: {
    marqueeText: 'Custom Styled Text ✦',
    speed: 2,
    curveAmount: 400,
    direction: 'left',
    interactive: true,
    className: 'opacity-80 tracking-wider',
  },
};
