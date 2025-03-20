import TextHoverEffect from "@/mage-ui/text/text-hover-effect";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Text Hover Effect",
  component: TextHoverEffect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextHoverEffect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
