import ParallaxScroll from "@/mage-ui/image/parallax-scroll";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Image/Parallax Scroll",
  component: ParallaxScroll,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ParallaxScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
