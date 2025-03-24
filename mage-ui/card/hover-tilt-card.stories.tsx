import HoverTiltCard from "@/mage-ui/card/hover-tilt-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Hover Tilt Card",
  component: HoverTiltCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HoverTiltCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
