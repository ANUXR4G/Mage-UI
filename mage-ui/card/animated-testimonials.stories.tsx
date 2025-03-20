import AnimatedTestimonials from "@/mage-ui/card/animated-testimonials";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Animated Testimonials",
  component: AnimatedTestimonials,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AnimatedTestimonials>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
