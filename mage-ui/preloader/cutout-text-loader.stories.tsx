import CutoutTextLoader from "@/mage-ui/preloader/cutout-text-loader";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Preloader/Cutout Text Loader",
  component: CutoutTextLoader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CutoutTextLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
