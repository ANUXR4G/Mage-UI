import SwipeCards from "@/mage-ui/card/swipe-cards";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Swipe Cards",
  component: SwipeCards,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SwipeCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
