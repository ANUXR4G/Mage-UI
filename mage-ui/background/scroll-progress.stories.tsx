import ScrollProgress from "@/mage-ui/background/scroll-progress";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Scroll Progress",
  component: ScrollProgress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ScrollProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
