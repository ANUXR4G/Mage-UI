import { DrawCircleText } from "@/mage-ui/text/draw-circle-text";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Draw Circle Text",
  component: DrawCircleText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DrawCircleText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
