import HeroVideoDailog from "@/mage-ui/background/hero-video-dailog";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Hero Video Dailog",
  component: HeroVideoDailog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HeroVideoDailog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
