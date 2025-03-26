import { InteractiveHoverButtonDemo } from "@/mage-ui/button/interactive-hover-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Interactive Hover Button",
  component: InteractiveHoverButtonDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof InteractiveHoverButtonDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
