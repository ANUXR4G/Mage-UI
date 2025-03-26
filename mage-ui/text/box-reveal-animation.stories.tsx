import { BoxRevealDemo } from "@/mage-ui/text/box-reveal-animation";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Text/Box Reveal Animation",
  component: BoxRevealDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BoxRevealDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
