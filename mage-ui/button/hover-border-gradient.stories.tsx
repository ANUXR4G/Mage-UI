import HoverBorderGradient from "@/mage-ui/button/hover-border-gradient";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Hover Border Gradient",
  component: HoverBorderGradient,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HoverBorderGradient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
