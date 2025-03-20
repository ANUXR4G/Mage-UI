import StickyScrollReveal from "@/mage-ui/hero/sticky-scroll-reveal";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Hero/Sticky Scroll Reveal",
  component: StickyScrollReveal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StickyScrollReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
