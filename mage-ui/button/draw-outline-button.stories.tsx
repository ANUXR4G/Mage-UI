import DrawOutlineButton from "@/mage-ui/button/draw-outline-button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Button/Draw Outline Button",
  component: DrawOutlineButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DrawOutlineButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
