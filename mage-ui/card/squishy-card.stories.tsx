import SquishyCard from "@/mage-ui/card/squishy-card";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Card/Squishy Card",
  component: SquishyCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SquishyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
