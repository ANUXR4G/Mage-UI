import RainbowCursorEffect from "@/mage-ui/cursor-effects/rainbow-cursor-effect";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Cursor Effects/Rainbow Cursor Effect",
  component: RainbowCursorEffect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof RainbowCursorEffect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
