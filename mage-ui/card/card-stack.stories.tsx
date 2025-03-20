import { CardStack, CARDS } from "@/mage-ui/card/card-stack";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CardStack> = {
  title: "Card/Card Stack",
  component: CardStack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    items: {
      description: 'Array of card objects to display in the stack',
      control: 'object',
    },
    offset: {
      description: 'Vertical offset between cards in the stack',
      control: { type: 'number' },
      defaultValue: 10,
    },
    scaleFactor: {
      description: 'Scale factor for each card in the stack',
      control: { type: 'number' },
      defaultValue: 0.06,
    }
  },
};

export default meta;
type Story = StoryObj<typeof CardStack>;

export const Primary: Story = {
  args: {
    items: CARDS,
    offset: 10,
    scaleFactor: 0.06
  },
};

export const SmallOffset: Story = {
  args: {
    items: CARDS,
    offset: 5,
    scaleFactor: 0.06
  },
};

export const LargeScaleFactor: Story = {
  args: {
    items: CARDS,
    offset: 10,
    scaleFactor: 0.1
  },
};