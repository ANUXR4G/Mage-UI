import DirectionAwareHover from "@/mage-ui/card/direction-aware-hover";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Direction Aware Hover",
  component: DirectionAwareHover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DirectionAwareHover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
