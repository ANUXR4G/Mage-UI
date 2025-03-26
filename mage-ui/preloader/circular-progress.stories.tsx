import CircularProgress from "@/mage-ui/preloader/circular-progress";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Preloader/Circular Progress",
  component: CircularProgress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CircularProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
