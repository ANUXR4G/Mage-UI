import { TextType } from "@/mage-ui/text/text-type";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Text Type",
  component: TextType,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: 'object',
      description: 'Text string or array of strings to type'
    },
    typingSpeed: {
      control: { type: 'number', min: 10, max: 200, step: 5 },
      description: 'Speed of typing in milliseconds'
    },
    pauseDuration: {
      control: { type: 'number', min: 500, max: 5000, step: 100 },
      description: 'Pause duration between sentences'
    },
    deletingSpeed: {
      control: { type: 'number', min: 10, max: 200, step: 5 },
      description: 'Speed of deleting text'
    },
    showCursor: {
      control: 'boolean',
      description: 'Show or hide cursor'
    },
    cursorCharacter: {
      control: 'text',
      description: 'Character to use as cursor'
    },
    loop: {
      control: 'boolean',
      description: 'Loop through text array'
    },
    hideCursorWhileTyping: {
      control: 'boolean',
      description: 'Hide cursor while typing'
    },
    as: {
      control: 'select',
      options: ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'span'],
      description: 'HTML element to render'
    },
  },
} satisfies Meta<typeof TextType>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: ['Text typing effect', 'for your websites', 'Happy coding!'],
    typingSpeed: 75,
    pauseDuration: 1500,
    showCursor: true,
    cursorCharacter: '|',
    className: 'text-2xl font-semibold text-white',
    loop: true,
  },
};

export const SingleText: Story = {
  args: {
    text: 'This is a single typing text',
    typingSpeed: 60,
    showCursor: true,
    cursorCharacter: '_',
    className: 'text-xl text-white font-medium',
    loop: false,
  },
};

export const FastTyping: Story = {
  args: {
    text: ['Lightning fast typing!', 'Super speedy text', 'Blazing performance'],
    typingSpeed: 30,
    deletingSpeed: 20,
    pauseDuration: 1000,
    showCursor: true,
    className: 'text-3xl font-bold text-white',
  },
};

export const SlowTyping: Story = {
  args: {
    text: ['Slow and steady...', 'Takes its time...', 'Patient typing...'],
    typingSpeed: 150,
    deletingSpeed: 100,
    pauseDuration: 2500,
    showCursor: true,
    cursorCharacter: '█',
    className: 'text-2xl text-white',
  },
};

export const ColorfulText: Story = {
  args: {
    text: ['Red text here', 'Green text now', 'Blue text coming'],
    typingSpeed: 70,
    pauseDuration: 1500,
    textColors: ['#ef4444', '#22c55e', '#3b82f6'],
    showCursor: true,
    className: 'text-3xl font-bold',
  },
};

export const HideCursorWhileTyping: Story = {
  args: {
    text: ['Cursor hides while typing', 'Watch it disappear', 'Then reappear'],
    typingSpeed: 80,
    pauseDuration: 1500,
    showCursor: true,
    hideCursorWhileTyping: true,
    cursorCharacter: '|',
    className: 'text-2xl text-white',
  },
};

export const VariableSpeed: Story = {
  args: {
    text: ['Variable typing speed', 'Each character different', 'Natural feeling'],
    variableSpeed: { min: 40, max: 120 },
    pauseDuration: 2000,
    showCursor: true,
    className: 'text-2xl font-medium text-white',
  },
};

export const NoLoop: Story = {
  args: {
    text: ['This text only plays once', 'No looping here', 'Final message'],
    typingSpeed: 70,
    pauseDuration: 1500,
    loop: false,
    showCursor: true,
    className: 'text-xl text-white',
  },
};

export const CustomCursor: Story = {
  args: {
    text: ['Custom cursor styles', 'Different characters', 'Your choice!'],
    typingSpeed: 75,
    pauseDuration: 1500,
    showCursor: true,
    cursorCharacter: '▌',
    cursorClassName: 'text-blue-500 font-bold',
    className: 'text-2xl text-white',
  },
};
