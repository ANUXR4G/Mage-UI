import AnimatedList from "@/mage-ui/list/animated-list";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "List/Animated List",
  component: AnimatedList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AnimatedList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
