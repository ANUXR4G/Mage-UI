import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// ============= COMPONENT DEFINITION =============
export interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyTextComponent: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = ''
}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`bg-clip-text inline-block ${disabled ? '' : 'animate-shine'} ${className} text-black dark:text-white`}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
        ...(typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? {
            backgroundImage:
              'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
          }
          : {}),
      }}
    >
      {text}
    </div>
  );
};

export const ShinyText = ShinyTextComponent;

// ============= STORYBOOK META =============
const meta: Meta<typeof ShinyText> = {
  title: 'Text/ShinyText',
  component: ShinyText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A text component with an animated shiny/glowing effect. Supports dark mode with automatic color switching. Requires Tailwind CSS animation configuration.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Text content to display with shiny effect'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the shine animation'
    },
    speed: {
      control: { type: 'number', min: 1, max: 20, step: 0.5 },
      description: 'Animation speed in seconds'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============= STORIES =============
export const Primary: Story = {
  args: {
    text: 'Just some shiny text!',
    disabled: false,
    speed: 3,
    className: 'text-3xl font-bold',
  },
};

export const FastShine: Story = {
  args: {
    text: 'Fast Shiny Effect',
    disabled: false,
    speed: 1.5,
    className: 'text-4xl font-black',
  },
};

export const SlowShine: Story = {
  args: {
    text: 'Slow Elegant Shine',
    disabled: false,
    speed: 8,
    className: 'text-2xl font-semibold',
  },
};

export const LargeText: Story = {
  args: {
    text: 'HUGE SHINY TEXT',
    disabled: false,
    speed: 4,
    className: 'text-6xl font-black uppercase',
  },
};

export const SmallText: Story = {
  args: {
    text: 'Small shiny text here',
    disabled: false,
    speed: 3,
    className: 'text-sm font-medium',
  },
};

export const Disabled: Story = {
  args: {
    text: 'No shine here (disabled)',
    disabled: true,
    speed: 3,
    className: 'text-2xl font-semibold',
  },
};

export const MediumSpeed: Story = {
  args: {
    text: 'Medium Speed Shine',
    disabled: false,
    speed: 5,
    className: 'text-3xl font-bold',
  },
};

export const LongText: Story = {
  args: {
    text: 'This is a much longer piece of shiny text to demonstrate how it looks with extended content',
    disabled: false,
    speed: 4,
    className: 'text-xl font-medium max-w-2xl text-center',
  },
};

export const CustomStyling: Story = {
  args: {
    text: 'Custom Styled Shine',
    disabled: false,
    speed: 3,
    className: 'text-4xl font-extrabold italic tracking-wider',
  },
};

export const VeryFast: Story = {
  args: {
    text: 'Lightning Fast!',
    disabled: false,
    speed: 1,
    className: 'text-3xl font-bold',
  },
};

export const VerySlow: Story = {
  args: {
    text: 'Extremely Slow Shine...',
    disabled: false,
    speed: 15,
    className: 'text-3xl font-semibold',
  },
};
