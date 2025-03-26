import HoverAnimation from "@/mage-ui/card/hover-animation";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Hover Animation",
  component: HoverAnimation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HoverAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
