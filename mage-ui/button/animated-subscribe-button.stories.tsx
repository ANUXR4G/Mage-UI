import { AnimatedSubscribeButtonDemo } from "@/mage-ui/button/animated-subscribe-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Animated Subscribe Button",
  component: AnimatedSubscribeButtonDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AnimatedSubscribeButtonDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
