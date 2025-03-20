import ArrowCursorEffect from "@/mage-ui/cursor-effects/arrow-cursor-effect";
import { Meta, StoryObj } from "@storybook/react";

// Import the complete file as a string
import arrowCursorEffectCode from "@/mage-ui/cursor-effects/arrow-cursor-effect";

const meta = {
  title: "Cursor Effects/Arrow Cursor Effect",
  component: ArrowCursorEffect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ArrowCursorEffect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    sourceCode: arrowCursorEffectCode, // Pass the full code in args
  },
};
