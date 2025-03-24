import  BarPoll from "@/mage-ui/widget/bar-poll";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Bar Poll",
  component: BarPoll,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BarPoll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
