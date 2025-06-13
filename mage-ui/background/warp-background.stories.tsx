import WarpBackground from "@/mage-ui/background/warp-background";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Warp Background",
  component: WarpBackground,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WarpBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
