import SwipeCarousel from "@/mage-ui/carousel/swipe-carousel";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Carousel/Swipe Carousel",
  component: SwipeCarousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SwipeCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
