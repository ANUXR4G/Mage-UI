import { TextShuffle } from "@/mage-ui/text/text-shuffle";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Text Shuffle",
  component: TextShuffle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
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
    loop: {
      control: 'boolean',
      description: 'Loop animation infinitely'
    },
    tag: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
      description: 'HTML tag to render'
    },
  },
} satisfies Meta<typeof TextShuffle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
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
    className: 'text-white',
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

export const HeadingTag: Story = {
  args: {
    text: 'BIG HEADING',
    shuffleDirection: 'right',
    duration: 0.35,
    animationMode: 'evenodd',
    shuffleTimes: 2,
    ease: 'power3.out',
    stagger: 0.03,
    triggerOnHover: true,
    tag: 'h1',
    className: 'text-white text-5xl',
  },
};
