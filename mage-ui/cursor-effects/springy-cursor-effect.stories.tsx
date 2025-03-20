import SpringyCursorEffect from "@/mage-ui/cursor-effects/springy-cursor-effect";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Cursor Effects/Springy Cursor Effect",
  component: SpringyCursorEffect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SpringyCursorEffect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
