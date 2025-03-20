import HeroParallax from "@/mage-ui/background/hero-parallax";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Background/Hero Parallax",
  component: HeroParallax,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HeroParallax>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
