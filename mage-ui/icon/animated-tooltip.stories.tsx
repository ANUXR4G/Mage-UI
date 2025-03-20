import AnimatedTooltip from "@/mage-ui/icon/animated-tooltip";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Icon/Animated Tooltip",
  component: AnimatedTooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AnimatedTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
