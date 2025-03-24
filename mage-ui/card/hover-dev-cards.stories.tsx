import HoverDevCards from "@/mage-ui/card/hover-dev-cards";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Hover Dev Cards",
  component: HoverDevCards,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HoverDevCards>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
