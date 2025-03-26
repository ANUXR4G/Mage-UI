import HamsterLoader from "@/mage-ui/preloader/hamster-loader";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Preloader/Hamster Loader",
  component: HamsterLoader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HamsterLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
