import BarLoader from "@/mage-ui/preloader/bar-loader";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Preloader/Bar Loader",
  component: BarLoader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BarLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
