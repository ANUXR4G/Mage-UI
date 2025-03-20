import MultiStepLoader from "@/mage-ui/progress/multi-step-loader";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Progress/Multi Step Loader",
  component: MultiStepLoader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MultiStepLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
