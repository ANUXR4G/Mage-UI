import Lamp from "@/mage-ui/background/lamp";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Lamp",
  component: Lamp,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Lamp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
