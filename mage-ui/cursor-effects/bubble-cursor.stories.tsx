import BubbleCursor from "@/mage-ui/cursor-effects/bubble-cursor";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Cursor Effects/Bubble Cursor",
  component: BubbleCursor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BubbleCursor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
