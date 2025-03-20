import RippleCursorEffect from "@/mage-ui/cursor-effects/ripple-cursor-effect";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Cursor Effects/Ripple Cursor Effect",
  component: RippleCursorEffect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RippleCursorEffect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
