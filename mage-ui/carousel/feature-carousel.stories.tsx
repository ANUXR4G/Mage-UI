import FeatureCarousel from "@/mage-ui/carousel/feature-carousel";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Carousel/Feature Carousel",
  component: FeatureCarousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof FeatureCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
