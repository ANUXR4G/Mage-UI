import ShiftingCountdown from "@/mage-ui/widget/shifting-countdown";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Widget/Shifting Countdown",
  component: ShiftingCountdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ShiftingCountdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
