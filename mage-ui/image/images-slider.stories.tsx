import ImagesSlider from "@/mage-ui/image/images-slider";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Image/Images Slider",
  component: ImagesSlider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ImagesSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
