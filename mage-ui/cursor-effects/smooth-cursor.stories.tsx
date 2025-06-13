import SmoothCursor from "@/mage-ui/cursor-effects/smooth-cursor";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Cursor Effects/Smooth Cursor",
  component: SmoothCursor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SmoothCursor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
