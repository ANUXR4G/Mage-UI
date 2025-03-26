import Terminal from "@/mage-ui/skeleton/terminal";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Skeleton/Terminal",
  component: Terminal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Terminal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
