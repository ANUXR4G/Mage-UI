import Carousel from "@/mage-ui/carousel/carousel";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Carousel/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
