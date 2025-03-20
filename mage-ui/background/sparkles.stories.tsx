import Sparkles from "@/mage-ui/background/sparkles";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Sparkles",
  component: Sparkles,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Sparkles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
