import FollowCursorEffect from "@/mage-ui/cursor-effects/follow-cursor-effect";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Cursor Effects/Follow Cursor Effect",
  component: FollowCursorEffect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FollowCursorEffect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
