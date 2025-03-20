import MovingBorder from "@/mage-ui/button/moving-border";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Moving Border",
  component: MovingBorder,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MovingBorder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
