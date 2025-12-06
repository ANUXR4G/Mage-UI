import { CurvedLoop } from "@/mage-ui/accordion/curved-loop";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Accordion/Curved Loop",
  component: CurvedLoop,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
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
} satisfies Meta<typeof CurvedLoop>;

export default meta;
type Story = StoryObj<typeof meta>;

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
