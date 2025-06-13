import PixelTransition from "@/mage-ui/card/pixel-transition";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Pixel Transition",
  component: PixelTransition,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof PixelTransition>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
