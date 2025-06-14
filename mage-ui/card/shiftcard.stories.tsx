import Shiftcard from "@/mage-ui/card/shiftcard";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Shiftcard",
  component: Shiftcard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Shiftcard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
