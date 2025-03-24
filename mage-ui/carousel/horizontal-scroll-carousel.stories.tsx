import HorizontalScrollCarousel from "@/mage-ui/carousel/horizontal-scroll-carousel";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Carousel/Horizontal Scroll Carousel",
  component: HorizontalScrollCarousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HorizontalScrollCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
